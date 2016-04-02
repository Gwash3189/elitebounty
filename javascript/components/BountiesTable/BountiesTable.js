import React from 'react';
import map from 'lodash/map';

import BountiesTableHeader from './BountiesTableHeader.js';
import BountiesTableHeaderItem from './BountiesTableHeaderItem.js';
import BountiesTableBodyItem from './BountiesTableBodyItem.js';
import BountiesTableBodyRow from './BountiesTableBodyRow.js';
import BountiesTableBody from './BountiesTableBody.js';

const BountyTableBody = ({ bountys }) => {
  const daterize = (date) => {
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    const newDate = new Date(date);
    return `${monthNames[newDate.getMonth()]} ${newDate.getDate()} ${newDate.getFullYear()}`
  }

  const casherize = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <div>
      <BountiesTableHeader>
        <BountiesTableHeaderItem size='large'>
          Issued At
        </BountiesTableHeaderItem>
        <BountiesTableHeaderItem size='large'>
          Bounty
        </BountiesTableHeaderItem>
        <BountiesTableHeaderItem size='small'>
          Taken
        </BountiesTableHeaderItem>
      </BountiesTableHeader>
      <BountiesTableBody>
        {
          map(bountys, bounty => {
            return (
              <BountiesTableBodyRow key={bounty.id}>
                <BountiesTableBodyItem size='large'>
                  {daterize(bounty.created_at)}
                </BountiesTableBodyItem>
                <BountiesTableBodyItem size='large'>
                  {casherize(bounty.credits)}
                </BountiesTableBodyItem>
                <BountiesTableBodyItem size='small'>
                  {
                    bounty.accepted
                    ? <span className="label label-danger">Yes</span>
                    : <span className="label label-success">No</span>
                  }
                </BountiesTableBodyItem>
              </BountiesTableBodyRow>
            );
          })
        }
      </BountiesTableBody>
    </div>
  );
}

export default BountyTableBody
