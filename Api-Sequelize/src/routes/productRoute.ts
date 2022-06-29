import express, { Express, Request, Response } from 'express';
var router  = express.Router();

import {ListProduct} from '../controllers/productController'
import {checkAuth} from '../middleware/check_Auth';
// import multer from 'multer'
// import path from 'path'

// let storage = multer.diskStorage({
//     destination: 'public/uploads',
//     filename: (req, file, cb) => {
// 		//console.log(req);
// 	   const ext  = path.parse(file.originalname).ext;
// 	   const name = path.parse(file.originalname).name;
// 	   cb(null, `${name}-${Date.now()}${ext}`);
// 	},
// });
// let upload = multer({
//     storage: storage
// })


router.get('/getproduct',checkAuth,ListProduct);
//router.get('/create',checkAuth,AddProduct);
 


























 //import  {authToken} from '../../middleware/c'
// import multer from 'multer'
// import path from 'path'

// let storage = multer.diskStorage({
//     destination: 'public/uploads',
//     filename: (req, file, cb) => {
// 		//console.log(req);
// 	   const ext  = path.parse(file.originalname).ext;
// 	   const name = path.parse(file.originalname).name;
// 	   cb(null, `${name}-${Date.now()}${ext}`);
// 	},
// });
// let upload = multer({
//     storage: storage
// })

// router.post('/create',authToken,upload.single('image'),Product.AddProduct)
// router.get('/getCategoryName',authToken,Product.getCategoryName)
// router.put('/update/:id',authToken,upload.single('image'),Product.updateProducts)
// router.delete('/delete/:id',authToken,Product.deleteProduct)
// router.get('/:id',authToken,Product.getProductbyId)

export default router;