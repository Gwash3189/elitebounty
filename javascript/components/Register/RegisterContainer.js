import React, { Component } from 'react';
import Register from './Register';
import { State } from './../../helpers/state.js'

const map = ({user, api}) => {
  return { user, api};
}

export default class RegisterContainer extends Component {

  render() {
    return (
      <State map={map}>
        <Register />
      </State>
    );
  }
}
