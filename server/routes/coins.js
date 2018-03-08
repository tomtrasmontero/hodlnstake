const router = require('express').Router();
const axios = require('axios');
const db = require('../db').models;
const utility = require('../utility/utility');

router.get('/', (req, res, next) => {
  db.Coins.findAll({})
    .then(coinList => res.send(coinList))
    .catch(next);
});

router.get('/detail/:coinSymbol', (req, res, next) => {
  let symbolIsActive = req.params.coinSymbol;
  if (symbolIsActive === 'MIOTA') { symbolIsActive = 'IOTA'; }
  if (symbolIsActive === 'NANO') { symbolIsActive = 'XRB'; }
  utility.getCryptoCompareId(symbolIsActive)
    .then((data) => {
      const url = `https://www.cryptocompare.com/api/data/coinsnapshotfullbyid/?id=${data.coinId}`;

      axios.get(url)
        .then(coinDetail => res.send(coinDetail.data))
        .catch(next);
    })
    .catch(next);
});

module.exports = router;
