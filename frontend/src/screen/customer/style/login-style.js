
import { makeStyles } from '@material-ui/core/styles';

const LoginStyle = makeStyles((theme) => ({
  root: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: '5px',
    width: '50vw',
    height: '50vh',
    border: '1px solid #ccc',
    backgroundColor: '#ffffff',
    padding: theme.spacing(3),
    boxShadow: '0 0 6px 0px #1c1c1c',
    backdropFilter: 'blur(10px)',
  },
  form: {
    width: '60%',
    alignText: 'start',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  }, 
  register: {
    margin: theme.spacing(3, 0, 2),
  },
  illustration: {
    width: '100%',
    height: 'auto',
    maxWidth: 400,
  },
}));

export default LoginStyle;