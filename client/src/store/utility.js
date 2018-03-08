export const updateObject = (oldObject, updatedProperties) => ({
  ...oldObject,
  ...updatedProperties,
});

export const transformToChartData = (histCoinDataArray) => {
  const barData = [];
  const areaData = [];

  histCoinDataArray.forEach((coinData) => {
    // transform epoch to millisecond
    const timeInMilli = coinData.time * 1000;
    barData.push([timeInMilli, coinData.volumeto]);
    areaData.push([timeInMilli, coinData.close]);
  });

  return [areaData, barData];
};

export const transformToSearchList = (coins) => {
  const searchListArray = coins.map(coin => ({
    key: coin.coinId,
    name: coin.cryptoCoinFullName,
    imageurl: coin.imageUrl,
    symbol: coin.symbol,
  }));

  return searchListArray;
};

export const transformToPieData = (arrData) => {
  const dataHolder = {};
  let transformedData = [];
  arrData.forEach((trx) => {
    let totalAmount = trx.coinAmount;
    if (trx.sellPrice) {
      totalAmount *= -1;
    }

    if (!dataHolder[trx.coinName]) {
      dataHolder[trx.coinName] = totalAmount;
    } else {
      dataHolder[trx.coinName] += totalAmount;
    }
  });

  transformedData = Object.entries(dataHolder);
  return transformedData;
};

export const numFormat = (number) => {
  let isNegative = '';
  let dec = '';
  let numToStr = number.toString().split('.');
  let formatNum = '';
  if (number < 0) {
    isNegative = '-';
    numToStr = number.toString().substr(1).split('.');
  }
  if (numToStr[1]) {
    dec = `.${numToStr[1].toString()}`;
  }

  const int = numToStr[0];

  for (let i = 0; i < int.length; i += 1) {
    let substring = int[int.length - i - 1];
    if ((i + 1) % 3 === 0 && i > 0 && i !== int.length - 1) {
      substring = `,${substring}`;
    }
    formatNum = substring + formatNum;
  }
  return [isNegative, formatNum, dec].join('');
};
