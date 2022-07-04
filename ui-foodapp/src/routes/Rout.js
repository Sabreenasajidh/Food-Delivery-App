import React from 'react'
//import App from '../App';
import Signup from '../container/Auth/Signup';
import Login from '../container/Auth/Login';
import Admin from '../Components/Layout/Layout';
import Customer from '../container/Userboard/Customer';
import Home from '../container/Home/Error'
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import ListUsers from '../container/Adminboard/Users/ListUsers';
import NewUser from '../container/Adminboard/Users/AddUser';
import EditUser from '../container/Adminboard/Users/EditUser';
import Cart from '../container/Userboard/Cart'

import ListProducts from '../container/Adminboard/Products/ListProductPage';
import AddProduct from '../container/Adminboard/Products/AddProductPage'


import { BrowserRouter,Routes,Route} from 'react-router-dom';
import EditProduct from '../container/Adminboard/Products/EditProductPage';
import Order from '../container/Userboard/Order';
import Test from '../container/Adminboard/Products/Test';
function Rout() {
  //console.log(Cookies.get('userIn'));
  // const isLoggedIn = Cookies.get('userIn') ? JSON.parse(Cookies.get('userIn')): false
  // console.log("isLoggedIn",isLoggedIn);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          
              <Route path="/admin" element={<PrivateRoute component = {<Admin />}  /> } />
              <Route path = "/admin/users" element  = {<PrivateRoute component = {<ListUsers /> }/> } />
              <Route path = "/admin/users/newUser" element  = {<PrivateRoute component = {<NewUser /> }/> } />
              <Route path = "/admin/users/edit/:id" element  = {<PrivateRoute component = {<EditUser /> }/> } />
              <Route path = "/admin/products" element  = {<PrivateRoute component = {<ListProducts /> }/> } />
              <Route path = "/admin/products/addproduct" element  = {<PrivateRoute component = {<AddProduct /> }/> } />
              <Route path = "/admin/products/edit/:id" element  = {<PrivateRoute component = {<EditProduct /> }/> } />
              <Route path="/customer" element={<PrivateRoute component = {<Customer /> }/> } />
              <Route path="/customer/cart" element={<PrivateRoute component = {<Cart /> }/> } />
              <Route path="/customer/order" element={<PrivateRoute component = {<Order /> }/> } />
              <Route path = "/admin/products/edit" element  = {<PrivateRoute component = {<Test /> }/> } />
            {/* </Route> */}


            <Route path="/" element = {<PublicRoute component= {<Login />} />} />
            <Route path="/login" element = {<PublicRoute component= {<Login />} />} />
            <Route path="/signup"  element = {<PublicRoute component={<Signup/>} />} />
            <Route path= "*" element = {<Home />}/> 
          </Routes>

      </BrowserRouter>
    </div>


)
}

export default Rout
