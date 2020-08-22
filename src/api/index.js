import apiCaller from '../utils/apiCaller';

export const weatherGet = async (country) => {
  return apiCaller(country);
};

