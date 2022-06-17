import Layout from '../../../Components/Layout/Layout'
import React,{useState,useEffect} from 'react'
import { Formik, Form, Field,resetForm } from 'formik';
import * as Yup from 'yup';
import './User.css'
import {useDispatch} from 'react-redux';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import validate from './newUserValidate'
import {useNavigate } from 'react-router';
//import {reset} from 'redux-form';

const DisplayingErrorMessagesSchema = Yup.object().shape({
  first_name: Yup.string().required('Required'),
  last_name: Yup.string().required('Required'),
  email: Yup.string().required('Required'),
  phone_number: Yup.number().required('Required'),
  role_id: Yup.string().required('Required'),
});

function AddUser() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [role,setRole] = useState([])
  
  useEffect(()=>{
    getRole()
  },[])
  const getRole = async()=>{
    const op  = await dispatch.userModel.getRoleName()
    setRole(op.data)
  }
  return (
    <div>
        <Layout />
        <div className = "addUser">
            <div className="addUser_title">Add User!!!</div>

            <Formik
                const initialValues = {{
                      first_name:'',
                      last_name:'',
                      role_id: '',
                      email:'',
                      phone_number:''   
                }}
                validationSchema={DisplayingErrorMessagesSchema}

                onSubmit={async (values,{resetForm}) => {
                  console.log(values);
                    const randomPassword =Math.random().toString(36).slice(-8);
                    values.password = randomPassword
                    const det = await dispatch.userModel.addUser(values)
                    console.log(det);
                    if(det){
                      resetForm({values: ''})
                      navigate('/admin/users')
                    }
                }}
                validateOnChange={false}
                validateOnBlur={false}
                >
                {({ values, errors, touched }) => (
                  <Form>
                      <div className="addUser-container">
                        <Field name="first_name" className = "input"/>
                        <label name="first" className="placeholder"> First Name</label>
                        {touched.first_name && errors.first_name && <p>{errors.first_name}</p>}
                      </div>

                      <div className="addUser-container">
                          <Field name="last_name" className = "input"/>
                          <label name="last_name" className="placeholder"> Last Name</label>
                          {touched.last_name && errors.last_name && <p>{errors.last_name}</p>}
                      </div>
                      <div className="addUser-container">
                          <Field name="email" className = "input"/>
                          <label name="email" className="placeholder"> Email</label>
                          {touched.email && errors.email && <p>{errors.email}</p>}
                      </div>

                      <div className="addUser-container">
                        <Field as="select" name="role_id" className = "input">
                          <option>Select</option>
                          {role.map((item, index) =><option value={item.id}>{item.role_name.charAt(0).toUpperCase() + item.role_name.slice(1).toLowerCase()}</option>)} 
                        </Field>
                        <label name="role_id" className="placeholder"> Role</label>
                        {touched.role_id && errors.role_id && <p>{errors.role_id}</p>}
                      </div>

                      <div className="addUser-container">
                        <Field name="phone_number" className="input" type="number" />
                        <label name="phone_number" className="placeholder"> Phone Number</label>
                        {touched.phone_number && errors.phone_number && <p>{errors.phone_number}</p>}
                      </div>
                      <button type="sumbit" className="submit">Submit</button>
                  </Form>
                )}
          </Formik>
          <ToastContainer />
        </div>
    </div>
  )
}

export default AddUser