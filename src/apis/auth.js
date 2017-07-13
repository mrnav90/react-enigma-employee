import reduxAPI from 'redux-api';
import axiosRequest from './axios';

export default reduxAPI({
  login: {
    url: 'authenticate',
    options: {
      method: 'POST'
    }
  },
  logout: {
    url: 'logout',
    options: {
      method: 'GET'
    }
  }
}).use('fetch', axiosRequest).use('rootUrl', API_URL);
