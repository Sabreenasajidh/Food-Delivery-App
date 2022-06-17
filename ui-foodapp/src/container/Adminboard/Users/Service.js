import {api} from "../../../helpers/axios";

 const getUserService =  (role)=>{
    const result  =  api().get(`/api/user`,{params:role}).then(value =>{
      return value         
      }).catch((err)=>{      
        return err
    })
    return result


}
const addUserService =  (data)=>{

  const result  =  api().post(`/api/user/create`,data).then(value =>{
    console.log(value);
    return value 
      
    }).catch((err)=>{      
      return err

  })
  return result


}
const getRoleName = ()=>{
  const result = api().get(`/api/user/getrole`).then(value =>{
    console.log(value);
    return value 
      
    }).catch((err)=>{      
      return err

  })
  return result
}
const updateUser = (op)=>{
  console.log(op);
  const result  =  api().put(`/api/user/update/${op.id}`,op.data).then(value =>{
    //`/admin/productdetails/edit/${pid}`
    return value         
    }).catch((err)=>{      
      return err
   })
  return result

}
const deleteUser = (id)=>{
  const result = api().delete(`/api/user/delete/${id}`).then(val=>{
    return val

  }).catch(e=>{
    return e
  })
  return result
}

export  {getUserService,addUserService,getRoleName,updateUser,deleteUser}