import React from 'react';

//import styling
import { Typography, Tooltip } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';

const LimitGuest = ({ capacity }) => {
  return (
    <Tooltip title="Capacity">
      <Typography variant="subtitle1">
        {capacity}
        <PersonIcon
          fontSize="medium"
          style={{ position: 'relative', top: '4px', left: '2px' }}
        />
      </Typography>
    </Tooltip>
  );
};

export default LimitGuest;
