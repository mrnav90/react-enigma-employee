import reduxAPI from 'redux-api';
import axiosRequest from './axios';

export default reduxAPI({
  email: {
    url: 'password/email',
    options: {
      method: 'POST'
    }
  },
  phone: {
    url: 'password/forgot',
    options: {
      method: 'POST'
    }
  }
}).use('fetch', axiosRequest).use('rootUrl', API_URL);
