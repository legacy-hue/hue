  const bcrypt = require('bcrypt-nodejs');
  const bcrypt2 = require('bcrypt');

// Authentication Functions:

  function isLoggedIn() {
    // Invoked by checkUser
    // Check if a user has an active session
  }

  function checkUser() {
    // Middleware on all routes to protected components
    // Check if user is logged in before allowing access to protected features
  }

  function comparePassword(pw) {
    console.log('attempted password: ', pw);
    // Invoked by post request to "/login"
    // Compare attempted password to password stored in db
    return new Promise((resolve, reject) => {
      resolve('success');
    })
  }

  function createSession() {
    console.log('create session ran');
  	// Invoked by post request to "/login" or post request to "/signup"
    // Start an active session after successful login
    return new Promise((resolve, reject) => {
      resolve();
    })
  }

  function hashPassword(pw) {
    console.log('hashPassword password: ', pw);
  	// Invoked by post request to "/signup"
    // Hash the input password and store it with the username in db
    return new Promise((resolve, reject) => {
      resolve();
    })
  }

module.exports.comparePassword = comparePassword;
module.exports.createSession = createSession;
module.exports.hashPassword = hashPassword;