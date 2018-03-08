const db = require('../db').models;

const getCryptoCompareId = (symbol) => {
  const id = db.Coins.findAll({ where: { symbol }, raw: true })
    .then(result => result[0])
    .catch(err => console.log(err));

  return id;
};

const getUserId = (firebaseUID) => {
  const userId = db.Users.findAll({ where: { firebaseUID }, raw: true })
    .then(result => result[0])
    .catch(err => console.log(err));

  return userId;
};

module.exports = {
  getCryptoCompareId,
  getUserId,
};
