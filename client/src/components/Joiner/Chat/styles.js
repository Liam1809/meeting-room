import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  chatContainer: {
    display: 'absolute',
    top: '20px',
    right: '10',
    height: '500px',
    width: '500px',
    background: 'white',
  },
  openChat: {
    display: 'block',
  },
  closeChat: {
    display: 'none',
  },
  buttonColor: {
    color: '#2486e6',
  },
}));
