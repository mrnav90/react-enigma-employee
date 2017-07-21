import reduxAPI from 'redux-api';
import axiosRequest from './axios';
import {setUserInfo, setAccessToken, setCSRFToken} from 'utils';

export default reduxAPI({
  login: {
    url: 'authenticate',
    validation: (response, callback) => {
      if (response && response.data) {
        setUserInfo(response.data.user_info);
        setAccessToken(response.data.token);
        setCSRFToken(response.data.csrf_token);
      }
      callback();
    },
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
