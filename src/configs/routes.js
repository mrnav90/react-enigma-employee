import React from 'react';
import {Route, IndexRoute} from 'react-router';
import {Application, Login, NotFound} from 'containers';

export default (
  <Route path="/" component={Application}>
    <IndexRoute component={Login} />
    <Route path='*' component={NotFound} />
  </Route>
);
