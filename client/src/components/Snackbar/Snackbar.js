import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { setSnackBar } from '../../actions/snackbar';

import useStyles from './styles.js';

const CustomizedSnackbars = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const snackbarOpen = useSelector(state => state.snackBar.snackbarOpen);
  const snackbarType = useSelector(state => state.snackBar.snackbarType);
  const snackbarMessage = useSelector(state => state.snackBar.snackbarMessage);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(setSnackBar(false, snackbarType, snackbarMessage));
  };

  return (
    <div className={classes.root}>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          severity={snackbarType}
          elevation={6}
          variant="filled"
          onClose={handleClose}
          color={snackbarType}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CustomizedSnackbars;
