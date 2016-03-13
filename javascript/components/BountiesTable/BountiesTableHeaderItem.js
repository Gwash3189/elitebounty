import React from 'react';
import join from 'lodash/join';

const BountyTableHeaderItem = ({ size, className, children }) => {
  const classes = size === "large"
    ? 'col-xs-3'
    : size === 'med'
      ? 'col-xs-2'
      : 'col-xs-1';

  return (
      <div className={join([classes, 'bounty-heading'], ' ')}>
        {children}
      </div>
  );
}

export default BountyTableHeaderItem
