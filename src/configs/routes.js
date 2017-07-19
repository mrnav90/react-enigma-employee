import React from 'react';
import {Route} from 'react-router';
import {Application, Login, NotFound, RequestPasswordEmail, RequestPasswordPhone, RequestPasswordSuccess} from 'containers';

export default (
  <Route path="/" component={Application}>
    <Route path="sign-in" component={Login} />
    <Route path="request-password-via-email" component={RequestPasswordEmail} />
    <Route path="request-password-via-phone" component={RequestPasswordPhone} />
    <Route path="request-password-success" component={RequestPasswordSuccess} />
    <Route path="*" component={NotFound} />
  </Route>
);
