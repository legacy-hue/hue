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
  return knex('entries').insert({title: title, url: url, userid: userid, text: text, prestige: 0});
}

const textEntry = entry => {
  let name = entry.user;
  let title = entry.title;
  let url = entry.url;
  let text = entry.text;
  let userid = knex('users').where({name: name}).select('id');
  return knex('entries').insert({title: title, userid: userid, text: text}, 'id')
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
  knex('comments').insert({text: text, userid: userid, entryid: entry})
  .then(function() {console.log(`inserted comment by ${name}`)})
  .catch(function(error) {console.log('DID NOT ADD ENTRY: ' + error)});
}

const prestige = (vote, id) => {
  console.log('prestige: ', id, vote)
  vote = Number(vote);
  var id = Number(id);
  return knex('entries')
  .where('id', '=', id)
  .increment('prestige', vote)
}

module.exports.prestige = prestige;
module.exports.user = user;
module.exports.entry = entry;
module.exports.textEntry = textEntry;
module.exports.comment = comment;
