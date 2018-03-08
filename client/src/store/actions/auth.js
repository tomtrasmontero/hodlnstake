import axios from 'axios';
import * as actionTypes from './actionTypes';
import { clearTransactions } from './index';

export const authStart = () => ({
  type: actionTypes.AUTH_START,
});

export const authSuccess = (authData, fromStorage) => {
  if (fromStorage) {
    return {
      type: actionTypes.AUTH_SUCCESS,
      payload: authData,
    };
  }

  // save data to localstorage if data is not there;
  localStorage.setItem('tokenId', authData.data.localId || authData.data.firebaseUID);

  return {
    type: actionTypes.AUTH_SUCCESS,
    payload: authData.data,
  };
};


export const authCheckState = () => {
  const authData = {};
  authData.localId = localStorage.getItem('tokenId');
  return (dispatch) => {
    if (authData.localId) {
      dispatch(authSuccess(authData, true));
    }
  };
};

export const authFail = error => ({
  type: actionTypes.AUTH_FAIL,
  payload: error,
});

export const clearItemsOnLogout = () => ({
  type: actionTypes.AUTH_LOGOUT,
});

export const authLogout = () => {
  // remove tokenId
  localStorage.removeItem('tokenId');

  return (dispatch) => {
    dispatch(clearItemsOnLogout());
    dispatch(clearTransactions());
  };
};

export const authLogin = (values) => {
  const url = '/api/auth/login';

  return async (dispatch) => {
    dispatch(authStart());

    await axios.post(url, { values })
      .then(result => dispatch(authSuccess(result)))
      .catch(err => dispatch(authFail(err.response.data)));
  };
};

// redux form handleing errors
export const auth = (values) => {
  const url = '/api/auth/signup';

  return async (dispatch) => {
    dispatch(authStart());

    await axios.post(url, { values })
      .then(result => dispatch(authSuccess(result)))
      .catch(err => dispatch(authFail(err.response.data)));
  };
};
