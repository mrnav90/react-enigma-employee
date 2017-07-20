import React from 'react';
import {Route} from 'react-router';
import {Application, Login, NotFound, RequestPasswordEmail, RequestPasswordPhone, RequestPasswordSuccess} from 'containers';

export default (
  <Route path="/" component={Application}>
    <Route path="sign-in" component={Login} />
    <Route path="reset-password/email" component={RequestPasswordEmail} />
    <Route path="reset-password/phone" component={RequestPasswordPhone} />
    <Route path="reset-password/success" component={RequestPasswordSuccess} />
    <Route path="*" component={NotFound} />
  </Route>
);
