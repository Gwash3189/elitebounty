import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import App from './components/App';
import * as styles from './styles/index.js';

const routes = (
  <Router history={browserHistory}>
    <Route path='/' component={App}>
    </Route>
  </Router>
);

ReactDOM.render(routes, document.getElementById('app'))
