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
        async addtoCart(item) {

            try {
                let response =  await service.addtoCart(item);
                    console.log(response);
                 if(response.data){
                     toaster.successToast(response.data.data)

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
        }
        }
}
export default cart