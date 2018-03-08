const db = require('./db').models;

const createUser = (num) => {
  const userData = {
    name: `blog foo ${num}`,
    firebaseUID: `1234567${num}`,
    email: `test${num}@test.com`,
  };

  return userData;
};

const createTransaction = (coin, coinAmount, price) => {
  const trxData = {
    firebaseUID: 12345672,
    coinName: coin,
    coinAmount,
    buyPrice: price,
    imageUrl: 'https://www.cryptocompare.com/media/19633/btc.png',
  };

  return trxData;
};

const seed = () => {
  const user1 = db.Users.create(createUser(2));
  const user2 = db.Users.create(createUser(1));
  const trx1 = db.UserTransactions.create(createTransaction('BTC', 5, 10000));
  const trx2 = db.UserTransactions.create(createTransaction('BTC', 1, 5000));

  return Promise.all([
    user1,
    user2,
    trx1,
    trx2,
  ])
    .catch(err => console.log(err));
};

module.exports = {
  seed,
};
