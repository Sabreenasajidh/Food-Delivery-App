import React from 'react'
import {useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

function Sidebar() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const listUser = async(req,res) =>{
        //await dispatch.userModel.getUsers()
        navigate('/admin/users')
    } 
    const listProduct = async (req,res)=>{
      //await dispatch.productModel.getProducts()
      navigate('/admin/products')
    }
    
  return (
    <div>
        <div id="mySidenav" className="sidebar">
            
            <button onClick = {listUser} className="sidebar_button">Users</button>
            <button onClick = {listProduct} className="sidebar_button">Products</button>
        </div>
    </div>
  )
}

export default Sidebar