var pg = require('knex')({
  client: 'pg',
  connection: process.env.PG_CONNECTION_STRING,
  searchPath: ['knex', 'public'],
});

knex.schema.createTableIfNotExists('users', function (table) {
  table.increments();
  table.string('name');
  table.string('password');
  table.timestamps();
}).then((table) => {
  console.log('Created table' + table);
}});

knex.schema.createTableIfNotExists('entries', function (table) {
  table.increments();
  table.string('title');
  table.string('url');
  table.string('commenturl');
  table.integer('userid');
  table.timestamps();
});

knex.schema.createTableIfNotExists('users', function (table) {
  table.increments();
  table.string('text');
  table.integer('userid');
  table.integer('entryid');
  table.timestamps();
});