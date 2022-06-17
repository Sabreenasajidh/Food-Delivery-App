import express from 'express'
var router  = express.Router();

import userController from '../controllers/userController.js'
import  authToken from '../middleware/check_Auth.js'

router.post('/signup',userController.signUp)
router.post('/login',userController.login)
router.get('/',authToken,userController.listUsers)
router.post('/create',authToken,userController.addUser)
router.put('/update/:id',authToken,userController.updateUser)
router.get('/getrole',authToken,userController.getRole)
router.delete('/delete/:id',authToken,userController.deleteUser)
router.post('/cart',authToken,userController.addtoCart)
router.get('/cartlist',authToken,userController.listcartItems)
router.put('/cart/update',authToken,userController.updateCart)
router.post('/order/add',authToken,userController.addOrder)
router.get('/order',authToken,userController.listOrder)
router.post('/order/delete',authToken,userController.deleteOrder)


export default router;