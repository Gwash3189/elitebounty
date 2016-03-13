import React, { Component } from 'react';
import map from 'lodash/map';

import AppHeader from './AppHeader.js';
import BountiesTable from './BountiesTable/BountiesTable.js';
import { bounty } from './../helpers/bounty';
import { toHash, toObject, setState } from './../helpers/functional.js';

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      bountys: {}
    };

    this.getBounties();
  }

  getBounties() {
    bounty.all()
      .then(toHash)
      .then(toObject('bountys'))
      .then(setState(this));
  }

  render() {
    return (
      <div className='container-fluid'>
        <AppHeader/>
        <BountiesTable bountys={this.state.bountys}/>
      </div>
    );
  }
}
