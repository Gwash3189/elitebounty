import React, { Component } from 'react';
import Login from './Login';
import { State } from './../../helpers/state.js'

const map = ({user, api}) => {
  return { user, api};
}

export default class LoginContainer extends Component {

  render() {
    return (
      <State map={map} {...this.props}>
        <Login />
      </State>
    );
  }
}
