import  * as service from './Service';
import toaster from '../../../helpers/toaster'

const  users = {
    state: {users:[]}, // initial state
    reducers: {
        // handle state changes with pure functions
        USERS: (state, data) => {
            
            return {
                ...data
            };
        },
    },
    effects: {
        async getUsers(role) {

            try {
                 let response =  await service.getUserService(role);
                 console.log(response);
                 if(response.data){
                    this.USERS(response.data);
                    return response.data
                  }
                  else{
                      toaster.errorToast(response.response.data.error)
                  }
            }
            catch (e) {
                console.log(e)
                toaster.errorToast(e)
            }
        },
        async addUser(value) {
            try {
                let response =  await service.addUserService(value);
                 if(response.data){
                     toaster.successToast(' Account created Successfully')
                    return response
                
                 }
                 else{
                    toaster.errorToast(response.response.data.error)
                }
           }
           catch (e) {
               console.log(e)
               toaster.errorToast(e)
           }

        },
        async getRoleName(){
            try{
                const result = await service.getRoleName()
                console.log(result);
                return result.data
            }catch(e){
                console.log(e);
            }
        },
        async updateUser(values){
            try{
                const result = await service.updateUser(values);
                return result
            }
            catch (e) {
                console.log(e)
            }
        },
        async deleteUser(id){
            try{
               const result = await service.deleteUser(id)
                return result
            }catch(e){
                console.log(e);
            }
        }
       
    }
}
export default users