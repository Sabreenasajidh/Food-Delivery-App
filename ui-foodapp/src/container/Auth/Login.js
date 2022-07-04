import React from 'react'
import './Auth.css'
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useFormik } from 'formik';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import validate from './SigninValidation'
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { ToastContainer } from 'react-toastify';

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onSubmit =async (value)=>{
       const userInfo=await dispatch.authModel.userLogin(value) 
       console.log(userInfo.role);
       //Cookies.setCookie('userIn,userInfo')

        if(userInfo.role === 'customer'){
            navigate('/customer')
        }
        if(userInfo.role === 'admin'){
            navigate('/admin')
        }
    }

    const formik = useFormik({
    initialValues: {
    email: '',
    password: '',
    },
    validate,
    onSubmit
    });
  return (
    <div className = 'auth-div'>
        <div className = 'login-container'>
        <div>
         <Avatar>
           <LockOutlinedIcon />
         </Avatar>
         <Typography component="h1" variant="h5">
           Sign in
         </Typography>
         </div>
         <form onSubmit={formik.handleSubmit} >
        <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        id="email"
        name="email"
        label="Email"
        placeholder = "Enter Email"
        //autoFocus
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur = {formik.handleBlur}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
        />

        <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        id="password"
        name="password"
        label="Password"
        type="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur = {formik.handleBlur}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
        />
        <Button color="primary" variant="contained" fullWidth type="submit">
        SignIn
        </Button>
        <ToastContainer/>
        {/* {userInfo.message  ?  <p>Invalid Email or Password</p>
        : null} */}
    
        <Grid container>
            <Grid item xs>
                <Link href="#" variant="body2">
                Forgot password?
                </Link>
            </Grid>
            <Grid item>
                <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
                </Link>
            </Grid>
        </Grid>
          </form> 
    </div>
    </div>
  )
}
export default Login
