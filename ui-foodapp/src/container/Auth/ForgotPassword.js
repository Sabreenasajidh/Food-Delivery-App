import React from 'react'
import { useFormik } from 'formik';
import {useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import {Link} from "react-router-dom"
import Grid from '@material-ui/core/Grid';



const validate = (values) => {
    
    const errors = {};
    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }
    
    
    return errors;
};

function ForgotPassword() {
    const dispatch = useDispatch()
    const initialValues = {
        email:''
        
    }
    const onSubmit = value=>{ 
        console.log(value);   
        dispatch.authModel.forgetpassword(value)
    }
    const formik = useFormik({
        initialValues,
        onSubmit,
        validate
    });
  return (
    <div className = 'auth-div'>
    <div className = "reset_form">
            
    <div className="reset_title">Password Reset</div>
    <form onSubmit={formik.handleSubmit} action="post" className="resetfrom">

      
     

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
          <label name="email" className="placeholder">Enter your email address</label>
        </div>

      <button type="sumbit" className="submit">submit</button>
    </form>
    <Link to="/login">
                {"Back to login"}
    </Link>
   
    </div> 
    < ToastContainer />
   
    </div>
  )
}

export default ForgotPassword