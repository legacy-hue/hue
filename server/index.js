const express = require('express')
const bodyParser = require('body-parser');

const app = express();

app.use(express.static(__dirname + '/../client/dist'));

app.get('/', (req, res) => res.send('Hello World!'))

let port = process.env.port || 1234;

app.listen(1234, () => console.log(`Example app listening on port ${port}!`))