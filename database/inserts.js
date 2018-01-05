const knex = require('./index');

const user = (name, pass) => {
  knex('users').insert({name: name, password: pass})
  .then(function() {console.log(`inserted user ${name}`)})
  .catch(function(error) {console.log('DID NOT ADD USER: ' + error.detail)});
}

//Expect entry array [username, title, url]

const entry = (entry) => {
  let name = entry[0];
  let title = entry[1];
  let url = entry[2];
  let userid = knex('users').where({name: name}).select('id');
  knex('entries').insert({title: title, url: url, userid: userid})
  .then(function() {console.log(`inserted entry ${title}`)})
  .catch(function(error) {console.log('DID NOT ADD ENTRY: ' + error)});
}

//Expect comment array [text, username, entryid]

const comment = (comment) => {
  let text = comment[0];
  let name = comment[1];
  let entry = comment[2];
  let userid = knex('users').where({name: name}).select('id');
  knex('comments').insert({text: text, userid: userid, entryid: entry})
  .then(function() {console.log(`inserted comment by ${comment[1]}`)})
  .catch(function(error) {console.log('DID NOT ADD COMMENT: ' + error)});
}


module.exports.user = user;
module.exports.entry = entry;
module.exports.comment = comment;
