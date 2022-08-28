import { makeStyles } from '@material-ui/core/styles';

const color = {
  blue: '#deebff',
  white: '#FFF',
};

export default makeStyles(() => ({
  initial: {
    width: '80%',
    margin: '2rem auto',
  },
  shadow: {
    boxShadow: '5px 5px 20px rgba(0,0,0, 0.2)',
  },
  secondContainer: {
    background: color.white,
    borderRadius: '30px',
    padding: '10px 20px',
    border: '1px solid rgba(0,0,0, 0.1)',
  },
}));
