import React, { Component } from 'react';
import { State } from './../../helpers/state.js'
import Toast from './Toast';

const map = ({ toast }) => {
  return { toast }
}

export default class ToastBar extends Component {

  render() {
    return (
      <div className='toast-bar'>
        <State map={map} {...this.props}>
            <Toast />
        </State>
      </div>
    );
  }
}
