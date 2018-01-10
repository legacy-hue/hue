// const config = require('../config');

const knex = require('knex')({
  client: 'pg',
  connection: {
    host : process.env.DATABASE_HOST || '127.0.0.1',
    user : process.env.DATABASE_USER || config.dbUser,
    password : process.env.DATABASE_PASSWORD || config.dbPass,
    database : process.env.DATABASE_NAME ||  'hue'
  }
});

knex.schema.hasTable('users').then(function(exists) {
  if (!exists) {
    knex.schema.createTable('users', function (table) {
      table.increments();
      table.string('name').unique();
      table.string('password');
      table.timestamps();
    }).then(function (table) {
      console.log('Created Table users');
    });
  }
}).then(function(){
  knex.schema.hasTable('entries').then(function(exists) {
    if (!exists) {
      knex.schema.createTable('entries', function (table) {
        table.increments();
        table.string('title');
        table.string('url');
        table.integer('userid').references('users.id');
        table.timestamps();
      }).then(function (table) {
        console.log('Created Table entries');
      });
    }
  });
}).then(function(){
  knex.schema.hasTable('comments').then(function(exists) {
    if (!exists) {
      knex.schema.createTable('comments', function (table) {
        table.increments();
        table.string('text');
        table.integer('userid').references('users.id');
        table.integer('entryid').references('entries.id');
        table.timestamps();
      }).then(function (table) {
        console.log('Created Table comments');
      });
    }
  });
});

module.exports = knex;