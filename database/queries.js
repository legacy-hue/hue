const knex = require('./index');

const user = (name) => {
  knex('users').where({name: name})
  .then((userData) => {
    if(userData.length){
      return userData;
    }else{
      console.log(name + ' does not exists in users table');
    }
  })
}

module.exports.user = user;