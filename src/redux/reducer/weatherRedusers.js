import FETCH_TYPES from '../types';

const defaultState = {
  currentCountry: {
    "coord": {
      "lon": 13.52,
      "lat": -6.59
    },
    "weather": [
      {
        "id": 804,
        "main": "Clouds",
        "description": "overcast clouds",
        "icon": "04d"
      }
    ],
    "base": "stations",
    "main": {
      "temp": 298.82,
      "feels_like": 300.1,
      "temp_min": 298.82,
      "temp_max": 298.82,
      "pressure": 1014,
      "humidity": 59,
      "sea_level": 1014,
      "grnd_level": 977
    },
    "visibility": 10000,
    "wind": {
      "speed": 1.6,
      "deg": 240
    },
    "clouds": {
      "all": 99
    },
    "dt": 1598088329,
    "sys": {
      "country": "AO",
      "sunrise": 1598073058,
      "sunset": 1598116013
    },
    "timezone": 3600,
    "id": 2236355,
    "name": "Zaire Province",
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

    default: {
      return state;
    }
  }
};
