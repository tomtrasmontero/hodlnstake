import axios from 'axios';
import * as actionTypes from './actionTypes';

export const getTopHeadlines = () => {
  const url = '/api/news/topHeadlines';

  return async (dispatch) => {
    const request = await axios.get(url);

    dispatch({
      type: actionTypes.GET_CURRENT_NEWS,
      payload: request,
    });
  };
};

export default getTopHeadlines;
