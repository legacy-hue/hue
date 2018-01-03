// helper.js requirements
  var bcrypt = requires('bcrypt-nodejs');

// Authentication Functions:

  function isLoggedIn() {
    // Helper functoin on server side, in helpers.js
    // Invoked by checkUser
    // check if a user has an active session
  }

  function checkUser() {
  	// Helper function on server side, in helpers.js
    // Middleware on all routes to protected components
    // check if user is logged in before allowing access to protected features
  }

  function createSession() {
  	// Helper function on server side, in helpers.js
  	// Invoked by post to /login after comparePassword, or post to /signup
    // Initiate an active session upon loggin in
  }

  function comparePassword() {
  	// Method on User model/profile/class
  	// Invoked by post to /login
    // compare attempted pw vs pw queried from db based on username
  }

  function hashPassword() {
  	// Method on User model/profile/class
  	// Invoked when new user is initialized
    // hash the new pw and set it in the db
  }
  

// Server requirements
  var session = requires('express-session');
  var helpers = requires('./helpers');
// Server routes
  app.get('/signup')
  app.get('/login')
  app.post('/signup')
  app.post('/login')
