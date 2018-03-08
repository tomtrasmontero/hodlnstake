const coinList = require('./file.json');
const cmcList = require('./coinmarketcap.json');
const db = require('../server/db');
// *** add data and save it to database -  sample Data below
/*
"LTC": {
"Id": "3808",
"Url": "/coins/ltc/overview",
"ImageUrl": "/media/19782/litecoin-logo.png",
"Name": "LTC",
"Symbol": "LTC",
"CoinName": "Litecoin",
"FullName": "Litecoin (LTC)",
"Algorithm": "Scrypt",
"ProofType": "PoW",
"FullyPremined": "0",
"TotalCoinSupply": "84000000",
"PreMinedValue": "N/A",
"TotalCoinsFreeFloat": "N/A",
"SortOrder": "3",
"Sponsored": false
*/

const cmcImgUrls = {};
cmcList.forEach((coin) => {
  cmcImgUrls[coin.symbol] = `https://files.coinmarketcap.com/static/img/coins/64x64/${coin.id}.png`;
});
// https://files.coinmarketcap.com/static/img/coins/64x64/bitcoin.png
// baseUrl for image and link to cryptocompare. relevant data
const baseUrl = coinList.BaseImageUrl;
const cryptoCoinNameArray = Object.keys(coinList.Data);
const cryptoCoinImageUrls = {};
const cryptoCoinFullName = {};
const cryptoCoinSymbol = {};
const cryptoCoinId = {};

// load to database fn. coin@string
const createCoinEntry = (coin) => {
  const coinData = {
    coinName: coin || 'N/A',
    coinId: cryptoCoinId[coin] || 'N/A',
    symbol: cryptoCoinSymbol[coin] || 'N/A',
    cryptoCoinFullName: cryptoCoinFullName[coin] || 'N/A',
    imageUrl: cmcImgUrls[coin] || cryptoCoinImageUrls[coin] || 'N/A',
  };

  return coinData;
};

const updateCoinDB = () => {
  cryptoCoinNameArray.forEach((coin) => {
    // update crypto data
    cryptoCoinImageUrls[coin] = `${baseUrl}${coinList.Data[coin].ImageUrl}`;
    cryptoCoinFullName[coin] = coinList.Data[coin].FullName;
    cryptoCoinSymbol[coin] = coinList.Data[coin].Symbol;
    cryptoCoinId[coin] = coinList.Data[coin].Id;

    // create entry in database
    db.models.Coins.create(createCoinEntry(coin));
  });
};

if (process.env.SYNCPROD) {
  Promise.resolve(updateCoinDB())
    .then(() => console.log('coins have been updated'));
}

module.exports = updateCoinDB;
