const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;
const db = require('./db');

// prod
app.use(express.static(path.join(__dirname, '../client/build')));

// use for testing purposes
// dev
app.use(require('body-parser').json());

// prod
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.use('/api', require('./routes/index'));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  const index = path.join(__dirname, '../client/build/index.html');
  res.sendFile(index);
});

// prod
if (process.env.SYNCPROD === 'true') {
  db.sync()
    .catch(err => console.log(err));
}

app.listen(port, () => console.log(`Listening on port ${port}`));

// for testing purposes
module.exports = app;
