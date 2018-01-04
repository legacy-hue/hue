const knex = require('./index');

const user = (name, pass) => {
  knex('users').insert({name: name, password: pass}).then(function() {console.log(`inserted user ${name}`)}).catch(function(error) {console.log(error.detail)});
}

module.exports.user = user;