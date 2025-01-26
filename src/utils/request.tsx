import axios from 'axios';
import { api } from './core-api';

const baseUrl = `${process.env.EXPO_PUBLIC_API_URL}`;

const request = axios.create({
  baseURL: baseUrl, // TODO: take this api URL from env
  timeout: 30000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// Change request data/error here
request.interceptors.request.use((config) => {
  // const token = getToken();
  // config.headers = {
  //   ...config.headers,
  //   Authorization: `Bearer ${token ? token : ''}`,
  // };
  // console.log('Starting Request', JSON.stringify(config));
  return config;
});

request.interceptors.response.use(
  (response) => {
    // console.log('response', response.headers);
    return response;
  },
  (error) => {
    // Check if the error status code is 401 (Unauthorized)
    if (error.response && error.response.status === 429) {
      api.changeKey();
      return request(error.config);
    }

    return Promise.reject(error);
  }
);

export default request;
