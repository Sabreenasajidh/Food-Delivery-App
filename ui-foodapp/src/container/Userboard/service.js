
import {api} from "../../helpers/axios";

 const addtoCart =  (item)=>{
       const result  =  api().post(`/api/user/cart`,item).then(value =>{
      return value         
      }).catch((err)=>{      
        return err
    })
    return result


}
 const getlist = ()=>{
  const result  =  api().get(`/api/user/cartlist`).then(value =>{
    return value         
    }).catch((err)=>{      
      return err
  })
  return result

}
const addOrder = (data)=>{
  const result  =  api().post(`/api/user/order/add`,data).then(value =>{
    return value         
    }).catch((err)=>{      
      return err
  })
  return result
}
const listOrder = ()=>{
  const result  =  api().get(`/api/user/order`).then(value =>{
    return value         
    }).catch((err)=>{      
      return err
  })
  return result
}
const updateCart = (data)=>{
  const result  =  api().put(`/api/user/cart/update`,data).then(value =>{
    return value         
    }).catch((err)=>{      
      return err
  })
  return result
}
export {addtoCart,getlist,addOrder,listOrder,updateCart}