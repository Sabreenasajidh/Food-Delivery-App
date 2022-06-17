import React,{useEffect} from 'react';
import { useFormik } from 'formik';
import './Auth.css'
import validate from './signupValidation'
import {useDispatch,useSelector } from 'react-redux';
import {useNavigate} from 'react-router';
import Cookies from '../../helpers/cookie';
import { ToastContainer } from 'react-toastify';
import img from './img.jpg'

const initialValues = {
  first_name:'',
  last_name:'',
  email:'',
  phone_number:'',
  password:'',
  confirm_password:''
}

 
const Signup = () => {
  let userdata = useSelector((state) => state.authModel.user);
  let navigate = useNavigate();
  const dispatch = useDispatch();
  //userdata.role = 'customer'


  useEffect(() => {
    if(userdata.email){
      Cookies.removeCookie('userIn')
      Cookies.setCookie('userIn',userdata)
      if(userdata.role === 'customer'){
        navigate('/customer')
      }
      if(userdata.role === 'admin'){
        navigate('/admin')
      }
      
    }
  },[userdata]);

  const onSubmit = value=>{    
    dispatch.authModel.userSignUp(value)
  }
  const formik = useFormik({
    initialValues,
    onSubmit,
    validate
});
  
  return (
    <div className = "signup_form">
            
    <div className="signup_title">Create an account</div>
    <form onSubmit={formik.handleSubmit} action="post">

      <div className="input-container ic1">
        <input 
              name="first_name" 
              className="input" 
              type="text" 
              placeholder=" "
              onChange= {formik.handleChange}
              // onBlur = {formik.handleBlur}
              value = {formik.values.first_name}
        />
        {formik.errors.first_name ? <p>{formik.errors.first_name}</p> : null}
        <div className="cut"> </div>
        <label name="first_name" className="placeholder">First name</label>
      </div>
      <div className="input-container ic2">
        
          <input 
            name="last_name" 
            className="input" 
            type="text" 
            placeholder=" " 
            onChange={formik.handleChange} 
            // onBlur = {formik.handleBlur}
            value = {formik.values.last_name} 
          />
          {formik.errors.last_name ? <p>{formik.errors.last_name}</p> : null}
          <div className="cut cut-short"></div>
          <label name="last_name" className="placeholder">Lastname</label>
      </div>

      <div className="input-container ic2">
      
          <input 
            name="email" 
            className="input" 
            type="email" 
            placeholder=" " 
            onChange= {formik.handleChange} 
            // onBlur = {formik.handleBlur}
            value = {formik.values.email}  
          />
          {formik.touched.email && formik.errors.email ? <p>{formik.errors.email}</p> : null}
          <div className="cut cut-short"></div>
          <label name="email" className="placeholder">Email</label>
        </div>

        <div className="input-container ic2">
        
          <input 
            name="phone_number" 
            className="input" 
            type="number" 
            placeholder=" " 
            onChange= {formik.handleChange} 
            // onBlur = {formik.handleBlur}
            value = {formik.values.phone_number}  
          />
          {formik.touched.phone_number && formik.errors.phone_number ? <p>{formik.errors.phone_number}</p> : null}
          <div className="cut cut-short"></div>
          <label name="phone_number" className="placeholder">Phone Number</label>
        </div>

         <div className="input-container ic2">
        
           <input 
            name="password" 
            className="input" 
            type="password" 
            placeholder=" "   
            onChange= {formik.handleChange} 
            // onBlur = {formik.handleBlur}
            value = {formik.values.password}  
          />
           {formik.touched.password && formik.errors.password ? <p>{formik.errors.password}</p> : null}
          <div className="cut"></div>
          <label name="password" className="placeholder">Password</label>
         </div>

         <div className="input-container ic2">
         
           <input 
            name="confirm_password" 
            className="input" 
            type="password" 
            placeholder=" "  
            onChange= {formik.handleChange} 
            // onBlur = {formik.handleBlur}
            value = {formik.values.confirm_password} 
          />
          {formik.touched.confirm_password && formik.errors.confirm_password ? <p>{formik.errors.confirm_password}</p> : null}
           <div className="cut"></div>
           <label name="confirm_password" className="placeholder">Confirm Password</label>
         </div>
      <button type="sumbit" className="submit">submit</button>
    </form>
    <ToastContainer/>
    </div>
  );
};
export default Signup