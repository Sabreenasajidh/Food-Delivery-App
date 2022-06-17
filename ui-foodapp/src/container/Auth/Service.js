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
export {loginService,signupServive}

