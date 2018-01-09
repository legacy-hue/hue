const knex = require('./index');

const user = (name) => {
  return knex('users').where({name: name})
}

const entries = () => {
  return knex('entries')
  .join('users', 'entries.userid', '=', 'users.id')
  .select('entries.id', 'entries.url', 'entries.title', 'users.name');
}

const comments = (entryid) => {
  return knex('comments')
  .where({entryid: entryid})
  .join('users', 'comments.userid', '=', 'users.id')
  .select('comments.id', 'comments.text', 'users.name');
}

const entriesByUser = name => {
  let userid = knex('users').where({name: name}).select('id');
  return knex('entries').where({userid: userid});
}

const commentsByUser = (name) => {
  let userid = knex('users').where({name: name}).select('id');
  return knex('comments').where({userid: userid});
}


module.exports = {
  user,
  entries,
  comments,
  entriesByUser,
  commentsByUser
};