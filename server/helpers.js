  const bcrypt = require('bcrypt-nodejs');

  const insert = require('../database/inserts');
  const query = require('../database/queries');

/************************************************************/
// Authentication Functions
/************************************************************/

  function authenticate(req, callback) {
    query.user(req.body.username).then((result) => {
      if (result.length === 0) {
        callback('Username does not exist.');
      } else {
         comparePassword(result, req)
        .then(() => {
          callback('Success');
        })
        .catch(() => {
          callback('Incorrect password.');
        });       
      }
    })
  }

  // Invoked by a post request to "/login"
  // Input: attempted username and password
  // On sucess: invokes createSession
  // On failure: sends failure response to user
  function comparePassword(result, req, callback) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(req.body.password, result[0].password, function(err, isMatch) {
        if(isMatch) {
          resolve(createSession(req));
        } else {
          reject();
        }
      });       
    })
  }

  // Invoked by a post request to "/signup"
  // Input: attempted username and password
  // On success: invokes createSession
  // On failure: sends failure response to user
  function hashPassword(req) {
    return new Promise((resolve, reject) => {
      bcrypt.hash(req.body.password, null, null, function(err, hash) {
        insert.user(req.body.username, hash)
        .then(() => resolve(createSession(req)))
        .catch(() => resolve('Sorry that username already exists.'));
      });
    })
  }

  // Invoked by a post request to "/login" or "/signup"
  // Input: username and a response function
  // On failure: browser will throw an error
  // On sucess: sends sucess response to user
  function createSession(req, callback) {
    const newUser = req.body.username;
    const result = req.session.regenerate(function() {
      req.session.user = newUser;
    })
    return 'Success';
  }

  // Invoked by get request to "/submit"
  // Returns username if they are logged in
  function checkUser(req, res, next) {
    if (isLoggedIn(req)) {
      next();
    } else {
      res.send(false);
    }
  }

  // Invoked by checkUser
  // Checks if a user has an active session
  function isLoggedIn(req) {
    if (req.session.user) {
      return true;
    } else {
      return false;
    }
  }

/************************************************************/
/************************************************************/
module.exports.authenticate = authenticate;
module.exports.checkUser = checkUser;
module.exports.comparePassword = comparePassword;
module.exports.createSession = createSession;
module.exports.hashPassword = hashPassword;