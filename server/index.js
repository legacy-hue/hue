const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const helpers = require('./helpers');
const db = require('../database/index');
const insert = require('../database/inserts');
const query = require('../database/queries');
const deletes = require('../database/deletes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../client/dist'));
app.use(session({secret: 'dont hack me brah'}));


app.get('/entries', (req, res) => {
  query.entries().then(data => {res.json(data)});
});

app.get('/userEntries', (req, res) => {
  // console.log('userEntries: ', req.query.id);
  let userid = req.query.id;
  query.entriesByUser(userid).then(data => {res.json(data)});
})

app.get('/comments', (req, res) => {
  let entryid = req.query.entryid;
  query.comments(entryid).then(data => {res.json(data)});
});

app.get('/userComments', (req, res) => {
  let userid = req.query.id;
  query.commentsByUser(userid).then(data => {res.json(data)});
})

app.get('/entry', (req, res) => {
  let entryid = req.query.id;
  query.entry(entryid).then(data => {res.json(data)});
});

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
    res.json(data)});
})

app.post('/upVote', helpers.checkVote, (req, res) => {
  let vote = req.query.vote;
  let id = req.query.id;
  insert.upVote(vote, id).then((data) => {res.json(data)});
})

app.post('/downVote', helpers.checkVote, (req, res) => {
  let vote = req.query.vote;
  let id = req.query.id;
  insert.downVote(vote, id).then((data) => {res.json(data)})
})

app.post('/upVoteComment', helpers.checkVote, (req, res) => {
  let vote = req.query.vote;
  let id = req.query.id;
  insert.upVoteComment(vote, id).then((data) => {res.json(data)});
})

// app.post('/downVoteComment', helpers.checkVote, (req, res) => {
//   let vote = req.query.vote;
//   let id = req.query.id;
//   insert.downVoteComment(vote, id).then((data) => {res.json(data)})
// })

app.post('/downVoteComment', (req, res) => {
  let userid = req.query.user;
  let commentid = req.query.comment;
  //console.log(`downVoteComment: userid: ${userid} commentid: ${commentid}`);
  helpers.checkVote(userid, commentid, function(canVote) {
    if (canVote) {
      insert.downVoteComment(commentid).then((data) => {res.json(data)})
    } else {
      res.sendStatus(201)
    }
  })  
})

/************************************************************/
/************************************************************/

app.post('/entries', helpers.checkUser, (req, res) => {
  let entry = req.body;
  entry.user = req.session.user;
  console.log('entery: ', entry);
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
  deletes.comments(req.query.id).then(() => {
    deletes.entry(req.query.id).then(data => {res.send('deleted entry')});
  })
});

app.delete('/comment', helpers.checkUser, (req, res) => {
  deletes.comment(req.query.id).then(data => {res.send('delted comment')});
});

/************************************************************/
// Authentication routes
/************************************************************/

app.post('/signup', (req, res) => {
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

/************************************************************/
/************************************************************/

let port = process.env.PORT || 1234;

app.listen(port, () => console.log(`Example app listening on port ${port}!`))