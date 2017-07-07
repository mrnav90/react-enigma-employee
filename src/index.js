import 'ladda/dist/ladda-themeless.min.css';
import 'styles/main.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import {Provider} from 'react-redux';
import {routes, store} from 'configs';
import {translationWithStore} from 'utils';
import 'ladda';

translationWithStore(store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={syncHistoryWithStore(browserHistory, store)} routes={routes} />
  </Provider>,
  document.getElementById('app')
);
