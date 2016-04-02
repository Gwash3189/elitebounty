import React from 'react';
import join from 'lodash/join';

const BountyTableBodyItem = ({ size, children }) => {
  const classes = size === "large"
    ? 'col-xs-5'
    : size === 'med'
      ? 'col-xs-2'
      : 'col-xs-1';

  return (
      <div className={join([classes, 'bounty-data'], ' ')}>
        {children}
      </div>
  );
}

export default BountyTableBodyItem
