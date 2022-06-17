import React from 'react'
import Avatar from '@material-ui/core/Avatar';
import Cookies from '../../helpers/cookie';
import Button from '@material-ui/core/Button';
import { useNavigate } from 'react-router';

 function Header() {
   const nav =useNavigate()

   const logout = ()=>{
    Cookies.removeCookie('userIn',{path:'/'}) 
      nav('/login')
    }
    const user = Cookies.getCookie('userIn')
  return (
      <div className="navbar">
        <li >Home</li>
        <li>{user.first_name}</li>
        <div className="dropdown">
            <Avatar className="dropbtn" />
            {/* <i class="fa fa-caret-down"></i> */}
          
          <div className="dropdown-content">
            {/* <li onClick = {listCartItems}> <ShoppingCartIcon/></li>
            <li onClick = {myOrder}>My Orders</li> */}
            <li onClick = {logout}>LOGOUT</li>
          </div>
        </div> 
      </div>
    // <div className="main-container flexbox">
    //     <div className="left-hold">
    //       <span>{user.role}</span>
    //     </div>

    //     <div className="right-hold flexbox">
    //     <span><Avatar /></span>
    //     <span>{user.first_name}</span>
    //     <span >
    //       <Button variant="outlined" onClick = {logout}>
    //       LOGOUT
    //       </Button></span>
    //     </div>
		
    //   </div>
  )
}

export default Header