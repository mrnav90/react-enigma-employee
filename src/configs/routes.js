import React from 'react';
import {Route, IndexRoute} from 'react-router';
import {Application, SignIn, NotFound} from 'containers';

export default (
  <Route path="/" component={Application}>
    <IndexRoute component={SignIn} />
    <Route path='*' component={NotFound} />
  </Route>
);
