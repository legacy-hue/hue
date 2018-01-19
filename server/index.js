const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const util = require('util');

const jwt = require('jsonwebtoken');
const sign = util.promisify(jwt.sign);
const verify = util.promisify(jwt.verify);

const bcrypt = require('bcrypt-nodejs');
const hash = util.promisify(bcrypt.hash);
const compare = util.promisify(bcrypt.compare);

const helpers = require('./helpers');
const sendEmail = require('./email');
const db = require('../database/index');
const insert = require('../database/inserts');
const query = require('../database/queries');
const deletes = require('../database/deletes');
const config = require('../config.js');

const JWT_KEY = config.JWT_KEY || process.env.JWT_KEY;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../client/dist'));
app.use(session({secret: 'dont hack me brah'}));


app.get('/entries', (req, res) => {
  query.entries().then(data => {res.json(data)});
});

app.get('/userEntries', (req, res) => {
  let userid = req.query.id;
  query.entriesByUser(userid).then(data => {res.json(data)});
});

app.get('/comments', (req, res) => {
  let entryid = req.query.entryid;
  query.comments(entryid).then(data => {res.json(data)});
});

app.get('/userComments', (req, res) => {
  let userid = req.query.id;
  query.commentsByUser(userid).then(data => {res.json(data)});
})

app.get('/likedPosts', (req, res) => {
  let userid = req.query.id;
  // query.getLikedComments(userid)
  query.getLikedEntries(userid)
  .then(data => {
    data = data.map(entry => {
      entry.type = 'entry';
      return entry;
    });
    console.log('DATA midway:', data, '\n\n');
    return query.getLikedComments(userid)
    .then(likedComments => {
      return data.concat(likedComments.map(comment => {
        comment.type = 'comment';
        return comment;
      }));
    });
  })
  .then(data => {
    console.log('DATA IN SERVER:', data);
    res.json(data)
  })
  .catch(err => console.log(err));
})

app.get('/entry', (req, res) => {
  let entryid = req.query.id;
  query.entry(entryid).then(data => {res.json(data)});
});

app.post('/entries', helpers.checkUser, (req, res) => {
  let entry = req.body;
  entry.user = req.session.user;
  if(entry.title === '' || ((entry.text === '') && (entry.url === 'none'))) {
    res.send('failure');
  }else{
    if(entry.url === 'none'){
      insert.textEntry(entry)
      .then(() => res.send('success'))
      .catch(() => res.send('failure'));
    }else{
      insert.entry(entry)
      .then(() => res.send('success'))
      .catch(() => res.send('failure'));
    }
  }
});

app.post('/comments', helpers.checkUser, (req, res) => {
  let comment = req.body;
  comment.user = req.session.user;
  insert.comment(comment);
  res.send('added comment');
});

app.delete('/entry', helpers.checkUser, (req, res) => {
  deletes.commentVotes(req.query.id).then(() => {
    deletes.entryVotes(req.query.id).then(() => {
      deletes.comments(req.query.id).then(() => {     
        deletes.entry(req.query.id).then(data => {
          res.send('deleted entry')
        });
      })
    })
  })
});

app.delete('/comment', helpers.checkUser, (req, res) => {
  deletes.commentVotesByComment(req.query.id).then(() => {
    deletes.comment(req.query.id).then(data => {
      res.send('deleted comment')
    });
  })
});

app.post('/search', (req, res) => {
  query.searchByTitle(req.body.query)
  .then((data) => {
    var posts = data;
    query.searchByUser(req.body.query)
    .then((user) => {
      let all = {posts: posts, user: user}
      res.json(all)
    })
    .catch((errors) => {
      res.json({posts: posts})
    })
  })
  .catch((err) => {
    query.searchByUser(req.body.query)
    .then((user) => {
      let all = {user: user}
      res.json(all)
    })
    .catch((error) => {
      res.sendStatus(400);
    })
  })
})

app.post('/getMessages', (req, res) => {
  query.getMessagesByRecipient(req.body.recipient)
  .then((data) => {
    res.json(data);
  })
  .catch((err) => {
    console.log(err);
  })
})

app.post('/getSentMessage', (req, res) => {
  query.getMessagesBySender(req.body.sender)
  .then(data => {
    res.json(data)
  })
  .catch(err => {
    console.log(err);
  })
})

app.post('/sendMessage', (req, res) => {
  insert.messageEntry(req.body)
  .then(() => {
    res.sendStatus(201);
  })
  .catch((err) => {
    console.log(err);
    res.sendStatus(400);
  })
})

/************************************************************/
// Prestige (karma) routes
/************************************************************/

app.get('/getEntryVotes', (req, res) => {
  let id = req.query.id;
  query.getEntryVotes(id).then((data) => {
    res.json(data)});
})

app.get('/getCommentVotes', (req, res) => {
  let id = req.query.id;
  query.getCommentVotes(id).then((data) => {
    res.json(data)
  });
})

app.post('/upVoteComment', helpers.checkUser, (req, res) => {
  let userid = req.query.user;
  let commentid = req.query.comment;
  let entryid = req.query.entry;
  helpers.checkCommentVote(userid, commentid, 'upvote', entryid, function(canVote) {
    console.log('UPVOTE DATA IN SERVER:', canVote);
    if (canVote) {
      insert.upVoteComment(commentid).then((data) => {res.json(data)})
    } else {
      res.sendStatus(201)
    }
  })  
})

app.post('/downVoteComment', helpers.checkUser, (req, res) => {
  let userid = req.query.user;
  let commentid = req.query.comment;
  let entryid = req.query.entry;
  helpers.checkCommentVote(userid, commentid, 'downvote', entryid, function(canVote) {
    console.log('DOWNVOTE DATA IN SERVER:', canVote);
    if (canVote) {
      insert.downVoteComment(commentid).then((data) => {res.json(data)})
    } else {
      res.sendStatus(201)
    }
  })  
})

app.post('/upVoteEntry', helpers.checkUser, (req, res) => {
  let userid = req.query.user;
  let entryid = req.query.entry;
  helpers.checkEntryVote(userid, entryid, 'upvote', function(canVote) {
    if (canVote) {
      insert.upVoteEntry(entryid).then((data) => {res.json(data)})
    } else {
      res.sendStatus(201)
    }
  })  
})

app.post('/downVoteEntry', helpers.checkUser, (req, res) => {
  let userid = req.query.user;
  let entryid = req.query.entry;
  helpers.checkEntryVote(userid, entryid, 'downvote', function(canVote) {
    if (canVote) {
      insert.downVoteEntry(entryid).then((data) => {res.json(data)})
    } else {
      res.sendStatus(201)
    }
  })  
})

/************************************************************/
// Authentication routes
/************************************************************/

app.post('/signup', helpers.checkEmail, (req, res) => {
	helpers.hashPassword(req)
  .then(() => {
    helpers.createSession(req, function() {
      res.send('Congratulations! Welcome to hue.');
    })
	})
  .catch(() => {
    res.send('Sorry that username already exists.');
  })
});

app.post('/login', (req, res) => {
  helpers.identifyUser(req)
  .then(() => {
    helpers.createSession(req, function() {
      res.send('Login successful');
    })      
  })
  .catch((result) => {
    res.send(result);
  })
});

app.post('/logout', (req, res) => {
  req.session.destroy(function() {
    res.send('Thanks for visiting!')
  })
});

app.get('/submit', helpers.checkUser, (req, res) => {
  res.send(req.session);
})

//password recovery
app.post('/passwordRecovery', helpers.checkEmail, (req, res) => {
  query.getUserByEmail(req.body.email)
  .then(data => {
    if(!data.length) res.send('No user associated with that email');
    else {
      const name = data[0].name;
      const email = req.body.email;
      const host = req.protocol + '://' + req.get('host');
      
      hash(name, null, null)
        .then(hashString => sign({name, hash: hashString}, JWT_KEY))
        .then(token => sendEmail(name, email, token, host))
        .then(data => res.json(data))
        .catch(err => res.sendStatus(400))
    }
  })
});

app.post('/confirmName', (req, res) => {
  const token = req.body.jwtToken;
  console.log('Body:', req.body);
  console.log('Token', token);
  verify(token, JWT_KEY)
   .then(data => {
     console.log('Data from token:', data);
     res.json(data);
   })
   .catch(err => {
     console.log(err);
     res.sendStatus(400);
   })
});

/************************************************************/
/************************************************************/

let port = process.env.PORT || 1234;

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
