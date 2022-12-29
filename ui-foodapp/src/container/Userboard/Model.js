import  * as service from './service';
import toaster from '../../helpers/toaster';

const  cart = {
    state: {cart:{}}, // initial state
    reducers: {
        // handle state changes with pure functions
        CART: (state, data) => {
            
            return {
               cart:data
            };
        },
    },
    effects: {
        async addtoCart(data) {

            try {
                console.log(data);
                let response =  await service.addtoCart(data);
                    
                 if(response.data){
                     toaster.successToast(response.data.data)
                     return response

                 }
            //         this.PRODUCTS(response.data);
            //         return response.data
                //   }
                  else{
                      toaster.errorToast(response.response.data.data)
                  }
            }
            catch (e) {
                console.log(e);
                toaster.errorToast(e)
            }
        },
        async updateCart (data){

            try{
                let resp = await service.updateCart(data)
                console.log(resp);
                if(resp.data){

                    toaster.successToast('Cart Updated Successfully')
                }
                return resp
            }catch(e){
                console.log(e);
            }
        },
        async getlist (){
            try{
                let resp = await service.getlist()
                console.log(resp);
                return resp
            }catch(e){
                console.log(e);
            }
        }, async addorder (data){
            console.log(data);
            let resp = await service.addOrder(data)
                console.log(resp);
                return resp

        },
        async listOrder(){
            let resp = await service.listOrder()
            return resp;
        },
        async deleteOrder (data){
            let resp = await service.deleteOrder(data)
            return resp;

        },
        async getCount() {

            try {
                
                let response =  await service.getCount();
                this.CART(response.data);
                 if(response.data){ 
                     return response.data
                 }
            }
            catch (e) {
                console.log(e);
                toaster.errorToast(e)
            }
        },
        }
}
export default cart