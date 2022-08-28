import React from 'react';
//import components
import Auth from './Auth/Auth';

//import styling
import { Grow, Container, Typography, Grid } from '@material-ui/core';
import useStyles from './styles';

const Home = () => {
  const classes = useStyles();

  return (
    <Grow in>
      <Container className={classes.mainContainer}>
        <Grid container justifyContent="center">
          <Typography
            variant="h3"
            className={`${classes.header} ${classes.shadow}`}
          >
            Meeting Room
          </Typography>
        </Grid>
        <Grid container>
          {/* Authentication Form to either login as Admin or join as User */}
          <Auth />
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
