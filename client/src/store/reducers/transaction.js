import * as actionTypes from '../actions/actionTypes';

const initialState = {
  transactions: [],
  error: '',
  pieData: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_TRANSACTIONS:
      return {
        ...state,
        transactions: [...action.payload.data],
        pieData: [...action.pieData],
        error: '',
      };

    case actionTypes.CLEAR_TRANSACTION:
      return {
        ...state,
        transactions: [],
        error: {},
        pieData: [],
      };

    case actionTypes.FAILED_TRANSACTION:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
