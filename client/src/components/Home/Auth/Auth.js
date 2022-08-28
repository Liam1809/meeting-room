import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

//import components
import Input from './Input/Input';

//import actions
import { signin } from '../../../actions/auth';
import { getAllRooms } from '../../../actions/room';
import { setSnackBar } from '../../../actions/snackbar';
//import styling
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from '@material-ui/core';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import useStyles from './styles';

const Auth = () => {
  // Manage state
  const [formData, setFormData] = useState({
    email: '',
    userName: '',
    password: '',
    room: '',
  });
  const [isAdmin, setIsAdmin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const classes = useStyles();

  const rooms = useSelector(state => state.room);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(getAllRooms());
    }, 1000);

    return () => clearInterval(interval);
  }, [dispatch]);

  // handle submit form
  const handleSubmit = e => {
    e.preventDefault();

    // admin
    if (isAdmin) {
      // WILL CREATE A FUNC LAATER FOR TRIMMING AND LOWERING CASE
      // trim and lower userName
      // let fixedText = formData.userName;
      // fixedText = fixedText.trim().toLowerCase();
      formData.userName = formData.userName.trim().toLowerCase();

      dispatch(signin(formData, history));
      // guest
    } else {
      // check email
      const theCurrentRoom = rooms.find(
        theRoom => theRoom.roomName === formData.room
      );
      // if the room exist
      if (theCurrentRoom) {
        const existingInvitedGuest = theCurrentRoom.invitedEmail.find(
          email => email === formData.email
        );
        // if the guest invited
        if (existingInvitedGuest) {
          const data = { guestName: formData.userName, room: formData.room };
          // send data to meeting room
          history.push(`/joiner/${data.room}`, { data });
        } else {
          dispatch(setSnackBar(true, 'error', 'GUEST HAS NOT BEEN INVITED'));
        }
      } else {
        dispatch(setSnackBar(true, 'error', 'ROOM DOES NOT EXIST'));
      }
    }

    clear();
  };

  // handle change in textfield
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle show password
  const handleShowPassword = () => {
    setShowPassword(prevPassword => !prevPassword);
  };

  // switching form
  const switchMode = () => {
    setIsAdmin(prevAdmin => !prevAdmin);
    clear();
  };

  // clear
  const clear = () => {
    setFormData({ email: '', userName: '', password: '', room: '' });
    setShowPassword(false);
  };

  return (
    <Container maxWidth="xs">
      {/* FORM */}
      <Paper className={`${classes.paper} ${classes.shadow}`} elevation={3}>
        <Avatar
          className={`${classes.avatar} ${
            isAdmin ? classes.avatar2 : classes.avatar1
          }`}
        >
          {isAdmin ? <SupervisorAccountIcon /> : <MeetingRoomIcon />}
        </Avatar>
        <Typography variant="h5">{isAdmin ? 'Login' : 'Join'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {!isAdmin && (
              <Input
                name="email"
                label="Email Address"
                type="email"
                handleChange={handleChange}
                value={formData.email}
              />
            )}
            <Input
              name="userName"
              label="User Name"
              handleChange={handleChange}
              value={formData.userName}
            />
            {isAdmin ? (
              <Input
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                handleChange={handleChange}
                handleShowPassword={handleShowPassword}
                value={formData.password}
              />
            ) : (
              <Input
                name="room"
                label="Room"
                handleChange={handleChange}
                value={formData.room}
              />
            )}
          </Grid>

          <Button
            className={classes.submit}
            type="submit"
            variant="contained"
            fullWidth
            color={isAdmin ? 'secondary' : 'primary'}
          >
            {isAdmin ? 'login' : 'Join room'}
          </Button>
          <Grid container justifyContent="flex-end">
            <Button onClick={switchMode} variant="text">
              {!isAdmin ? 'Login as Admin' : 'Join as Guest'}
            </Button>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
