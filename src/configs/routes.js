import React from 'react';
import {Route} from 'react-router';
import {ensureAuth, redirectLoginStatus} from 'utils';
import {
  Application,
  LoginPage,
  Dashboard,
  PageNotFound,
  RequestPasswordEmail,
  RequestPasswordPhone,
  RequestPasswordSuccess,
  TermService,
  RegisterUserInfo,
  RegisterSuccess
} from 'containers';

export default (
  <Route component={Application}>
    <Route path="/" component={Dashboard} onEnter={ensureAuth} />
    <Route path="sign-in" component={LoginPage} onEnter={redirectLoginStatus} />
    <Route path="term-service" component={TermService} />
    <Route path="register-user-info" component={RegisterUserInfo} />
    <Route path="register-success" component={RegisterSuccess} />
    <Route path="reset-password/email" component={RequestPasswordEmail} />
    <Route path="reset-password/phone" component={RequestPasswordPhone} />
    <Route path="reset-password/success" component={RequestPasswordSuccess} />
    <Route path="*" component={PageNotFound} />
  </Route>
);
