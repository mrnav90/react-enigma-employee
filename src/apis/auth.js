import reduxAPI from 'redux-api';
import axiosRequest from './axios';

const auth = reduxAPI({
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

export default auth;
