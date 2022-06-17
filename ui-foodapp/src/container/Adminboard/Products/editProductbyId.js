// import React,{useState,useEffect} from 'react';
//  import { Formik, Form, Field } from 'formik';
//  import * as Yup from 'yup';
//  import {useLocation,useParams} from 'react-router-dom';
// import Layout from '../../../Components/Layout/Layout'
// import {useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router';
 
 
//  const status_options = [
//   {name:'active'},
//   {name:'inactive'}
  
// ]
 
//  function EditProduct() {
//    useEffect(()=>{
//      getProducts(params.id)       
//        getCategoryName(); 
//    },[])
//    const [product,setProduct] = useState({})
//     const[categoryName,setCategoryName]= useState([])
//     const params = useParams();
//     const dispatch = useDispatch()
//     const nav = useNavigate();


//     const getCategoryName = async()=>{
//         const res = await dispatch.productModel.getCategoryName()
//         setCategoryName(res.data)
//     }
//     const getProducts = async(id)=>{
//       const prod = await dispatch.productModel.getProductbyId(id)
//       setProduct(prod.data)
//     }
//     const DisplayingErrorMessagesSchema = Yup.object().shape({
//       name: Yup.string().required('Required'),
//       description: Yup.string().required('Required'),
//     });
//     return(
//       <div>
//           <Layout />
//           <div className = "addproduct">       
//             <div className="editproduct_title">UPDATE PRODUCT</div>
//             <Formik
//               const initialValues = {{
//                 name:product.data.name,
//                 description:product.data.description,
//                 status:product.data.status,
//                 price:product.data.price,
//                 category:product.data.category.name
//               }}
//               validationSchema={DisplayingErrorMessagesSchema}
//               onSubmit={async (values) => {
//                 const id = params.id
//                 const op = {data:values,id:id}
//                 await dispatch.productModel.updateProduct(op)
//                 nav('/admin/products')

//               }}
//               >
//               {({ values, errors, touched }) => (
//               <Form>
//                   <div className="editproduct-container">
//                     <Field name="name" className = "input"/>
//                     <label name="name" className="placeholder"> Name</label>
//                     {touched.name && errors.name && <div>{errors.name}</div>}
//                   </div>

//                   <div className="editproduct-container">
//                       <Field name="description" className = "input"/>
//                       <label name="description" className="placeholder"> Description</label>
//                       {touched.description && errors.description && <div>{errors.description}</div>}
//                   </div>

//                   <div className="editproduct-container">
//                     <Field as="select" name="category" className = "input">
//                       <option value={values.category}>{values.category}</option>
//                       {categoryName.map((item, index) =>(item.name === values.category) ? null :(<option value={item.name}>{item.name}</option>))} 
//                     </Field>
//                     <label name="category" className="placeholder"> Category</label>
//                   </div>

//                   <div className="editproduct-container">
//                   <Field as="select" name="status" className = "input">
//                       <option value={values.status} >{values.status}</option>
//                       {status_options.map((item, index) =>(item.name === values.status) ? null :(<option value={item.name}>{item.name}</option>))} 
//                     </Field>
//                     <label name="status" className="placeholder"> Status</label>
//                   </div>
//                   <div className="addproduct-container">
//                     <input id="file" className = "input" name="image" type="file" onChange={(event) => {setFieldValue("image", event.currentTarget.files[0])}} />
//                     <label name="file" className="placeholder"> file</label>
//                     <ErrorMessage component="p" name="image"/> 
//                   </div>

//                   <div className="editproduct-container">
//                     <Field name="price" className="input" type="number" />
//                     <label name="price" className="placeholder"> Price</label>
//                     {touched.price && errors.price && <div>{errors.price}</div>}
//                   </div>
//                   <button type="sumbit" className="submit">Submit</button>
//               </Form>
//               )}
//             </Formik>
//           </div>
//         </div>
//      )
//  }
//  export default EditProduct