const router = require('express').Router();

router.use('/auth', require('./auth'));
router.use('/user', require('./user'));
router.use('/news', require('./news'));
router.use('/transactions', require('./transaction'));
router.use('/coins', require('./coins'));
router.use('/contact', require('./mail'));

// error handler
router.use((req, res, next) => {
  const err = new Error('Not found.');
  err.status = 404;
  next(err);
});

module.exports = router;
