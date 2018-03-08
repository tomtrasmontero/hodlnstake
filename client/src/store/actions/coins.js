import axios from 'axios';
import * as actionTypes from './actionTypes';
import * as utilityFunc from '../utility';

export const getTopCoins = (numCoinLookup = 15) => {
  const url = `https://api.coinmarketcap.com/v1/ticker/?limit=${numCoinLookup}`;
  return async (dispatch) => {
    const request = await axios.get(url);

    dispatch({
      type: actionTypes.GET_TOP_COINS,
      payload: request,
    });
  };
};

export const getCoinList = () => {
  const url = '/api/coins';

  return async (dispatch) => {
    const request = await axios.get(url);
    const transformedData = utilityFunc.transformToSearchList(request.data);

    dispatch({
      type: actionTypes.GET_COIN_LIST,
      payload: transformedData,
    });
  };
};

export const getCoinSnapShot = (symbol) => {
  let symbolIsActive = symbol;
  if (symbol === 'MIOTA') { symbolIsActive = 'IOT'; }
  if (symbol === 'NANO') { symbolIsActive = 'XRB'; }
  const url = `https://min-api.cryptocompare.com/data/generateAvg?fsym=${symbolIsActive}&tsym=USD&e=CCCAGG`;

  return async (dispatch) => {
    const request = await axios.get(url);
    // pass symbol to identify which the summary belongs to
    request.data.DISPLAY.symbol = symbol;

    dispatch({
      type: actionTypes.GET_COIN_CURR_SUMMARY,
      payload: request,
    });
  };
};

export const getCryptoCoinDetail = (symbol) => {
  let symbolIsActive = symbol;
  if (symbol === 'MIOTA') { symbolIsActive = 'IOT'; }
  if (symbol === 'NANO') { symbolIsActive = 'XRB'; }
  const url = `/api/coins/detail/${symbolIsActive}`;
  const chartUrl = `https://min-api.cryptocompare.com/data/histoday?fsym=${symbolIsActive}&tsym=USD&aggregate=1&e=CCCAGG&allData=1`;

  return async (dispatch) => {
    const request = await axios.get(url);
    const chartRequest = await axios.get(chartUrl);
    const chartData = await utilityFunc.transformToChartData(chartRequest.data.Data);

    dispatch({
      type: actionTypes.GET_COIN_DETAIL,
      payload: request,
      chartPayload: chartData,
    });
  };
};

export const getGlobalMarketData = () => {
  const url = 'https://api.coinmarketcap.com/v1/global/';

  return async (dispatch) => {
    const request = await axios.get(url);

    dispatch({
      type: actionTypes.GET_GLOBAL_MARKET_DATA,
      payload: request,
    });
  };
};

export const clearCoinSummary = () => ({
  type: actionTypes.CLEAR_COIN_SUMMARY,
});

export const clearCoinDetail = () => ({
  type: actionTypes.CLEAR_COIN_DETAIL,
});

export const getMarketValues = (transactionData) => {
  const dataHolder = {};
  transactionData.forEach((coin) => {
    let symbolIsActive = coin.coinName;
    if (coin.coinName === 'MIOTA') { symbolIsActive = 'IOT'; }
    if (coin.coinName === 'NANO') { symbolIsActive = 'XRB'; }
    if (!dataHolder[symbolIsActive]) {
      dataHolder[symbolIsActive] = symbolIsActive;
    }
  });
  const symbolCollection = Object.keys(dataHolder);
  const symbols = symbolCollection.join(',');
  const url = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${symbols}&tsyms=USD`;

  return async (dispatch) => {
    const request = await axios.get(url);
    dispatch({
      type: actionTypes.GET_MARKET_VALUE,
      payload: request,
    });
  };
};
