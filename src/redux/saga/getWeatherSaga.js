import { takeEvery, put, call } from 'redux-saga/effects';
import FETCH_TYPES from '../types';

import { weatherGet } from '../../api/index';

function* getWeatherSaga(country) {

  try {
    const res = yield call(() => weatherGet(country.data));
debugger
    yield put({
      type: FETCH_TYPES.GET_SUCCESS,
      data: res,
    });
  } catch (e) {
    debugger
    yield put({
      type: FETCH_TYPES.GET_FAIL,
      data: e.message,
    });
  }
}

export default function* getRequest() {
  yield takeEvery(FETCH_TYPES.GET_REQUEST, getWeatherSaga);
}
