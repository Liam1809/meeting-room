import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

//import components
import Input from '../Home/Auth/Input/Input';
import CustomLimit from './Box/LimitGuest/CustomLimit';

//import actions
import { createNewRoom } from '../../actions/room';
//import styling
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  Tooltip,
} from '@material-ui/core';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import CloseIcon from '@material-ui/icons/Close';

const CreateRoom = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ roomName: '', capacity: '' });

  const dispatch = useDispatch();

  // open form to create
  const handleClickOpen = () => {
    setOpen(true);
  };

  // close form
  const handleClose = () => {
    setOpen(false);
  };

  // submit form
  const handleSubmit = e => {
    e.preventDefault();
    dispatch(createNewRoom(formData));
    clear();
  };

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // clear
  const clear = () => {
    setFormData({ roomName: '', capacity: '' });
    setOpen(false);
  };
  return (
    <div>
      <Tooltip title="Create">
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          <ControlPointIcon style={{ paddingRight: '5px' }} />
          New Room
        </Button>
      </Tooltip>
      <Dialog fullWidth maxWidth="sm" open={open} onClose={handleClose}>
        <DialogActions>
          <Button onClick={handleClose}>
            <CloseIcon />
          </Button>
        </DialogActions>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              spacing={3}
            >
              <Grid item xs={12}>
                <Input
                  name="roomName"
                  label="Enter Room Name"
                  handleChange={onChange}
                  value={formData.roomName}
                />
              </Grid>
              <Grid item xs={12}>
                <CustomLimit
                  name="capacity"
                  label="Choose Capacity"
                  handleChange={onChange}
                  value={formData.capacity}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="primary" type="submit">
              Create Room
            </Button>
            <Button variant="contained" color="secondary" onClick={clear}>
              Clear
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default CreateRoom;
