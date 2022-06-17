
import Layout from '../../../Components/Layout/Layout'
import React,{useEffect,useState} from 'react'
import { Formik, Form, Field,resetForm,ErrorMessage } from 'formik';
 import * as Yup from 'yup';
import './Product.css'
import {useDispatch} from 'react-redux';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import {useNavigate } from 'react-router';

const DisplayingErrorMessagesSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  price: Yup.number().required('Required'),
  category_id: Yup.string().required('Required'),
  image:Yup.mixed().required('Required')
});




function AddProducts() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const[selectedFile,setSelectedFile] = useState(null)
 
    const [categoryName,setCategoryName] = useState([])
    useEffect(()=>{
      getCategoryName()
    },[])
    const getCategoryName = async()=>{
      const category = await dispatch.productModel.getCategoryName()
      setCategoryName(category.data)
    }
    // const onFileChange = event => {
    //   console.log(event.target.files[0].name);
    
    //   // Update the state
    //   setSelectedFile(event.target.files[0].name );
    
    // };


  return (
    <div>
      <Layout/>
    <div className = "addproduct">
                
        <div className="addproduct_title">ADD PRODUCT</div>
        <Formik
          const initialValues = {{
            name:'',
            description:'',
            price:'',
            category_id:'',
             image: null 
          }}
          validationSchema={DisplayingErrorMessagesSchema}
          onSubmit={
            async (values,{resetForm}) => {
              console.log(values);
             const det = await dispatch.productModel.addproduct(values)      
             if(det){
              resetForm({values: ''})
              navigate('/admin/products')
              
            }
            

          }}
          validateOnChange={false}
          validateOnBlur={false}
        >
        {({ values, errors, touched , setFieldValue}) => (
        <Form>
          <div className="addproduct-container">
            <Field name="name" className = "input"/>
            <label name="name" className="placeholder"> Name</label>
            {/* {touched.name && errors.name && <p>{errors.name}</p>} */}
            <ErrorMessage component="p" name="name" />
          </div>

          <div className="addproduct-container">

          <input id="file" className = "input" name="image" type="file" onChange={(event) => {setFieldValue("image", event.currentTarget.files[0])}} />
          <label name="file" className="placeholder"> file</label>
          <ErrorMessage component="p" name="image"/> 
          </div>

          <div className="addproduct-container">
              <Field name="description" className = "input"/>
              <label name="description" className="placeholder"> Description</label>
              <ErrorMessage component="p" name="description" />
          </div>

          <div className="addproduct-container">
            <Field as="select" name="category_id" className = "input">
              <option>Select</option>
              {categoryName.map((item, index) =>
              <option value={item.id}>{item.name.charAt(0).toUpperCase() + item.name.slice(1).toLowerCase()}</option>
              )} 
            </Field>
            <label name="category" className="placeholder"> Category</label>
            <ErrorMessage component="p" name="category_id" />
          </div>

          <div className="addproduct-container">
            <Field name="price" className="input" type="number" />
            <label name="price" className="placeholder"> Price</label>
            <ErrorMessage component="p" name="price"/>
          </div>
          <button type="sumbit" className="submit">Submit</button>
        </Form>
       )}
     </Formik>
     <ToastContainer/>
    </div>
    </div>
  );
}

export default AddProducts