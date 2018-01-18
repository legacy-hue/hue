const knex = require('./index');

const user = (name, pass, email) => {
  return email ? knex('users').insert({name: name, password: pass, email: email}) :
    knex('users').insert({ name: name, password: pass });
  // .then(function() {console.log(`inserted user ${name}`)})
  // .catch(function(error) {console.log('DID NOT ADD USER: ' + error.detail)});
}

//Expect entry obj with user, title, url

const entry = (entry) => {
  let subhue = entry.subhue;
  let name = entry.user;
  let title = entry.title;
  let url = entry.url;
  let text = entry.text;
  let userid = knex('users').where({name: name}).select('id');
  let subhueid = knex('subhues').where({name: subhue}).select('id');
  return knex('entries').insert({subhueid: subhueid, title: title, url: url, userid: userid, text: text, up_votes: 0, down_votes: 0});
}

const textEntry = entry => {
  let subhue = entry.subhue;
  let name = entry.user;
  let title = entry.title;
  let url = entry.url;
  let text = entry.text;
  let userid = knex('users').where({name: name}).select('id');
  let subhueid = knex('subhues').where({name: subhue}).select('id');
  return knex('entries').insert({subhueid: subhueid, title: title, userid: userid, text: text, up_votes: 0, down_votes: 0}, 'id')
  .then(data => {
    return knex('entries').where({id: data[0]}).update({url: `#/thread/${data[0]}`});
  });
}

const messageEntry = entry => {
  console.log('From db: ', entry);
  let send_id = knex('users').where({name: entry.sender}).select('id');
  let rec_id = knex('users').where({name: entry.recipient}).select('id');
  let text = entry.text;
  let subject = entry.title;
  return knex('inbox').insert({send_id: send_id, rec_id: rec_id, text: text, subject: subject})
  .then(() => {
    console.log(`inserted message from ${entry.sender}`)
  })
  .catch(() => {
    console.log('failed to insert!')
  })
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
  .where({id: id})
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

const recordEntryVote = (userid, entryid, voted) => {
  return knex('entries_votes')
  .insert({userid: userid, entryid: entryid, voted: voted})
}

const recordCommentVote = (userid, commentid, voted, entryid) => {
  return knex('comments_votes')
  .insert({userid: userid, commentid: commentid, voted: voted, entryid: entryid})
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
  recordCommentVote,
  messageEntry
}
