import { SNACKBAR } from '../constants/Types';

export const setSnackBar =
  (snackbarOpen, snackbarType = 'success', snackbarMessage = '') =>
  async dispatch => {
    try {
      const data = { snackbarOpen, snackbarType, snackbarMessage };

      dispatch({ type: SNACKBAR, payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };
