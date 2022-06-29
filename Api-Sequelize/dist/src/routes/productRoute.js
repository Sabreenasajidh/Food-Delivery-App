"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
const productController_1 = require("../controllers/productController");
const check_Auth_1 = require("../middleware/check_Auth");
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
router.get('/getproduct', check_Auth_1.checkAuth, productController_1.ListProduct);
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
exports.default = router;
