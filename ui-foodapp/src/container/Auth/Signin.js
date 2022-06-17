
import React from 'react';
import { useFormik } from 'formik';
import {useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { ToastContainer } from 'react-toastify';
import Cookies from '../../helpers/cookie';

import validate from './SigninValidation'
const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        },
}));        


export default function SignIn() {
    //let userInfo = useSelector((state) => state.authModel.user);
    //console.log(userInfo);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onSubmit =async (value)=>{
       const userInfo=await dispatch.authModel.userLogin(value) 
       console.log(userInfo);
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
    const classes = useStyles();
    return (
    <div className="signin-div">
         <Container component="main" maxWidth="xs">
       <CssBaseline />
       <div className={classes.paper}>
         <Avatar className={classes.avatar}>
           <LockOutlinedIcon />
         </Avatar>
         <Typography component="h1" variant="h5">
           Sign in
         </Typography>
         </div>
        <form onSubmit={formik.handleSubmit} className={classes.form}>
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
        <Button color="primary" variant="contained" fullWidth type="submit"  className={classes.submit}>
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


</Container>
<ToastContainer/>
</div>
);
};
    
