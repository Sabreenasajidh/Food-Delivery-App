import product from './product/index.js'
import user from './user/index.js'
import cart from './cart/index.js'
import order from './order/index.js'
const data = {
    ...product,
    ...user,
    ...cart,
    ...order
}
export default {paths:data}

//export default {paths:user}

