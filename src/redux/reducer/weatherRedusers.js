import FETCH_TYPES from '../types';

const defaultState = {
  currentCountry: {
    "coord": {
      "lon": -122.09,
      "lat": 37.39
    },
    "weather": [
      {
        "id": 500,
        "main": "Rain",
        "description": "light rain",
        "icon": "10d"
      }
    ],
    "base": "stations",
    "main": {
      "temp": 280.44,
      "pressure": 1017,
      "humidity": 61,
      "temp_min": 279.15,
      "temp_max": 281.15
    },
    "visibility": 12874,
    "wind": {
      "speed": 8.2,
      "deg": 340,
      "gust": 11.3
    },
    "clouds": {
      "all": 1
    },
    "dt": 1519061700,
    "sys": {
      "type": 1,
      "id": 392,
      "message": 0.0027,
      "country": "US",
      "sunrise": 1519051894,
      "sunset": 1519091585
    },
    "id": 0,
    "name": "Ukraine",
    "cod": 200
  },
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
