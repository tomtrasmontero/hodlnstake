const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;
const db = require('./db');
const seedData = require('./seed');
const coinDataUpdate = require('../cryptocompareUpdate/UpdateCoinDB');

// serve the index.js create react app
app.use(express.static(path.join(__dirname, '../client')));

// use for testing purposes
app.use(require('body-parser').json());

app.use('/api', require('./routes/index'));

app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../client/public/index.html')));
// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './public/index.html'));
});

// sync database before starting server// dev
if (process.env.SYNC === 'true') {
  db.sync()
    .then(() => Promise.resolve(coinDataUpdate()))
    .then(() => seedData.seed())
    .catch(err => console.log(err));
}


app.listen(port, () => console.log(`Listening on port ${port} dev server`));

// for testing purposes
module.exports = app;
