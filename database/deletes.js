const knex = require('./index');

const entry = (entryid) => {
  return knex('entries')
  .where({'id': entryid})
  .del();
}

const entryVotes = (entryid) => {
  return knex('entries_votes')
  .where({'entryid': entryid})
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

const commentVotes = (entryid) => {
  console.log('entryid: ', entryid)
  return knex('comments_votes')
  .where({'entryid': entryid})
  .del();
}

module.exports = {
  entry,
  entryVotes,
  comment,
  commentVotes,
  comments
};