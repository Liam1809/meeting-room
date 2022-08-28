import * as api from '../api/index';
import { setSnackBar } from './snackbar';

import {
  FETCH,
  CREATE,
  UPDATE,
  DELETE,
  UPDATEDEMAIL,
} from '../constants/Types';

// FETCH ALL ROOM
export const getAllRooms = () => async dispatch => {
  try {
    const { data } = await api.fetchRooms();

    dispatch({ type: FETCH, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

// CREATE NEW ROOM
export const createNewRoom = newRoom => async dispatch => {
  try {
    const { data } = await api.createRoom(newRoom);

    dispatch({ type: CREATE, payload: data });

    dispatch(setSnackBar(true, 'success', 'SUCCESSFULLY CREATE NEW ROOM'));
  } catch (error) {
    console.log(error.message);
  }
};

// UPDATE CURRENT ROOM
export const updateCurrentRoom = (id, currentRoom) => async dispatch => {
  try {
    const { data } = await api.updateRoom(id, currentRoom);

    dispatch({ type: UPDATE, payload: data });

    dispatch(setSnackBar(true, 'success', 'SUCCESSFULLY UPDATE CURRENT ROOM'));
  } catch (error) {
    console.log(error.message);
  }
};

// DELETE CURRENT ROOM
export const deleteCurrentRoom = id => async dispatch => {
  try {
    await api.deleteRoom(id);

    dispatch({ type: DELETE, payload: id });

    dispatch(setSnackBar(true, 'success', 'SUCCESSFULLY DELETE CURRENT ROOM'));
  } catch (error) {
    console.log(error.message);
  }
};
// UPDATE INVITED PEOPLE OF CURRENT ROOM
export const updateInvitedEmail = (id, guestEmail) => async dispatch => {
  try {
    const { data } = await api.updateInvitedEmail(id, guestEmail);

    dispatch({ type: UPDATEDEMAIL, payload: data });

    dispatch(setSnackBar(true, 'success', 'SUCCESSFULLY ADD NEW EMAIL'));
  } catch (error) {
    console.log(error.message);
  }
};
