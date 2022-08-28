import React from 'react';
import { Grid, TextField, InputAdornment, IconButton } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

// custom Input component to get input
const Input = ({
  name,
  label,
  value,
  handleChange,
  type,
  handleShowPassword,
  disabled,
}) => {
  return (
    <Grid item xs={12}>
      <TextField
        disabled={disabled}
        name={name}
        label={label}
        variant="outlined"
        value={value}
        required
        fullWidth
        onChange={handleChange}
        type={type}
        inputProps={{
          maxLength: 50,
        }}
        InputProps={
          name === 'password'
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword}>
                      {type === 'password' ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : null
        }
      />
    </Grid>
  );
};

export default Input;
