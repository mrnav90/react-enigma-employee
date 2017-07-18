import React from 'react';
import {Route, IndexRoute} from 'react-router';
import {Application, Login, NotFound, RequestPasswordEmail, RequestPasswordPhone} from 'containers';

export default (
  <Route path="/" component={Application}>
    <IndexRoute component={Login} />
    <Route path="request-password-via-email" component={RequestPasswordEmail} />
    <Route path="request-password-via-phone" component={RequestPasswordPhone} />
    <Route path="*" component={NotFound} />
  </Route>
);
