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
  return knex('comments_votes')
  .where({'entryid': entryid})
  .del();
}

const commentVotesByComment = (commentid) => {
  return knex('comments_votes')
  .where({'commentid': commentid})
  .del();  
}

const user = (user) => {
  return knex('users')
  .where({name: user})
  // change all related user content userids to default user (id: 1, name: deleted)
}

module.exports = {
  entry,
  entryVotes,
  comment,
  commentVotes,
  commentVotesByComment,
  user,
  comments
};
