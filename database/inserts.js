const knex = require('./index');

const user = (name, pass) => {
  knex('users').insert({name: name, password: pass})
  .then(function() {console.log(`inserted user ${name}`)})
  .catch(function(error) {console.log('DID NOT ADD USER: ' + error.detail)});
}

//Expect entry obj with user, title, url

const entry = (entry) => {
  let name = entry.user;
  let title = entry.title;
  let url = entry.url;
  let userid = knex('users').where({name: name}).select('id');
  knex('entries').insert({title: title, url: url, userid: userid})
  .then(function() {console.log(`inserted entry ${title}`)})
  .catch(function(error) {console.log('DID NOT ADD ENTRY: ' + error)});
}

//Expect comment object [user, text, entryid]

const comment = (comment) => {
  let name = comment.user;
  let text = comment.text;
  let entry = comment.entryid;
  let userid = knex('users').where({name: name}).select('id');
  knex('comments').insert({text: text, userid: userid, entryid: entry})
  .then(function() {console.log(`inserted comment by ${name}`)})
  .catch(function(error) {console.log('DID NOT ADD COMMENT: ' + error)});
}


module.exports.user = user;
module.exports.entry = entry;
module.exports.comment = comment;
