import { combineReducers } from 'redux';

// import reducer components
import auth from './auth.js';
import room from './room.js';
import snackBar from './snackbar.js';

export default combineReducers({ auth, room, snackBar });
