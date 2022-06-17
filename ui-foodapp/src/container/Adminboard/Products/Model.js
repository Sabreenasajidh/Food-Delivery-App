import  * as service from './Service';
import toaster from '../../../helpers/toaster';

const  users = {
    state: {products:{}}, // initial state
    reducers: {
        // handle state changes with pure functions
        PRODUCTS: (state, data) => {
            
            return {
               products:data
            };
        },
    },
    effects: {
        async getProducts(data) {

            try {
                 let response =  await service.getProducts(data);
                 if(response.data){
                    this.PRODUCTS(response.data);
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
        async getProductbyId (id){
            console.log(id);
            let response =  await service.getProductbyId(id);
            console.log(response);
            return response
        },
        async addproduct(value) {

            try {
                console.log(value);
                const response = await service.addproducts(value);
                return response
                 if(response.data){
                     toaster.successToast(response.data.message)        
                   }
                  else{
                    toaster.errorToast(response.data.message)
                  }
            }
            catch (e) {
                toaster.errorToast(e)
            }
        },
        async getCategoryName() {
            try{
                const response = await service.getCategoryName();
                // this.PRODUCTS(response.data)
                return response.data

            }catch(e){

            }
        },
        async updateProduct(values){
            try{
                const result = await service.updateProduct(values);
                return result
            }
            catch (e) {
                console.log(e)
            }
        },
        async deleteProduct(id){
            try{
                const result = await service.deleteProduct(id)
                return result
            }catch(e){
                console.log(e);
            }
        }

    }
}
export default users