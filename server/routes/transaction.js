const router = require('express').Router();
const db = require('../db').models;
const utility = require('../utility/utility');

router.get('/:firebaseUID', (req, res, next) => {
  Promise.all([utility.getUserId(req.params.firebaseUID)])
    .then((result) => {
      db.UserTransactions.findAll({
        where: { userId: result[0].id },
        include: [{
          model: db.Coins,
        }],
      })
        .then(transactions => res.send(transactions))
        .catch(next);
    })
    .catch(next);
});

// create transaction
router.post('/create', (req, res, next) => {
  console.log('backend', req.body.coinAmount);
  const dateEST = new Date(`${req.body.date}T${req.body.time}:00`);
  const transactionDate = dateEST.toLocaleString('en-US', { timeZone: 'America/New_York' });
  Promise.all([
    utility.getCryptoCompareId(req.body.coinName),
    utility.getUserId(req.body.firebaseUID),
  ])
    .then((data) => {
      // save transaction to the database
      const [coinData, userData] = data;
      const saveTrx = db.UserTransactions.create({
        coinName: coinData.symbol,
        coinAmount: req.body.coinAmount,
        buyPrice: req.body.buyPrice,
        sellPrice: req.body.sellPrice,
        userId: userData.id,
        coinId: coinData.id,
        transactionDate,
      });

      return saveTrx
        .then((result) => {
          // return the full list of the transaction
          db.UserTransactions.findAll({
            where: { userId: result.userId },
            include: [{
              model: db.Coins,
            }],
          })
            .then(transactions => res.send(transactions))
            .catch((err) => {
              res.send(err);
              next();
            });
        })
        .catch((err) => {
          res.send(err);
          next();
        });
    })
    .catch((err) => {
      res.send(err);
      next();
    });
});


// delete transaction
router.delete('/:id', (req, res, next) => {
  const findUserId = db.UserTransactions.findOne({
    where: { id: req.params.id }, raw: true,
  });
  const destroyTrx = db.UserTransactions.destroy({
    where: {
      id: req.params.id,
    },
  });

  findUserId.then(result => Promise.all([result, destroyTrx]))
    .then((result) => {
      db.UserTransactions.findAll({
        where: { userId: result[0].userId },
        include: [{
          model: db.Coins,
        }],
      })
        .then(transactions => res.send(transactions))
        .catch(next);
    })
    .catch(next);
});


module.exports = router;
