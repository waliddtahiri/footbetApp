import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import betReducer from './betReducer';


export const rootReducer = combineReducers({
  error: errorReducer,
  auth: authReducer,
  bet: betReducer
})