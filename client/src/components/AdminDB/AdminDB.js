import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import decode from 'jwt-decode';

//import components
import Box from './Box/Box';
import CreateRoom from './CreateRoom';

// protect private router
import { authRouter } from '../../privateRouter/AuthRouter';

//import actions
import { getAllRooms } from '../../actions/room';
import { setSnackBar } from '../../actions/snackbar';

//import Constants
import { LOGOUT } from '../../constants/Types';

//import styling
import {
  Container,
  Grow,
  Typography,
  Divider,
  Grid,
  Button,
  Tooltip,
} from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
import useStyles from './styles';

const Admin = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  // GET USER FROM LOCALSTORAGE
  const user = JSON.parse(localStorage.getItem('userProfile'));

  // Authenticate URL
  authRouter(user, history);

  useEffect(() => {
    // auto logout
    const token = user?.data?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logOut();
      }
    }

    dispatch(getAllRooms());
    // eslint-disable-next-line
  }, [dispatch, user?.data?.token]);

  // GET ROOMS FROM STATE
  const roomArray = useSelector(state => state?.room);

  // Logout
  const logOut = async () => {
    await dispatch({ type: LOGOUT });
    history.push('/');
    dispatch(setSnackBar(true, 'success', 'SUCCESSFULLY LOGGED OUT'));
  };

  return (
    <Grow in>
      <Container className={classes.mainContainer} maxWidth="lg">
        {/* HEADER */}
        <Grid
          className={`${classes.initial} ${classes.header} ${classes.shadow}`}
          container
          justifyContent="space-between"
          alignItems="center"
          spacing={3}
        >
          <Grid
            container
            item
            xs={10}
            sm={7}
            justifyContent="flex-start"
            alignItems="center"
          >
            <Grid item xs={12} sm={1}>
              <PersonIcon style={{ fontSize: '3rem' }} color="primary" />
            </Grid>
            <Grid item xs={12} sm={7}>
              <Typography variant="h4">Welcome Admin</Typography>
            </Grid>
          </Grid>
          <Grid item xs={2} sm={2}>
            <Button onClick={logOut}>
              <Tooltip title="Exit">
                <ExitToAppIcon fontSize="large" color="secondary" />
              </Tooltip>
            </Button>
          </Grid>
        </Grid>

        <Divider className={classes.initial} />

        <Grid
          className={`${classes.initial}`}
          container
          justifyContent="flex-start"
          alignItems="center"
        >
          {/* Create New Room */}
          <CreateRoom />
        </Grid>

        <Divider className={classes.initial} style={{ width: '60%' }} />

        {/* Display Rooms */}
        {roomArray?.map(element => (
          <Box element={element} key={element._id} user={user} />
        ))}
      </Container>
    </Grow>
  );
};

export default Admin;
