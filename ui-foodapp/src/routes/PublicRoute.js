import {Navigate} from 'react-router-dom'
import Cookies from '../helpers/cookie'

function PublicRoute({component}) {

    const auth = Cookies.getCookie('userIn')
    if (auth && auth.role === 'admin') {
       return  <Navigate to = "/admin"/>
    }
    if (auth && auth.role === 'customer') {
        return  <Navigate to = "/customer"/>
     }
    if (!auth) {
       return (component )
    }
}
export default PublicRoute