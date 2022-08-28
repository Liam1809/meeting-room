import { makeStyles } from '@material-ui/core/styles';

// const color = {
//   blue: '#deebff',
//   white: '#FFF',
// };

export default makeStyles(() => ({
  mainContainer: {
    background: '#0c4c74',
    height: '100vh',
    width: '100%',
    padding: '0',
    margin: '0',
  },
  Videos: {
    height: '90%',
    padding: '20px',
  },
  Controls: {
    borderRadius: '30px',
    height: '10%',
    background: '#293959',
    position: 'fixed',
    left: '50%',
    transform: 'translate(-50%)',
    bottom: '10px',
    width: '95%',
  },
  buttonColor: {
    color: '#2486e6',
  },
}));
