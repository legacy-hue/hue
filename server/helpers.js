  const bcrypt = require('bcrypt-nodejs');

/************************************************************/
// Authentication Functions
/************************************************************/

  // Invoked by checkUser
  // Checks if a user has an active session
  function isLoggedIn(req) {
    if (req.session) {
      return true;
    } else {
      return false;
    }
  }

  // Middleware on all routes to protected components
  // Redirects user if they are not logged in
  function checkUser(req, res, next) {
    if (isLoggedIn(req)) {
      next();
    } else {
      res.redirect('/login');
    }
  }

  // Invoked by post request to "/login"
  // Compare attempted password to password stored in db
  function comparePassword(pw) {
    console.log('attempted password: ', pw);
    return new Promise((resolve, reject) => {
      // var hash = DB query
      bcrypt.compare(pw, hash, function(err, isMatch) {
        if(isMatch) {
          resolve('success');
        } else {
          reject('fail: ', err);
        }
      });
    })
  }

  // Invoked by post request to "/login" or post request to "/signup"
  // Start an active session after successful login
  function createSession(req) {
    return new Promise((resolve, reject) => {
      let newUser = req.body.username;
      console.log('user session: ', newUser);
      req.session.regenerate(function() {
        req.session.user = newUser;
      })
      resolve();
    })
  }

  // Invoked by post request to "/signup"
  // Store hash in your password DB.
  function hashPassword(pw) {
    return new Promise((resolve, reject) => {
      bcrypt.hash(pw, null, null, function(err, hash) {
        console.log('INPUT PW: ', pw, 'HASH PW: ', hash);
        // Store hash in your password DB.
        resolve();
      });
    })
  }

/************************************************************/
/************************************************************/

module.exports.checkUser = checkUser;
module.exports.comparePassword = comparePassword;
module.exports.createSession = createSession;
module.exports.hashPassword = hashPassword;