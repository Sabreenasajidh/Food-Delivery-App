import express from 'express'
var router  = express.Router();

import Product from '../controllers/ProductController.js'
import  authToken from '../middleware/check_Auth.js'
import multer from 'multer'
import path from 'path'

let storage = multer.diskStorage({
    destination: 'public/uploads',
    filename: (req, file, cb) => {
		console.log(req);
	   const ext  = path.parse(file.originalname).ext;
	   const name = path.parse(file.originalname).name;
	   cb(null, `${name}-${Date.now()}${ext}`);
	},
});
let upload = multer({
    storage: storage
})

router.get('/',authToken,Product.ListProduct) //list all product
router.post('/create',authToken,upload.single('image'),Product.AddProduct) //create new product
router.get('/getCategoryName',authToken,Product.getCategoryName) //get categorynames
router.put('/update/:id',authToken,upload.single('image'),Product.updateProducts) //update product
router.delete('/delete/:id',authToken,Product.deleteProduct) // delete product
router.get('/:id',authToken,Product.getProductbyId) //get single product details

export default router;