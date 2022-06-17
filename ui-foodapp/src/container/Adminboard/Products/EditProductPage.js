import React,{useState,useEffect} from 'react';
 import { Formik, Form, Field ,ErrorMessage} from 'formik';
 import * as Yup from 'yup';
 import {useLocation,useParams} from 'react-router-dom';
import Layout from '../../../Components/Layout/Layout'
import {useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
 
 const DisplayingErrorMessagesSchema = Yup.object().shape({
   name: Yup.string().required('Required'),
   description: Yup.string().required('Required'),
   status:Yup.string().required('Required'),
   price:Yup.number().required('Required'),
   category:Yup.string().required('Required'),
   image:Yup.mixed().required('Required'),
 });
 const status_options = [
  {name:'active'},
  {name:'inactive'}
  
]
 
 function EditProduct() {
    const[categoryName,setCategoryName]= useState([])
    const location = useLocation();
    const params = useParams();
    const dispatch = useDispatch()
    const nav = useNavigate();
    console.log(location.state);
    const image1 = location.state.image;
    console.log(params.id);

    useEffect(()=>{
        getCategoryName();        
    },[])

    const getCategoryName = async()=>{
        const res = await dispatch.productModel.getCategoryName()
        setCategoryName(res.data)
    }
    return(
      <div>
          <Layout />
          <div className = "addproduct">       
            <div className="editproduct_title">UPDATE PRODUCT</div>
            <Formik
              const initialValues = {{
                name:location.state.name,
                description:location.state.description,
                status:location.state.status,
                price:location.state.price,
                category:location.state.category.name,
                image:''
              }}
              validationSchema={DisplayingErrorMessagesSchema}
              onSubmit={async (values) => {
                const id = params.id
                const op = {data:values,id:id}
                console.log(values.image);
                await dispatch.productModel.updateProduct(op)
               // nav('/admin/products')

              }}
              >
              {({ values, errors, touched,setFieldValue }) => (
              <Form>
                  <div className="editproduct-container">
                    <Field name="name" className = "input"/>
                    <label name="name" className="placeholder"> Name</label>
                    <ErrorMessage component="p" name="name" />
                  </div>

                  <div className="editproduct-container">
                      <Field name="description" className = "input"/>
                      <label name="description" className="placeholder"> Description</label>
                      <ErrorMessage component="p" name="description" />
                  </div>

                  <div className="editproduct-container">
                    <Field as="select" name="category" className = "select">
                      <option value={values.category}>{values.category}</option>
                      {categoryName.map((item, index) =>(item.name === values.category) ? null :(<option value={item.name}>{item.name}</option>))} 
                    </Field>
                    <ErrorMessage component="p" name="category" />
                  </div>

                  <div className="editproduct-container">
                  <Field as="select" name="status" className = "select">
                      <option value={values.status} >{values.status}</option>
                      {status_options.map((item, index) =>(item.name === values.status) ? null :(<option value={item.name}>{item.name}</option>))} 
                    </Field>
                    <ErrorMessage component="p" name="status" />
                  </div>

                  <div className="editproduct-container">
                    <Field name="price" className="input" type="number" />
                    <label name="price" className="placeholder"> Price</label>
                    <ErrorMessage component="p" name="price" />
                  </div>
                  <div className="addproduct-container">
                  <input name="image" className = "input" type="file" onChange={(event) => {setFieldValue("image", event.currentTarget.files[0])}} />
                  <label name="file" className="placeholder"> file</label>
                  <ErrorMessage component="p" name="image"/> 
                  </div>
                  <div><img src={`http://localhost:9000/${image1}`} width="150" height="100"/></div>
                  <button type="sumbit" className="submit">Submit</button>
              </Form>
              )}
            </Formik>
          </div>
        </div>
     )
 }
 export default EditProduct