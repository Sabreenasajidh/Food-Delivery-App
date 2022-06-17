import React,{useState,useEffect} from 'react';
 import { Formik, Form, Field } from 'formik';
 import * as Yup from 'yup';
 import {useLocation,useParams} from 'react-router-dom';
import Layout from '../../../Components/Layout/Layout'
import {useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
 
 const DisplayingErrorMessagesSchema = Yup.object().shape({
   first_name: Yup.string().required('Required'),
   last_name: Yup.string().required('Required'),
   email: Yup.string().required('Required'),
   phone_number: Yup.number().required('Required'),
 });
 const status_options = [
  {name:'active'},
  {name:'inactive'}
]
 
 function EditUser() {
   const[roleName,setRoleName]= useState([])
   
   const location = useLocation();
   const params = useParams();
   const dispatch = useDispatch()
   const nav = useNavigate();
   console.log(location.state);
   console.log(params.id);

  useEffect(()=>{
      getRoleName();        
  },[])

  const getRoleName = async()=>{
      const res = await dispatch.userModel.getRoleName()
      console.log(res);
      setRoleName(res.data)
  }
     return(
   <div>
       <Layout />
        <div className = "edituser">       
        <div className="edituser_title">UPDATE USER!!!</div>
     <Formik
      const initialValues = {{
        first_name:location.state.first_name,
        last_name:location.state.last_name,
        status:location.state.status,
        phone_number:location.state.phone_number,
        email:location.state.email,
        role:location.state.role
      }}
       validationSchema={DisplayingErrorMessagesSchema}
       onSubmit={async (values) => {
        const id = params.id
        const op = {data:values,id:id}
        console.log(values);
        await dispatch.userModel.updateUser(op)
        nav('/admin/users')

      }}
     >
       {({ values, errors, touched }) => (
         <Form>
            <div className="edituser-container">
              <Field name="first_name" className = "input"/>
              <label name="first" className="placeholder"> First Name</label>
              {touched.first_name && errors.first_name && <div>{errors.first_name}</div>}
            </div>

            <div className="edituser-container">
                <Field name="last_name" className = "input"/>
                <label name="last_name" className="placeholder"> Last Name</label>
                {touched.last_name && errors.last_name && <div>{errors.last_name}</div>}
            </div>

            <div className="edituser-container">
              <Field as="select" name="role" className = "select">
                <option value={values.role}>{values.role}</option>
                {roleName.map((item, index) =>(item.role_name === values.role) ? null :(<option value={item.id}>{item.role_name}</option>))} 
              </Field>
            </div>

            <div className="edituser-container">
            <Field as="select" name="status" className = "select">
                <option value={values.status} >{values.status}</option>
                {status_options.map((item, index) =>(item.name === values.status) ? null :(<option value={item.name}>{item.name}</option>))} 
              </Field>
            </div>

            <div className="edituser-container">
              <Field name="phone_number" className="input" type="number" />
              <label name="phone_number" className="placeholder"> Phone Number</label>
              {touched.phone_number && errors.phone_number && <div>{errors.phone_number}</div>}
            </div>
            <button type="sumbit" className="submit">Submit</button>
         </Form>
       )}
     </Formik>
   </div>
   </div>
     )
 }
 export default EditUser