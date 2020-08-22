import { all, fork } from 'redux-saga/effects';
import getRequest from './getWeatherSaga';

export default function* rootSaga() {
  yield all([
    fork(getRequest),
  ]);
}
