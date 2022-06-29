import {api,newApi} from '../../../helpers/axios'
import axios from 'axios';

 const getProducts =  async (data)=>{

   // const result  =  await api().get(`/api/products/?${data}`).then(value =>{
    const result  =  await axios.get(`http://localhost:8000/api/product/getproduct?${data}`).then(value =>{
      //console.log(value.data,"_____________");
      return value        
      }).catch((err)=>{   
        console.log(err);   
        return err
    })
    return result


}
const getProductbyId = (id)=>{
  const result  =  api().get(`/api/products/${id}`).then(value =>{
    return value         
    }).catch((err)=>{      
      return err
  })
  return result
}
const addproducts =  (data)=>{
  const result  =  newApi().post('/api/products/create',data).then(value =>{
    return value         
    }).catch((err)=>{      
      return err
   })
  return result


}

 const getCategoryName = async()=>{
  const result  = await api().get('/api/products/getCategoryName').then(value =>{
    return value         
    }).catch((err)=>{      
      console.log(err);
      return err
   })
  return result


}
const updateProduct = (op)=>{
  console.log(op);
  const result  =  newApi().put(`/api/products/update/${op.id}`,op.data).then(value =>{
    //`/admin/productdetails/edit/${pid}`
    return value         
    }).catch((err)=>{      
      return err
   })
  return result

}
const deleteProduct = (id)=>{
  const result = api().delete(`/api/products/delete/${id}`).then(val=>{
    return val

  }).catch(e=>{
    return e
  })
  return result
}
export  {getProducts,getProductbyId,addproducts,getCategoryName,updateProduct,deleteProduct}