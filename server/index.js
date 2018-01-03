const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const helpers = require('./helpers');

const app = express();

app.use(express.static(__dirname + '/../client/dist'));

app.get('/', (req, res) => res.send('Hello World!'))

/************************************************************/
// Authentication routes
/************************************************************/

app.get('/signup', (req, res) => res.sendStatus(200))
app.get('/login', (req, res) => res.sendStatus(200))
app.get('/signout', (req, res) => res.sendStatus(200))

app.post('/signup', (req, res) => res.sendStatus(201))
app.post('/login', (req, res) => res.sendStatus(201))

/************************************************************/

/************************************************************/

let port = process.env.port || 1234;

app.listen(1234, () => console.log(`Example app listening on port ${port}!`))