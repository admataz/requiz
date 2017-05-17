import { combineReducers } from 'redux';
// import questions from './questions';
import quiz from './quiz';
import appState from './appState';
import userData from './userData';
import config from './config';

export default combineReducers({
  appState: appState,
  userData: userData,
  content: quiz,
  config: config

});
