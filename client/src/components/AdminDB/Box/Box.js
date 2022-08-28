import React from 'react';
import { useDispatch } from 'react-redux';
//import copoments
import InfoRoom from './InfoRoom/InfoRoom';
import InviteEmail from './InviteEmail/InviteEmail';
import LimitGuest from './LimitGuest/LimitGuest';

// import actions
import { deleteCurrentRoom } from '../../../actions/room';
//import styling
import {
  Container,
  Typography,
  Grid,
  Button,
  Tooltip,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import useStyles from './styles';

const Box = ({ user, element }) => {
  const dispatch = useDispatch();

  const classes = useStyles();

  return (
    <Container maxWidth="md" key={element._id}>
      <Grid
        className={`${classes.initial} ${classes.secondContainer} ${classes.shadow}`}
        container
        justifyContent="space-between"
        alignItems="center"
        spacing={3}
      >
        {/* Room Name */}
        <Grid container item xs={3} justifyContent="flex-start">
          <Typography variant="subtitle1" color="primary">
            Room - {element.roomName}
          </Typography>
        </Grid>
        {/* Info Room */}
        <Grid item xs={2}>
          <InfoRoom element={element} />
        </Grid>
        {/* Limit Guest */}
        <Grid item xs={2}>
          <LimitGuest capacity={element.capacity} />
        </Grid>
        {/* Invite new people */}
        <Grid item xs={2}>
          <InviteEmail element={element} />
        </Grid>
        {/* Delete Room */}
        <Grid item xs={2}>
          <Tooltip title="Delete">
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => dispatch(deleteCurrentRoom(element._id))}
            >
              <DeleteIcon fontSize="medium" />
            </Button>
          </Tooltip>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Box;
