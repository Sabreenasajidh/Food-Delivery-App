import express from 'express'
var router  = express.Router();

import Product from '../controllers/ProductController.js'
import  authToken from '../middleware/check_Auth.js'
import multer from 'multer'
import path from 'path'

let storage = multer.diskStorage({
    destination: 'public/uploads',
    filename: (req, file, cb) => {
	   const ext  = path.parse(file.originalname).ext;
	   const name = path.parse(file.originalname).name;
	   cb(null, `${name}-${Date.now()}${ext}`);
	},
});
let upload = multer({
    storage: storage
})

router.get('/',authToken,Product.ListProduct)
router.post('/create',authToken,upload.single('image'),Product.AddProduct)
router.get('/getCategoryName',authToken,Product.getCategoryName)
router.put('/update/:id',authToken,upload.single('image'),Product.updateProducts)
router.delete('/delete/:id',authToken,Product.deleteProduct)
router.get('/:id',authToken,Product.getProductbyId)

export default router;