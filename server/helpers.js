  const bcrypt = require('bcrypt-nodejs');
  const insert = require('../database/inserts');
  const query = require('../database/queries');
  const update = require('../database/updates');

/************************************************************/
// Prestige (karma) middleware
/************************************************************/

function checkCommentVote(userid, commentid, voteType, entryid, callback) {
  query.checkCommentVote(userid, commentid).then((data)=> {
    console.log('Comment data:', data);
    const voteData = data[0];
    if (voteData === undefined) {
      insert.recordCommentVote(userid, commentid, voteType, entryid).then(() => callback({before: 'none', after: voteType}));
    } else {
      callback(false);
    }
    // else if (voteData.voted === 'none') {
    //   update.updateCommentVote(userid, commentid, voteType).then(() => callback({before: 'none', after: voteType}));      
    // } else if (voteData.voted === voteType) {
    //   update.updateCommentVote(userid, commentid, 'none').then(() => callback({before: voteType, after: 'none'}));
    // } else {
    //   update.updateCommentVote(userid, commentid, voteType).then(() => callback({before: voteData.voted, after: voteType}));
    // }
  })
}

function checkEntryVote(userid, entryid, voteType, callback) {
  query.checkEntryVote(userid, entryid).then((data)=> {
    const voteData = data[0];
    if (voteData === undefined) {
      insert.recordEntryVote(userid, entryid, voteType).then(() => {callback(true)})
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
  

//Hue color generation functions:

  function hashCode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    return hash;
  }

  function mapRangeToHex(num) {
    const hex = (Math.ceil(num * 255)).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }

  function intToRGBHex(hash, alpha) {

    const hexColor = (hash & 0x00FFFFFF)
      .toString(16)
      .toUpperCase();
    let hex = '00000'.substring(0, 6 - hexColor.length) + hexColor;

    if(alpha) {
      hex = hex + mapRangeToHex(alpha);
    }

    return hex;
  }

  function hexToRGB(hex, alpha) {
    hex = hex[0] === '#' ? hex : '#' + hex;
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    return alpha !== undefined ? `rgba(${r}, ${g}, ${b}, ${alpha})` : `rgb(${r}, ${g}, ${b})`;
  }

  // Invoked post request to subhues
  // Required input: hueName: string, alpha: Number (from 0 to 1)
  // returns Obj {hex: String, rba: String}
  function stringToRGB(hueName, alpha) {
    const hash = hashCode(hueName);
    const hex = '#' + intToRGBHex(hash, alpha);
    const rgb = hexToRGB(hex, alpha);

    return {hex, rgb};
  }

  module.exports = {
  checkCommentVote,
  checkEntryVote,
  identifyUser,
  comparePassword,
  hashPassword,
  createSession,
  checkUser
};
