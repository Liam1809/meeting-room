import React from 'react';
import { Typography, Grid, TextField, MenuItem } from '@material-ui/core';

const roomArr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

const CustomLimit = ({ name, label, handleChange, value }) => {
  return (
    <Grid container justifyContent="flex-start" alignItems="center">
      <Grid item xs={3}>
        <Typography id="steps" gutterBottom>
          Room Capacity
        </Typography>
      </Grid>
      <Grid item xs={9}>
        <TextField
          name={name}
          required
          variant="outlined"
          label={label}
          fullWidth
          value={value}
          onChange={handleChange}
          select
        >
          <MenuItem disabled>Choose Capacity</MenuItem>
          {roomArr.map((element, index) => (
            <MenuItem key={index} value={element}>
              {element}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
    </Grid>
  );
};

export default CustomLimit;
