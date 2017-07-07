import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import translation from './translation';
import sidebar from './sidebar';

export default combineReducers({
  routing: routerReducer,
  i18n: translation,
  sidebar: sidebar
});
