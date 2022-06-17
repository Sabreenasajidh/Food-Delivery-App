import React,{useState} from 'react'
import Avatar from '@material-ui/core/Avatar';
import Cookies from '../../helpers/cookie';
import Button from '@material-ui/core/Button';
import { useNavigate } from 'react-router';
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";


function UserHeader() {
    const nav =useNavigate()
    const [state,setState] = useState(false)

    const showList= ()=>{
      setState(true)
    }
    const hideList = ()=>{
      setState(false)
    }

    const logout = ()=>{
     Cookies.removeCookie('userIn',{path:'/'}) 
       nav('/login')
     }
     const listCartItems = ()=>{
       console.log("ListCart Items");
       nav('/customer/cart')
     }
     const myOrder = ()=>{
       nav('/customer/order')

     }
     const homePage = ()=>{
      nav('/customer')
     }
     const user = JSON.parse(Cookies.getCookie('userIn'))
     console.log(user);
   return (

    <div className="navbar">
      <li onClick = {homePage}>Home</li>
      <li>{user.first_name}</li>
  <div className="dropdown">
      <Avatar className="dropbtn" />
      {/* <i class="fa fa-caret-down"></i> */}
    
    <div className="dropdown-content">
    <li onClick = {listCartItems}> <ShoppingCartIcon/></li>
    <li onClick = {myOrder}>My Orders</li>
    <li onClick = {logout}>LOGOUT</li>
    </div>
  </div> 
</div>
   )
}

export default UserHeader