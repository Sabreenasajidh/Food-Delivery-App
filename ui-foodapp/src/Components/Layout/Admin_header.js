import React from 'react'
import Avatar from '@material-ui/core/Avatar';
import Cookies from '../../helpers/cookie';
import Button from '@material-ui/core/Button';
import { useNavigate } from 'react-router';
import {deepPurple } from '@mui/material/colors';
import Stack from '@mui/material/Stack';
import dpic from './motorbike.png'


 function Header() {
   const nav =useNavigate()

   const logout = ()=>{
    Cookies.removeCookie('userIn',{path:'/'}) 
      nav('/login')
    }

    const profile = ()=>{
        nav('/profile')
      }
    const user = JSON.parse(Cookies.getCookie('userIn'))
  return (
  <div class="topnav" >
  <li>Home</li>
  <span><img src = {dpic}  /></span>
  <div class="dropdown">
    <button class="dropbtn"><span>{user.first_name}</span><Avatar /> 
    </button>
    <div class="dropdown-content">
      <li onClick = {profile}>Profile</li>
      <li onClick = {logout}>Logout</li>
    </div>
  </div> 
</div>
    
  )
}

export default Header