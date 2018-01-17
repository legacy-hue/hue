const config = require('../config');


const knex = require('knex')({
  client: 'pg',
  connection: {
    host : process.env.DATABASE_HOST || '127.0.0.1',
    user : process.env.DATABASE_USER || config.dbUser,
    password: process.env.DATABASE_PASSWORD !== undefined ? process.env.DATABASE_PASSWORD : config.dbPass,
    database : process.env.DATABASE_NAME ||  'hue'
  }
});

knex.schema.hasTable('users').then(function(exists) {
  if (!exists) {
    knex.schema.createTable('users', function (table) {
      table.increments();
      table.string('name').unique();
      table.string('password');
      table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'))
      table.timestamp('updated_at').notNullable().defaultTo(knex.raw('now()'))
    }).then(function (table) {
      console.log('Created Table users');
    });
  }
}).then(function(){
  knex.schema.hasTable('entries').then(function(exists) {
    if (!exists) {
      knex.schema.createTable('entries', function (table) {
        table.increments();
        table.integer('up_votes');
        table.integer('down_votes');
        table.string('title');
        table.string('url');
        table.text('text');
        table.integer('userid').references('users.id');
        table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'))
        table.timestamp('updated_at').notNullable().defaultTo(knex.raw('now()'))
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
        table.integer('up_votes');
        table.integer('down_votes');
        table.text('text');
        table.integer('userid').references('users.id');
        table.integer('entryid').references('entries.id');
        table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'))
        table.timestamp('updated_at').notNullable().defaultTo(knex.raw('now()'))
      }).then(function (table) {
        console.log('Created Table comments');
      });
    }
  });
}).then(function(){
  knex.schema.hasTable('comments_votes').then(function(exists) {
    if (!exists) {
      knex.schema.createTable('comments_votes', function(table) {
        table.increments();
        table.string('voted');
        table.string('userid').references('users.name');
        table.integer('entryid').references('entries.id');
        table.integer('commentid').references('comments.id');        
      }).then(function(table) {
        console.log('Created Table comments_votes');
      })
    }
  })
}).then(function() {
  knex.schema.hasTable('entries_votes').then(function(exists) {
    if (!exists) {
      knex.schema.createTable('entries_votes', function(table) {
        table.increments();
        table.string('voted');
        table.string('userid').references('users.name');
        table.integer('entryid').references('entries.id');
      }).then(function(table) {
        console.log('Created Table entries_votes');
      })
    }
  })  
});

module.exports = knex;
