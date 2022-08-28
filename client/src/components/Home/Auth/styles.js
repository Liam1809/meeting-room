import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  avatar: {
    margin: theme.spacing(2),
  },
  avatar1: {
    backgroundColor: theme.palette.primary.main,
  },
  avatar2: {
    backgroundColor: theme.palette.secondary.main,
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
