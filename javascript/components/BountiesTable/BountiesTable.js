import React from 'react';
import map from 'lodash/map';

import BountiesTableHeader from './BountiesTableHeader.js';
import BountiesTableHeaderItem from './BountiesTableHeaderItem.js';
import BountiesTableBodyItem from './BountiesTableBodyItem.js';
import BountiesTableBodyRow from './BountiesTableBodyRow.js';
import BountiesTableBody from './BountiesTableBody.js';

const BountyTableBody = ({ bountys }) => {
  return (
    <div>
      <BountiesTableHeader>
        <BountiesTableHeaderItem size='large'>
          Issuer
        </BountiesTableHeaderItem>
        <BountiesTableHeaderItem size='large'>
          Target
        </BountiesTableHeaderItem>
        <BountiesTableHeaderItem size='large'>
          Taken By
        </BountiesTableHeaderItem>
        <BountiesTableHeaderItem size='med'>
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
                  {bounty.payer}
                </BountiesTableBodyItem>
                <BountiesTableBodyItem size='large'>
                  {bounty.target}
                </BountiesTableBodyItem>
                <BountiesTableBodyItem size='large'>
                  {bounty.accepted_by}
                </BountiesTableBodyItem>
                <BountiesTableBodyItem size='med'>
                  {bounty.credits}
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
