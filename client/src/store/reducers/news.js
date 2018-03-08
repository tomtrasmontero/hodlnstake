import * as actionTypes from '../actions/actionTypes';

const initialState = {
  topTenNews: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_CURRENT_NEWS:
      return {
        ...state,
        topTenNews: [...action.payload.data.articles],
      };

    default:
      return state;
  }
};

export default reducer;
