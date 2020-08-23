import FETCH_TYPES from '../types';

const defaultState = {
  currentCountry: null,
  weatherLoading: false,
  weatherErrors: null,
  chosenPart: ''
};

// -------- Reducer --------

export default (state = defaultState, action) => {

  switch (action.type) {
    case FETCH_TYPES.GET_REQUEST: {
      return {
        ...state,
        weatherLoading: true,
      };
    }

    case FETCH_TYPES.GET_SUCCESS: {

      return {
        ...state,
        weatherLoading: false,
        currentCountry: action.data,
        weatherErrors: null,
      };
    }

    case FETCH_TYPES.GET_FAIL: {
      return {
        ...state,
        weatherErrors: action.data,
        weatherLoading: false,
      };
    }

    case FETCH_TYPES.SET_CURRENT_COUNTRY: {

      return {
        ...state,
        weatherLoading: false,
        currentCountry: null,
        weatherErrors: null,
      };
    }

    default: {
      return state;
    }
  }
};
