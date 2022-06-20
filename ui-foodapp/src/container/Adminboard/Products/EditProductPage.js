import React,{useState,useEffect} from 'react';
 import { Formik, Form, Field ,ErrorMessage} from 'formik';
 import * as Yup from 'yup';
 import {useLocation,useParams} from 'react-router-dom';
import Layout from '../../../Components/Layout/Layout'
import {useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { useDropzone } from "react-dropzone";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
 
 const DisplayingErrorMessagesSchema = Yup.object().shape({
   name: Yup.string().required('Required'),
   description: Yup.string().required('Required'),
   status:Yup.string().required('Required'),
   price:Yup.number().required('Required'),
   category:Yup.string().required('Required'),
  //  image:Yup.mixed().required('Required'),
 });
 const status_options = [
  {name:'active'},
  {name:'inactive'}
  
]
 
 function EditProduct() {
    const[categoryName,setCategoryName]= useState([])
    const [products,setProducts] = useState()
    const location = useLocation();
    const params = useParams();
    const dispatch = useDispatch()
    const nav = useNavigate();

    useEffect(()=>{
        getCategoryName();
        getProducts(params.id)           
    },[])

    const getCategoryName = async()=>{
        const res = await dispatch.productModel.getCategoryName()
        setCategoryName(res.data)
    }
    const getProducts = async(id)=>{
            const prod = await dispatch.productModel.getProductbyId(id)
            setProducts(prod.data)
          }
    return(
      
      <div>
          <Layout />
            {!products?null :(
              
              <div className = "addproduct">
            <div className="editproduct_title">UPDATE PRODUCT</div>
            <Formik
              const initialValues = {{
                name:products.data.name,
                //location.state.name,
                description:products.data.description,
                status:products.data.status,
                price:products.data.price,
                category:products.data.category.name,
                 image: null
              }}
              validationSchema={DisplayingErrorMessagesSchema}
              onSubmit={async (values) => {
                console.log(values);

                const id = params.id
                const op = {data:values,id:id}
                const res = await dispatch.productModel.updateProduct(op)
                if(res.data){

                  nav('/admin/products')
                }

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
                  <div className="editproduct-container">
                  <UploadComponent setFieldValue={setFieldValue} />
                  {values.image?(<li>{`File:${values.image.name}`}</li>):null}
                  </div>
                  <ErrorMessage component="p" name="image"/> 
                  {values.image? null :<div><img src={`http://localhost:9000/${products.data.image}`} width="150" height="100"/></div>}
                  
                  <button type="sumbit" className="submit">Submit</button>
              </Form>
              )}
            </Formik>
          </div>
            )}       
        </div>
     )
 }
 export default EditProduct
 
 const UploadComponent = props => {
  const { setFieldValue } = props;
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/jpeg': [],
      'image/png': []
    },
    maxFiles:1,
  onDrop: acceptedFiles => {
    setFieldValue("image", acceptedFiles[0]);
  }
  });
  return (
  <div>
    {}
    <div {...getRootProps({ className: "dropzone" })}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...<AddAPhotoIcon/> </p>
      ) : (
        <div className ="imgupload" >Upload file <AddAPhotoIcon/></div>
      )}
    </div>
  </div>
  );
}