import { makeStyles } from '@material-ui/core/styles';

const color = {
  blue: '#deebff',
  white: '#FFF',
};

export default makeStyles(theme => ({
  initial: {
    width: '80%',
    margin: '2rem auto',
  },
  mainContainer: {
    background: color.blue,
    height: '100%',
    maxWidth: '100%',
    margin: '0 auto',
    padding: '1rem 1rem',
  },
  header: {
    textTransform: 'uppercase',
    letterSpacing: 'inherit',
    textAlign: 'inherit',
    fontFamily: 'inherit',
    background: color.white,
    borderRadius: '15px',
    padding: '10px 20px',
    border: '2px solid rgba(0,0,0, 0.1)',
    '@media (max-width: 36rem)': {
      fontSize: '1rem',
    },
  },
  shadow: {
    boxShadow: '5px 5px 20px rgba(0,0,0, 0.2)',
  },
}));
