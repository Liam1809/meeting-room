import * as api from '../api/index';
import { setSnackBar } from './snackbar';

import { AUTH } from '../constants/Types';

export const signin = (formData, history) => async dispatch => {
  try {
    const data = await api.signIn(formData);
    // dispatch AUTH type action with data as payload
    dispatch({ type: AUTH, payload: data });

    // get user from local storage
    const user = JSON.parse(localStorage.getItem('userProfile'));

    // if user exist push back to admindb path
    if (user) history.push('/admindb');

    dispatch(setSnackBar(true, 'success', 'SUCCESSFULLY SIGNED IN'));
  } catch (error) {
    console.log(error.message);
    dispatch(setSnackBar(true, 'error', 'USER OR PASSWORD NOT CORRECT'));
  }
};
