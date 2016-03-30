import React, { Component } from 'react';
import { State } from './../../helpers/state.js'
import Toast from './Toast';

const map = ({toast}) => {
  return { toast }
}

export default class LoginContainer extends Component {

  render() {
    return (
      <State map={map} {...this.props}>
        <div className='toast-bar'>
          <Toast />
        </div>
      </State>
    );
  }
}
