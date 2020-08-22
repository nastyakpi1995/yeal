import FETCH_TYPES from './types';

export const requestGetWeather = (data) => ({
  type: FETCH_TYPES.GET_REQUEST,
  data,
});

export const successGetWeather = (data) => ({
  type: FETCH_TYPES.GET_SUCCESS,
  data,
});

export const errorGetWeather = (data) => ({
  type: FETCH_TYPES.GET_FAIL,
  data,
});


export const setCurrentlyCountry = () => ({
  type: FETCH_TYPES.SET_CURRENT_COUNTRY,
});

