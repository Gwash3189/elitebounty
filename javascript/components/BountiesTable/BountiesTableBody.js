import React from 'react';
import map from 'lodash/map';

import BountiesTableHeaderItem from './BountiesTableHeaderItem';

const BountyTableBody = ({ children }) => {
  return (
    <div className="row bounty-table-body">
      {children}
    </div>
  )
}

export default BountyTableBody
