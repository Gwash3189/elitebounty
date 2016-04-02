import React, { Component } from 'react';

import { update } from './../../helpers/state.js'

let timeoutId = null;

export default class ToastBar extends Component {

  clearToast() {
    update((state) => ({ ...state.toast, toast: [] }));
  }

  clearAfterTenSeconds() {
    timeoutId = setTimeout(this.clearToast, 10000)
  }

  render() {
    const  { toast } = this.props;
    
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    if (toast.length > 0) {
      this.clearAfterTenSeconds();
    }
    return (
      <div>
        {toast.map((toast, i) => {
          return (
            <div key={i} onClick={::this.clearToast} className={`toast toast-${toast.type}`}>
              {toast.text}
            </div>
          );
        })}
      </div>
    );
  }
}
