import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import emailjs from 'emailjs-com';

//import components
import Input from '../../../Home/Auth/Input/Input';

//import actions
import { updateInvitedEmail } from '../../../../actions/room';
import { setSnackBar } from '../../../../actions/snackbar';

//import constants
import { EMAIL_ID, TEMPLATE_ID, USER_ID } from '../../../../constants/Types';

//import styling
import {
  Button,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';

const InviteEmail = ({ element }) => {
  const [open, setOpen] = useState(false);
  const [guestEmailForm, setGuestEmailForm] = useState({ guest_Email: '' });

  const dispatch = useDispatch();

  // retrieve the room from state
  const room = useSelector(state =>
    state.room.find(room => room?._id === element?._id)
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    clear();
  };

  const sendEmail = async e => {
    try {
      e.preventDefault();

      if (room?.invitedEmail.length < room?.capacity) {
        // find index of the given email
        const index = room?.invitedEmail.findIndex(
          email => email === guestEmailForm.guest_Email
        );
        // if the email has not been invited
        if (index === -1) {
          emailjs.sendForm(EMAIL_ID, TEMPLATE_ID, e.target, USER_ID);

          await dispatch(updateInvitedEmail(element._id, guestEmailForm));
          // throw error
        } else {
          dispatch(
            setSnackBar(true, 'error', 'THIS GUEST HAS BEEN INVITED ALREADY')
          );
        }
      } else {
        dispatch(
          setSnackBar(true, 'error', 'NO MORE CAPACITY TO INVITE GUEST')
        );
      }

      clear();
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleChange = e => {
    setGuestEmailForm({ ...guestEmailForm, [e.target.name]: e.target.value });
  };

  const clear = () => {
    setOpen(false);
    setGuestEmailForm({ guest_Email: '' });
  };

  return (
    <div>
      <Tooltip title="Invite">
        <Button onClick={handleClickOpen} variant="outlined" color="primary">
          <EmailIcon fontSize="medium" />
        </Button>
      </Tooltip>
      <Dialog fullWidth maxWidth="sm" open={open} onClose={handleClose}>
        <DialogTitle>Room {element.roomName}</DialogTitle>
        <DialogContent>
          <form onSubmit={sendEmail}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Input name="guest_Name" type="text" label="Guest Name" />
              </Grid>
              <Grid item xs={12}>
                <Input
                  name="guest_Email"
                  type="email"
                  label="Guest Email"
                  value={guestEmailForm.guest_Email}
                  handleChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Input
                  name="room_Name"
                  type="text"
                  label="Room Name"
                  value={element.roomName}
                />
              </Grid>
              <Grid item xs={12}>
                <Input
                  name="link_Name"
                  type="text"
                  label="Link Name"
                  value="https://liam-meeting-room.netlify.app" // will change to link later when deploy
                />
              </Grid>
            </Grid>
            <DialogActions>
              <Button variant="contained" color="secondary" type="submit">
                Send Invitation
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

export default InviteEmail;
