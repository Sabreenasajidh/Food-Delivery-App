import {api} from '../../helpers/axios'


 const loginService =  async (data)=>{
    const result  =  await api().post(`/api/user/login`,data).then(value =>{
        console.log(value);
        return value     
    }).catch((err)=>{      
        return err
    })
     return result
}

const signupServive =  async (data)=>{

const result  =  api().post(`/api/user/signup`,data).then(value =>{
    return value 
}).catch((err)=>{
     return err
})
return result
}

const forgetPassword =  async (data)=>{

    const result  =  api().post(`/api/user/forgetpassword`,data).then(value =>{
        return value.data 
    }).catch((err)=>{
         return err.response.data
    })
    return result
}

const resetPassword =  async (data)=>{

    const result  =  api().post(`/api/user/resetpassword`,data).then(value =>{
        return value.data 
    }).catch((err)=>{
         return err.response.data
    })
    return result
    }
export {loginService,signupServive,forgetPassword,resetPassword}

