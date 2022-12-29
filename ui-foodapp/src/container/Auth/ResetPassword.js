import React from 'react'
import { useFormik } from 'formik';
import {useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import {useParams,Link} from "react-router-dom"

const validate = (values) => {

  const errors = {};
if (!values.password) {
  errors.password = 'Required';
} else if (values.password.length < 10) {
  errors.password = 'Must be 10 characters or more';
}
if (!values.confirm_password) {
  errors.confirm_password = 'Required';
} else if (values.password !== values.confirm_password) {
  errors.confirm_password = 'Password not match';
}
return errors;
}
function ResetPassword() {
    const dispatch = useDispatch()
    const { id } = useParams(); 
    const initialValues = {
        password:'',
        confirm_password:''
        
    }
    const onSubmit = value=>{ 
        console.log(value);  
        value.id = id
        console.log(id);
       dispatch.authModel.resetpassword(value)
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
            name="password" 
            className="input" 
            type="password" 
            placeholder=" " 
            onChange= {formik.handleChange} 
            // onBlur = {formik.handleBlur}
            value = {formik.values.password}  
          />
          {formik.touched.password && formik.errors.password ? <p>{formik.errors.password}</p> : null}
          <div className="cut cut-short"></div>
          <label name="password" className="placeholder">Enter new password</label>
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
          <div className="cut cut-short"></div>
          <label name="confirm_password" className="placeholder">Confirm new password</label>
        </div>

      <button type="sumbit" className="submit">submit</button>
        <Link to="/login">
                {"Back to login"}
        </Link>
    </form>
   
    </div> 
    < ToastContainer />
   
    </div>
  )
}

export default ResetPassword