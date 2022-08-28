import { makeStyles } from '@material-ui/core/styles';

const color = {
  blue: '#deebff',
  white: '#FFF',
};

export default makeStyles(() => ({
  mainContainer: {
    height: '100vh',
    maxWidth: '100%',
    margin: '0 auto',
    padding: '5rem 1rem',
    background: color.blue,
  },
  header: {
    textTransform: 'uppercase',
    letterSpacing: 'inherit',
    textAlign: 'inherit',
    fontFamily: 'inherit',
    fontWeight: 'inherit',
    background: color.white,
    borderRadius: '15px',
    padding: '10px 20px',
    marginBottom: '20px',
    border: '3px solid rgba(0,0,0, 0.1)',
  },
  shadow: {
    boxShadow: '5px 5px 20px rgba(0,0,0, 0.2)',
  },
}));

// RESPONSIVE LATER
// '@media (max-width: 36rem)': {
//   fontSize: '2rem',
// },
// '@media (max-width: 48rem)': {
//   fontSize: '2rem',
// },
// '@media (max-width: 62rem)': {
//   fontSize: '2rem',
// },
