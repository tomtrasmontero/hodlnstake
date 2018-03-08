const Sequelize = require('sequelize');

const db = new Sequelize(process.env.DATABASE_URL ||
   'postgres://localhost/cryptoDB', {
  logging: false,
  // fix deprecation warning for query string
  operatorsAliases: Sequelize.Op,
});

const Users = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  firebaseUID: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

// store all coins detail here
const Coins = db.define('coin', {
  coinName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  symbol: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  coinId: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  cryptoCoinFullName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

// user coin holdings saved @ per transaction
// name -> id
const UserTransactions = db.define('transactions', {
  coinName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  coinAmount: {
    type: Sequelize.REAL,
    allowNull: false,
  },
  buyPrice: {
    type: Sequelize.REAL,
    allowNull: true,
  },
  sellPrice: {
    type: Sequelize.REAL,
    allowNull: true,
  },
  transactionDate: {
    type: Sequelize.DATE,
    allowNull: true,
  },
});

// DB association
UserTransactions.belongsTo(Users);
UserTransactions.belongsTo(Coins);
Users.hasMany(UserTransactions);
Coins.hasMany(UserTransactions);

// sync db
const sync = () => {
  // change for testing purposes
  let prodCheck = false;
  if (process.env.SYNCPROD) {
    prodCheck = false;
  }
  const syncDatabase = db.sync({ force: prodCheck });
  return syncDatabase;
};

module.exports = {
  models: {
    Users,
    Coins,
    UserTransactions,
  },
  sync,
};
