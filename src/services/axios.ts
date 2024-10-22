import axios from 'axios';

const baseURL = 'http://localhost:3000/';

const apiInstance = axios.create({
  baseURL: baseURL,
});

export default apiInstance;
