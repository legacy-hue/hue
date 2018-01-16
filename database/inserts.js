const knex = require('./index');

const user = (name, pass) => {
  return knex('users').insert({name: name, password: pass})
  // .then(function() {console.log(`inserted user ${name}`)})
  // .catch(function(error) {console.log('DID NOT ADD USER: ' + error.detail)});
}

//Expect entry obj with user, title, url

const entry = (entry) => {
  let name = entry.user;
  let title = entry.title;
  let url = entry.url;
  let text = entry.text;
  let userid = knex('users').where({name: name}).select('id');
  return knex('entries').insert({title: title, url: url, userid: userid, text: text, up_votes: 0, down_votes: 0});
}

const textEntry = entry => {
  let name = entry.user;
  let title = entry.title;
  let url = entry.url;
  let text = entry.text;
  let userid = knex('users').where({name: name}).select('id');
  return knex('entries').insert({title: title, userid: userid, text: text, up_votes: 0, down_votes: 0}, 'id')
  .then(data => {
    return knex('entries').where({id: data[0]}).update({url: `#/thread/${data[0]}`});
  });
}

//Expect comment object [user, text, entryid]

const comment = (comment) => {
  let name = comment.user;
  let text = comment.text;
  let entry = comment.entryid;
  let userid = knex('users').where({name: name}).select('id');
  knex('comments').insert({text: text, userid: userid, entryid: entry, up_votes: 0, down_votes: 0})
  .then(function() {console.log(`inserted comment by ${name}`)})
  .catch(function(error) {console.log('DID NOT ADD ENTRY: ' + error)});
}

/************************************************************/
// Prestige (karma) inserts
/************************************************************/


const upVoteEntry = (id) => {
  return knex('entries')
  .where({id: id})
  .update({
    'up_votes': knex.raw('up_votes + 1'),
  })
}

const downVoteEntry = (id) => {
  return knex('entries')
  .where({id: id})
  .update({
    'down_votes': knex.raw('down_votes - 1'),
  })
}

const upVoteComment = (id) => {
  return knex('comments')
  .where('id', '=', id)
  .update({
    'up_votes': knex.raw('up_votes + 1'),
  })
}

const downVoteComment = (id) => {
  return knex('comments')
  .where({id: id})
  .update({
    'down_votes': knex.raw('down_votes - 1'),
  })
}

const recordEntryVote = (userid, entryid) => {
  return knex('entries_votes')
  .insert({userid: userid, entryid: entryid, voted: true})
}

const recordCommentVote = (userid, commentid, entryid) => {
  return knex('comments_votes')
  .insert({userid: userid, commentid: commentid, voted: true, entryid: entryid})
}

/************************************************************/
/************************************************************/

module.exports = {
  user,
  entry,
  textEntry,
  comment,
  upVoteEntry,
  downVoteEntry,
  upVoteComment,
  downVoteComment,
  recordEntryVote,
  recordCommentVote
}
