import React,{useState,useEffect} from 'react'
import Avatar from '@material-ui/core/Avatar';
import Cookies from '../../helpers/cookie';
import Button from '@material-ui/core/Button';
import { useNavigate } from 'react-router';
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining'
import logo from './delivery.png'; // Tell webpack this JS file uses this image
import {useDispatch } from 'react-redux';



function UserHeader(props) {
  const {badge,onAdd,onDelete} = props;
  const dispatch = useDispatch()
    const nav =useNavigate()
    
    // const [state,setState] = useState(false)
    // const [count,setCount] = useState(0)

    // useEffect(()=>{
    //   badge()
    // },[count])

    // const badge = async()=>{
    //   const dd = await dispatch.cartModel.getCount()
    //   console.log(dd);
    //   setCount(dd.data)
    // }
    const user = JSON.parse(Cookies.getCookie('userIn'))
    // const showList= ()=>{
    //   setState(true)
    // }
    // const hideList = ()=>{
    //   setState(false)
    // }

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
     const profile = ()=>{
      nav('/profile')
    }
   return (
      <div class="user-topnav" >
        <li onClick = {homePage}>Home</li>
        <span><img src = {logo}  /></span>
        <li onClick = {listCartItems} className="cart"> <ShoppingCartIcon/><span class="badge">{badge}</span></li>
        
        <div class="dropdown">
          <button class="dropbtn"><span>{user.first_name}</span><Avatar /> 
          </button>
          <div class="dropdown-content">
            <li onClick = {profile}>Profile</li>
            <li onClick = {myOrder}>My Orders</li>
            <li onClick = {logout}>Logout</li>
          </div>
        </div> 
      </div>
   )
}

export default UserHeader