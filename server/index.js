const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const helpers = require('./helpers');

const db = require('../database/index');
const insert = require('../database/inserts');
const query = require('../database/queries');


const app = express();

app.use(bodyParser());
app.use(session({secret: 'this-is-a-secret-token'}));
app.use(express.static(__dirname + '/../client/dist'));

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


/************************************************************/
// Authentication routes
/************************************************************/

app.get('/signup', (req, res) => 
	res.sendStatus(200)
);

app.get('/login', (req, res) => 
	res.sendStatus(200)
);

app.post('/logout', (req, res) => 
	req.session.destroy(function() {
    res.send('logged out')
  })
);

app.post('/signup', (req, res) => 
	helpers.hashPassword(req.body.password)
	.then(() => {
		helpers.createSession(req)
		.then(() => {
	    res.send('signup post received');
		})
		.catch(() => {
			res.send('createSession failed');
		})
	})
	.catch(() => {
		console.log('hashPassword error');
	})
);

app.post('/login', (req, res) =>
  helpers.comparePassword(req.body.password)
  .then((msg) => {
  	helpers.createSession(req)
  	.then(() => {
  		res.send('login post received, new session created');
  	})
    .catch(() => {
    	res.send('createSession failed');
    })
  })
  .catch(() => {
  	res.send('comparePassword failed');
  })
);

/************************************************************/
/************************************************************/

let port = process.env.port || 1234;

app.listen(1234, () => console.log(`Example app listening on port ${port}!`))