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
                  if(response.data){
                    this.USERDATA(response.data);
                    return response.data
                  }
                  else{
                      toaster.errorToast(response.response.data.error)
                  }
            }
            catch (e) {
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
        }
    }
}
export default login