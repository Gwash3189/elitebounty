import React, { Component } from 'react';
import Login from './Login';
import ToastBar from './../Toasts/ToastBar';
import { State } from './../../helpers/state.js'

const map = ({user, api}) => {
  return { user, api};
}

export default class LoginContainer extends Component {

  render() {
    return (
      <div>
        <ToastBar />
        <State map={map} {...this.props}>
          <Login />
        </State>
      </div>
    );
  }
}
