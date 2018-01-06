const knex = require('./index');

const user = (name) => {
  return knex('users').where({name: name})
}

const entries = () => {
  return knex('entries');
}

const comments = (entryid) => {
  return knex('comments').where({entryid: entryid});
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