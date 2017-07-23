import reduxAPI from 'redux-api';
import axiosRequest from './axios';

export default reduxAPI({
  term: {
    url: 'employee/agree',
    options: {
      method: 'GET'
    }
  },
  agreeTerm: {
    url: 'employee/agree',
    options: {
      method: 'POST'
    }
  },
  registerUserInfo: {
    url: 'employee/confirm',
    options: {
      method: 'POST'
    }
  },
  userInfo: {
    url: 'employee',
    options: {
      method: 'GET'
    }
  }
}).use('fetch', axiosRequest).use('rootUrl', API_URL);
