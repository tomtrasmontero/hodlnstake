import axios from 'axios';
import * as actionTypes from './actionTypes';
import { transformToPieData } from '../utility';

export const addTransaction = (data) => {
  const url = '/api/transactions/create';
  return async (dispatch) => {
    try {
      const request = await axios.post(url, data);
      const pieData = transformToPieData(request.data);

      dispatch({
        type: actionTypes.GET_TRANSACTIONS,
        payload: request,
        pieData,
      });
    } catch (err) {
      const error = 'Unable to Process Transaction.  Discontinued/No Info on Crypto';
      dispatch({
        type: actionTypes.FAILED_TRANSACTION,
        payload: error,
      });
    }
  };
};

export const getTransactions = (firebaseUID) => {
  const url = `/api/transactions/${firebaseUID}`;
  return async (dispatch) => {
    const request = await axios.get(url);
    const pieData = transformToPieData(request.data);
    dispatch({
      type: actionTypes.GET_TRANSACTIONS,
      payload: request,
      pieData,
    });
  };
};

export const deleteTransaction = (transactionId) => {
  const url = `/api/transactions/${transactionId}`;
  return async (dispatch) => {
    try {
      // use config data for axios to pass "request body" as config.data
      const request = await axios.delete(url);
      const pieData = transformToPieData(request.data);
      dispatch({
        type: actionTypes.GET_TRANSACTIONS,
        payload: request,
        pieData,
      });
    } catch (err) {
      const error = 'Unable to Process Transaction.';
      dispatch({
        type: actionTypes.FAILED_TRANSACTION,
        payload: error,
      });
    }
  };
};

export const clearTransactions = () => ({
  type: actionTypes.CLEAR_TRANSACTION,
});

export default getTransactions;
