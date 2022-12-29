import express from 'express'
var router  = express.Router();

import userController from '../controllers/userController.js'
import  authToken from '../middleware/check_Auth.js'

router.post('/signup',userController.signUp)
router.post('/login',userController.login)
router.post('/forgetpassword',userController.forgetPassword)
router.post('/resetpassword',userController.resetPassword)


router.get('/',authToken,userController.listUsers) //list all users #admin
router.post('/create',authToken,userController.addUser) //add new user by admin
router.put('/update/:id',authToken,userController.updateUser) // edit single user by admin
router.delete('/delete/:id',authToken,userController.deleteUser) //delete user by admin


router.get('/getrole',authToken,userController.getRole) 


router.post('/cart/create',authToken,userController.addorUpdateCart)
router.get('/cart',authToken,userController.listcartItems)
router.put('/cart/update',authToken,userController.addorUpdateCart)
router.delete('/cart/delete',authToken,userController.deleteCart)
router.get('/cart/count',authToken,userController.getCount)


router.post('/order/add',authToken,userController.addOrder)
router.get('/order',authToken,userController.listOrder)


export default router;