import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  video: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'relative',
    borderRadius: '15px',
    transform: 'scaleX(-1)',
  },
  floating: {
    position: 'absolute',
  },
  videoContainer: {
    height: '33%',
    background: 'black',
    borderRadius: '19px',
    border: '5px solid black',
    padding: '0',
    margin: '0',
  },
  checkZooming: {
    position: 'absolute',
    width: '80%',
    height: '70%',
    margin: '0 auto',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: 'black',
    zIndex: '1',
    borderRadius: '15px',
    border: '5px solid black',
  },
  Sizing: {
    width: '50px',
    height: '50px',
  },
  buttonColor: {
    color: '#2486e6',
  },
}));
