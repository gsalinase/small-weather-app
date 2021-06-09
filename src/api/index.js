import axios from 'axios';

export default {
  forecastData(url) {
    const promise = axios.get(url);
    const dataPromise = promise.then((response) => response.data)
    return dataPromise
  },
};
