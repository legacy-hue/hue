const knex = require('./index');

const entry = (entryid) => {
  return knex('entries')
  .where({'id': entryid})
  .del();
}

const comments = (entryid) => {
  return knex('comments')
  .where({'entryid': entryid})
  .del();
}

const comment = (commentid) => {
  return knex('comments')
  .where({'id': commentid})
  .del();
}

module.exports = {
  entry,
  comment,
  comments
};