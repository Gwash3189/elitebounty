import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';

import App from './components/App';
import LoginContainer from './components/Login/LoginContainer';
import RegisterContainer from './components/Register/RegisterContainer';
import * as styles from './styles/index.js';
import { middleware, getState, seed } from './helpers/state';
import { isDevelopment } from './helpers/functional';
import localStorage, { keys } from './services/localStorage';
import { X_ELITEBOUNTY_AUTHENTICATION_HEADER } from './helpers/constants';


const applicationStorage = localStorage(keys.application);

const isUserLoggedIn = (state, redirect) => {
  const { user: { isLoggedIn }} = getState();
  return isLoggedIn || redirect('/');
}

// isDevelopment(() => middleware((state, meta) => console.log(`
// ${new Date()},
// State: ${JSON.stringify(state, null, 2)},
// Meta: ${JSON.stringify(meta, null, 2)}
// `)));

middleware((state) => applicationStorage.value = state.api.headers)

seed((state) => {
  const seedState = {
   api: {
      ...state.api,
      headers: applicationStorage.value
    }
  };

 if (seedState.api.headers && seedState.api.headers[X_ELITEBOUNTY_AUTHENTICATION_HEADER] && seedState.api.headers.authentication) {
   seedState.user = {
     ...state.user,
     isLoggedIn: true
   };
 }

 return seedState
});

const routes = (
  <Router history={hashHistory}>
    <Route path='/'>
      <IndexRoute component={LoginContainer} />
      <Route path='register' component={RegisterContainer}>
      </Route>
    </Route>
    <Route onChange={isUserLoggedIn} onEnter={isUserLoggedIn} path='/app'>
      <IndexRoute component={App}/>
    </Route>
  </Router>
);

ReactDOM.render(routes, document.getElementById('app'))
