const router = require('express').Router();
const db = require('../db').models;

router.get('/:id', (req, res, next) => {
  db.Users.findAll({ where: { id: req.params.id } })
    .then(user => res.send(user))
    .catch(next);
});

// authenticate with firebase and send the UID to the postgres
router.post('/create', (req, res, next) => {
  db.Users.create({
    name: req.body.name,
    firebaseUID: req.body.firebaseUID,
    email: req.body.email,
  })
    .then(user => res.send(user))
    .catch(next);
});

module.exports = router;
