import React, { Component } from 'react';

import AppHeader from './AppHeader.js';
import BountiesTable from './BountiesTable/BountiesTable.js';
import ToastBar from './Toasts/ToastBar';
import { bounty, isLoggedIn } from './../helpers/api';
import { toHash, toObject, setState } from './../helpers/functional.js';
import { getState, update, State } from './../helpers/state.js';

const map = ({ bountys }) => {
  return { bountys };
}

export default class App extends Component {

  constructor(props) {
    super(props);

    this.getBounties();
  }

  getBounties() {
    bounty.all()
      .then(toHash)
      .then(toObject('bountys'))
      .then(({ bountys }) => {
        update((state) => ({ bountys: { ...state.bountys, ...bountys}}))
      });
  }

  render() {
    const { bountys } = getState()
    return (
      <div>
        <ToastBar />
        <div className='container-fluid'>
          <AppHeader/>
          <State map={map} {...this.props}>
            <BountiesTable bountys={bountys}/>
          </State>
        </div>
      </div>
    );
  }
}
