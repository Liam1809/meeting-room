import React, { useState } from 'react';

//import styling
import { Button, Tooltip } from '@material-ui/core';
import VideocamIcon from '@material-ui/icons/Videocam';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import useStyles from './styles';

const Camera = () => {
  const [Videoing, setVideoing] = useState(false);
  const classes = useStyles();

  const toggleVideoing = () => {
    // console.log(currentID);
    setVideoing(Videoing => !Videoing);
  };
  return (
    <Tooltip title="Camera">
      <Button onClick={toggleVideoing} className={classes.Sizing}>
        {Videoing ? (
          <VideocamOffIcon fontSize="large" color="secondary" />
        ) : (
          <VideocamIcon fontSize="large" className={classes.buttonColor} />
        )}
      </Button>
    </Tooltip>
  );
};

export default Camera;
