import { combineReducers } from 'redux';
import getWeather from './weatherRedusers';

export default combineReducers({
  getWeather,
});
