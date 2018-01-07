const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
//var partials = require('express-partials');

const helpers = require('./helpers');
const db = require('../database/index');
const insert = require('../database/inserts');
const query = require('../database/queries');


const app = express();

//app.use(partials());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../client/dist'));
app.use(session({
  secret: 'shhh, it\'s a secret',
  resave: false,
  saveUninitialized: true
}));

app.get('/entries', (req, res) => {
  query.entries().then(data => {res.json(data)});
});

app.get('/comments', (req, res) => {

  //req.body must contain entryid for comments you want

  let entryid = req.body.entryid;
  query.comments(entryid).then(data => {res.json(data)});

});

app.post('/entries', (req, res) => {
  insert.entry(req.body);
  res.send('added entry');
});

app.post('/comments', (req, res) => {
  insert.comment(req.body);
  res.send('added comment');
});

app.post('/submit', helpers.checkUser, (req, res) => {
  res.send('success');
  //res.redirect('/submit');
});

/************************************************************/
// Authentication routes
/************************************************************/

app.get('/signup', (req, res) => 
	res.sendStatus(200)
);

app.get('/login', (req, res) => 
	res.sendStatus(200)
);

app.post('/logout', (req, res) => {
  req.session.destroy(function() {
    //helpers.sessionTest(req, function() {
      res.send('logged out')
    //})
  })
});

app.post('/signup', (req, res) => {
  // helpers.createSession(req, function() {
  //   res.send('success');
  // });
	helpers.hashPassword(req.body)
	.then(() => {
    var user = req.body.username;
		helpers.createSession(req, res)
		.then(() => {
	    res.send('Signup successful');
		})
		.catch(() => {
			res.send('createSession failed');
		})
	})
	.catch(() => {
		//console.log('Username already exists');
    res.send('Username already exists');
	})
});

app.post('/login', (req, res) => {
  // helpers.createSession(req, function() {
  //   res.send('success');
  // });
  helpers.comparePassword(req.body)
  .then(() => {
  	helpers.createSession(req, function() {
      res.send('Login successful');
    })
  	// .then(() => {
  	// 	res.send('Login successful');
  	// })
   //  .catch(() => {
   //  	res.send('Error: failed to create session');
   //  })
  })
  .catch(() => {
  	res.send('Incorrect password');
  })
});

/************************************************************/
/************************************************************/

let port = process.env.port || 1234;

app.listen(1234, () => console.log(`Example app listening on port ${port}!`))