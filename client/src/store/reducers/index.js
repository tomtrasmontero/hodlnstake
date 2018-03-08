import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import CoinReducer from './coins';
import NewsReducer from './news';
import AuthReducer from './auth';
import TransactionReducer from './transaction';

const rootReducer = combineReducers({
  coin: CoinReducer,
  news: NewsReducer,
  auth: AuthReducer,
  transaction: TransactionReducer,
  form: formReducer,
});

export default rootReducer;
