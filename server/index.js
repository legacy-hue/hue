const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const helpers = require('./helpers');

const app = express();

app.use(bodyParser());
app.use(express.static(__dirname + '/../client/dist'));

app.get('/', (req, res) => res.send('Hello World!'))

/************************************************************/
// Authentication routes
/************************************************************/

app.get('/signup', (req, res) => 
	res.sendStatus(200)
);

app.get('/login', (req, res) => 
	res.sendStatus(200)
);

app.get('/logout', (req, res) => 
	//req.session.destroy(function() {
    res.redirect('/login')
  //})
);

app.post('/signup', (req, res) => 
	helpers.hashPassword(req.body.password)
	.then(() => {
		helpers.createSession()
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
  	helpers.createSession()
  	.then(() => {
  		res.send('login post received');
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