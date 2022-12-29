import {Navigate} from 'react-router-dom'
import Cookies from '../helpers/cookie';

function PrivateRoute({component}) {
  const auth = Cookies.getCookie('userIn')
  console.log(auth);
  return auth? (component ) :<Navigate to ="/"/> 
}

export default PrivateRoute