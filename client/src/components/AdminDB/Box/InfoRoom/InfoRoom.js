import React, { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import { useDispatch } from 'react-redux';
import moment from 'moment';

//import components
import Input from '../../../Home/Auth/Input/Input';
import CustomLimit from '../LimitGuest/CustomLimit';

//import actions
import { updateCurrentRoom } from '../../../../actions/room';
import { setSnackBar } from '../../../../actions/snackbar';

//import constants
import {
  EMAIL_ID,
  UPDATE_TEMPLATE_ID,
  USER_ID,
} from '../../../../constants/Types';

//import styling
import {
  Button,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
  Grid,
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';

const InfoRoom = ({ element }) => {
  const [open, setOpen] = useState(false);
  const [currentId, setCurrentId] = useState(-1);
  const [invitedEmailArray, setInvitedEmailArray] = useState(
    element.invitedEmail
  );

  const [updatedForm, setUpdatedForm] = useState({
    roomName: element.roomName,
    capacity: element.capacity,
    invitedEmail: [],
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (currentId !== -1) {
      setInvitedEmailArray(invitedEmailArray =>
        invitedEmailArray.filter((element, index) => index !== currentId)
      );
      setCurrentId(-1);
    }
  }, [currentId, invitedEmailArray]);

  const handleClickOpen = () => {
    setOpen(true);
    setInvitedEmailArray(element.invitedEmail);
    setUpdatedForm({
      roomName: element.roomName,
      capacity: element.capacity,
      invitedEmail: [],
    });
  };

  const handleClose = () => {
    clear();
  };

  const handleChange = e => {
    setUpdatedForm({ ...updatedForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    try {
      e.preventDefault();
      updatedForm.invitedEmail = invitedEmailArray;

      // if roomName change resend email to invited guest
      if (element.roomName !== updatedForm.roomName) {
        invitedEmailArray.forEach(item =>
          emailjs.send(
            EMAIL_ID,
            UPDATE_TEMPLATE_ID,
            {
              room_Name: updatedForm.roomName,
              link_Name: 'https://liam-meeting-room.netlify.app',
              guest_Email: item,
            },
            USER_ID
          )
        );
      }
      // console.log(updatedForm);
      if (updatedForm.invitedEmail.length > updatedForm.capacity) {
        dispatch(
          setSnackBar(
            true,
            'error',
            'ROOM CAPACITY CANNOT BE LESS THAN INVITED GUEST EMAIL'
          )
        );
      } else {
        await dispatch(updateCurrentRoom(element._id, updatedForm));
        clear();
      }
    } catch (error) {
      console.log(error.message);
      dispatch(setSnackBar(true, 'error', 'UPDATE FAILED'));
    }
  };

  // clear
  const clear = () => {
    setOpen(false);
    setCurrentId(-1);
    setTimeout(() => {
      setInvitedEmailArray(element.invitedEmail);
      setUpdatedForm({
        roomName: element.roomName,
        capacity: element.capacity,
        invitedEmail: [],
      });
    }, 500);
  };
  return (
    <div>
      <Tooltip title="Info">
        <Button onClick={handleClickOpen} variant="text" color="secondary">
          Info
        </Button>
      </Tooltip>
      <Dialog fullWidth maxWidth="sm" open={open} onClose={handleClose}>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Grid
              container
              justifyContent="flex-start"
              alignItems="center"
              spacing={3}
            >
              <Grid item xs={12}>
                <Input
                  name="roomName"
                  type="text"
                  label="Room Name"
                  value={updatedForm.roomName}
                  handleChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Input
                  name="creator"
                  type="text"
                  label="creator"
                  value={element.creator}
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <CustomLimit
                  name="capacity"
                  label="Room Capacity"
                  value={updatedForm.capacity}
                  handleChange={handleChange}
                />
              </Grid>
              {invitedEmailArray?.length === 0 ? (
                <Grid item xs={12}>
                  <Typography variant="caption">
                    NO GUESTS HAVE BEEN INVITED
                  </Typography>
                </Grid>
              ) : (
                <Grid item xs={12}>
                  <Typography variant="caption">
                    Invited Email Numbers: {invitedEmailArray?.length}
                  </Typography>
                </Grid>
              )}

              {invitedEmailArray?.map((element, index) => (
                <Grid
                  item
                  xs={12}
                  container
                  justifyContent="space-between"
                  key={index}
                >
                  <Grid item>
                    <Typography variant="h6">{element}</Typography>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => setCurrentId(index)}
                    >
                      <ClearIcon />
                    </Button>
                  </Grid>
                </Grid>
              ))}
              <Grid item xs={12}>
                <Typography>
                  Created At - {moment(element.createdAt).format('LLL')}
                </Typography>
              </Grid>
            </Grid>

            <DialogActions>
              <Button variant="contained" color="secondary" type="submit">
                Update
              </Button>
              <Button variant="contained" color="primary" onClick={handleClose}>
                Close
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InfoRoom;
