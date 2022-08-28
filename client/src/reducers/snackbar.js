import { SNACKBAR } from '../constants/Types';

const initial = {
  snackbarOpen: false,
  snackbarType: 'success',
  snackbarMessage: '',
};

const snackBar = (snackbar = initial, action) => {
  switch (action.type) {
    case SNACKBAR:
      const { snackbarOpen, snackbarType, snackbarMessage } = action.payload;
      return { ...snackbar, snackbarOpen, snackbarType, snackbarMessage };
    default:
      return snackbar;
  }
};

export default snackBar;
