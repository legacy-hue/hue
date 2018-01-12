  const bcrypt = require('bcrypt-nodejs');

  const insert = require('../database/inserts');
  const query = require('../database/queries');

/************************************************************/
// Prestige (karma) middleware
/************************************************************/

function checkCommentVote(userid, commentid, callback) {
  console.log(`checkCommentVote: userid ${userid} commentid ${commentid}`)
  query.checkCommentVote(userid, commentid).then((data)=> {
    console.log('checkCommentVote recieved: ', data[0])
    const voted = data[0];
    if (voted === undefined) {
      insert.recordCommentVote(userid, commentid).then(() => {callback(true)})
    } else {
      callback(false);
    }
  })
}

function checkEntryVote(userid, entryid, callback) {
  console.log(`checkEntryVote: userid ${userid} entryid ${entryid}`)
  query.checkEntryVote(userid, entryid).then((data)=> {
    console.log('checkEntryVote recieved: ', data[0])
    const voted = data[0];
    if (voted === undefined) {
      insert.recordEntryVote(userid, entryid).then(() => {callback(true)})
    } else {
      callback(false);
    }
  })
}

/************************************************************/
// Authentication Functions
/************************************************************/
  
  // Invoked by a post request to "/login"
  // Required input: attempted username and password
  // On sucess: invokes comparePassword
  // On failure: sends incorrect username response
  function identifyUser(req) {
    return new Promise((resolve, reject) => {
      query.user(req.body.username).then((result) => {
        if (result.length === 0) {
          reject('Username does not exist.');
        } else {
           comparePassword(result, req)
          .then((result) => {
            resolve(result);
          })
          .catch((result) => {
            reject(result);
          });       
        }
      })      
    })
  }

  // Invoked by identifyUser
  // Required input: attempted username and password
  // On sucess: invokes createSession
  // On failure: sends incorrect password response
  function comparePassword(result, req, callback) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(req.body.password, result[0].password, function(err, isMatch) {
        if(isMatch) {
          resolve();
        } else {
          reject('Incorrect password.');
        }
      });       
    })
  }

  // Invoked by a post request to "/signup"
  // Input: attempted username and password
  // On success: invokes createSession
  // On failure: sends duplicate username response
  function hashPassword(req) {
    return new Promise((resolve, reject) => {
      bcrypt.hash(req.body.password, null, null, function(err, hash) {
        insert.user(req.body.username, hash)
        .then(() => resolve())
        .catch(() => reject());
      });
    })
  }

  // Invoked by comparePassword and hashPassword
  // Required input: client request object
  // On sucess: sends sucess response
  // On failure: browser will throw an error
  function createSession(req, callback) {
    let newUser = req.body.username;
    var result = req.session.regenerate(function() {
      req.session.user = newUser;
      callback();
    })
  }

  // Invoked by get request to "/submit"
  // Required input: request, response, and next
  // On success: sends username response
  // On failure: sends false response
  function checkUser(req, res, next) {
    if (isLoggedIn(req)) {
      next();
    } else {
      res.send(false);
    }
  }

  // Invoked post request to entries and comments
  // Required input: client request object
  // On success: returns true
  // On failure: returns false
  function isLoggedIn(req) {
    if (req.session.user) {
      return true;
    } else {
      return false;
    }
  }

/************************************************************/
/************************************************************/

module.exports = {
  checkCommentVote,
  checkEntryVote,
  identifyUser,
  comparePassword,
  hashPassword,
  createSession,
  checkUser
};