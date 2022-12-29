import  * as service from './Service';
import toaster from '../../helpers/toaster'
import cookie from '../../helpers/cookie';

const  login = {
    state: { user : cookie.getCookie('userIn')?cookie.getCookie('userIn'):{}},//initial state
    reducers: {
        // handle state changes with pure functions
        USERDATA: (state, data) => {
            cookie.setCookie('userIn',data)
            return {
                ...state, user:data
            }
        },
    },
    effects: {
        async userLogin(value) {

            try {
                  let response =  await service.loginService(value)
                  console.log(response);
                  if(response.data){
                      this.USERDATA(response.data);
                      return response.data
                  }
                  else{
                      toaster.errorToast(response.response.data.error)
                    return response
                  }
            }
            catch (e) {
                console.log(e);
                toaster.errorToast(e)

            }
        },
        async userSignUp(value) {

            try {
                 let response =  await service.signupServive(value);
                 if(response.data){
                    this.USERDATA(response.data);
                    toaster.successToast('Account created Successfully')
                  }
                  else{
                    toaster.errorToast(response.response.data.error)
                  }
            }
            catch (e) {
                console.log(e)
            }
        },
        async forgetpassword(value){
            console.log(value);
            let response =  await service.forgetPassword(value);
            console.log(response);
            // if(response.data){
                toaster.successToast(response.data)
            // }
            // else{
            //     toaster.errorToast(response.response.data.error)
            //   }
        },
        async resetpassword(value){
            console.log(value);
            let response =  await service.resetPassword(value);
            console.log(response);
            // // if(response.data){
            //     toaster.successToast(response.data)
            // }
            // else{
            //     toaster.errorToast(response.response.data.error)
            //   }
        }
    }
}
export default login