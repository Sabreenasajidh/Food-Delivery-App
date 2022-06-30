
import {api} from "../../helpers/axios";

 const addtoCart =  (item)=>{
       const result  =  api().post(`/api/user/cart/create`,item).then(value =>{
      return value         
      }).catch((err)=>{      
        return err
    })
    return result


}
 const getlist = ()=>{
  const result  =  api().get(`/api/user/cart`).then(value =>{
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
  console.log(data);
  const result  =  api().put(`/api/user/cart/update`,data).then(value =>{
    return value         
    }).catch((err)=>{      
      return err
  })
  return result
}
const deleteOrder = (data)=>{
  console.log(data);
  let param = new URLSearchParams(data).toString();

console.log(param);
  const result  =  api().delete(`/api/user/cart/delete/?${param}`).then(value =>{
    console.log(value);
    return value         
    }).catch((err)=>{      
      return err
  })
  return result

}
export {addtoCart,getlist,addOrder,listOrder,updateCart,deleteOrder}