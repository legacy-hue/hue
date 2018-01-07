  const bcrypt = require('bcrypt-nodejs');

  const insert = require('../database/inserts');
  const query = require('../database/queries');

/************************************************************/
// Authentication Functions
/************************************************************/

  // Invoked by checkUser
  // Checks if a user has an active session
  function isLoggedIn(req) {
    if (req.session.user) {
      return true;
    } else {
      return false;
    }
  }

  // Middleware on all routes to protected components
  // Redirects user if they are not logged in
  function checkUser(req, res, next) {
    console.log('checkUser: ' , req.session);
    if (isLoggedIn(req)) {
      next();
    } else {
      //res.redirect('/login');
      res.send('not logged in');
    }
  }

  // Invoked by post request to "/login"
  // Compare attempted password to password stored in db
  function comparePassword(req) {
    return new Promise((resolve, reject) => {
      // query returns an array with an object inside it that has user properties
      query.user(req.username).then((data) => {
        if (data[0]) {
          bcrypt.compare(req.password, data[0].password, function(err, isMatch) {
            if(isMatch) {
              resolve();
            } else {
              reject(err);
            }
          });
        } else {
          reject();
        }
      })
    })
  }

  // Invoked by post request to "/login" or post request to "/signup"
  // Start an active session after successful login
  function createSession(req, callback) {
    console.log('createSession ran');

    let newUser = req.body.username;
    var result = req.session.regenerate(function() {
      req.session.user = newUser;
      callback();
    })


    // return new Promise((resolve, reject) => {  
    //   req.session.regenerate(function() {
    //     console.log('Before Login: ', req.session);
    //     req.session.user = newUser;
    //     console.log('After Login: ', req.session);
    //   })
    //   resolve();
    // })
  }

  // Invoked by post request to "/signup"
  // Store hash in your password DB.
  function hashPassword(req) {
    const pw = req.password;
    const user = req.username;
    return new Promise((resolve, reject) => {
      bcrypt.hash(pw, null, null, function(err, hash) {
        insert.user(user, hash)
        .then((x) => { resolve(console.log('x ', x)) })
        .catch((y) => { reject(console.log('y ', y)) });
        // insert.user(user, hash);
        // resolve();
      });
    })
  }

  // function sessionTest(req, callback) {
  //   console.log('After Logout: ', req.session);
  //   callback()
  // } 

/************************************************************/
/************************************************************/

//module.exports.sessionTest = test;
module.exports.checkUser = checkUser;
module.exports.comparePassword = comparePassword;
module.exports.createSession = createSession;
module.exports.hashPassword = hashPassword;