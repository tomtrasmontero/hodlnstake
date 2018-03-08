const { expect } = require('chai');
const client = require('supertest');
const db = require('../db');
const app = require('../server');

// helper methods
const createUser = (name, id, email = null) => {
  const userData = client(app)
    .post('/api/user/create')
    .send({
      name,
      firebaseUID: id,
      email,
    })
    .catch(err => console.log(err));

  return userData;
};

const createTransaction = (data, buyPrice = 0) => {
  const transactionData = client(app)
    .post('/api/transactions/create')
    .send({
      coinName: data.coinName,
      coinAmount: data.coinAmount,
      buyPrice,
      userId: data.userId,
      coinId: data.coinId,
    })
    .catch(err => console.log(err));

  return transactionData;
};

const createCoin = (coin) => {
  const coinData = {
    coinName: coin,
    symbol: coin,
    cryptoCoinFullName: coin,
  };

  return db.models.Coins.create(coinData);
};

// start test here
describe('routes', () => {
  before((done) => {
    db.sync()
      .then(() => done())
      .catch(done);
  });


  describe('User Table', () => {
    it('creates a user', (done) => {
      const name = 'foo';
      const id = '123456';
      const email = 'bar@test.com';

      createUser(name, id, email)
        .then((result) => {
          expect(result.status).to.equal(200);
          expect(result.body.name).to.equal('foo');
          expect(result.body.firebaseUID).to.equal('123456');
          expect(result.body.email).to.equal('bar@test.com');
          done();
        });
    });

    it('able to fetch user by id', (done) => {
      client(app).get('/api/user/1')
        .then((result) => {
          expect(result.status).to.equal(200);
          expect(result.body.length).to.equal(1);
          expect(result.body[0].name).to.equal('foo');
          expect(result.body[0].firebaseUID).to.equal('123456');
          expect(result.body[0].email).to.equal('bar@test.com');
          done();
        })
        .catch(done);
    });
  });

  describe('Transaction Table', () => {
    before((done) => {
      createCoin('ETH')
        .then(() => done())
        .catch(done);
    });

    it('creates a transaction', (done) => {
      const buy = 10000;
      const transactionData = {
        coinName: 'ETH',
        coinAmount: 2,
        coinId: 1,
        userId: 1,
      };

      createTransaction(transactionData, buy)
        .then((result) => {
          expect(result.status).to.equal(200);
          expect(result.body.coinName).to.equal('ETH');
          expect(result.body.buyPrice).to.equal(10000);
          done();
        })
        .catch(done);
    });
  });
});
