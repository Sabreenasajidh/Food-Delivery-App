import product from "./product/index.js"
import user from './user/index.js'
import cart from './cart/index.js'
import order from './order/index.js'
import auth from './auth/index.js'
const def = {
    ...auth,
    ...product,
    ...user,
    ...cart,
    ...order
}
export default {definitions:def}