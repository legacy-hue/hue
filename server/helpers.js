// helper.js requirements
  var bcrypt = require('bcrypt-nodejs');

// Authentication Functions:

  function isLoggedIn() {
    // Invoked by checkUser
    // Check if a user has an active session
  }

  function checkUser() {
    // Middleware on all routes to protected components
    // Check if user is logged in before allowing access to protected features
  }

  function comparePassword() {
    // Invoked by post request to "/login"
    // Compare attempted password to password stored in db
  }

  function createSession() {
  	// Invoked by post request to "/login" or post request to "/signup"
    // Start an active session after successful login
  }

  function hashPassword() {
  	// Invoked by post request to "/signup"
    // Hash the input password and store it with the username in db
  }

// authentication TODO:
// add state for username/password fields
// add ajax post request to home page 
// add event listeners to invoke post request
// set post request data to state.username/state.password
// tie server routes to helper functions
// flesh out helper functions
