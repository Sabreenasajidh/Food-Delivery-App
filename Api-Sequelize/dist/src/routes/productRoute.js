"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
const productController_1 = require("../controllers/productController");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
let storage = multer_1.default.diskStorage({
    destination: 'public/uploads',
    filename: (req, file, cb) => {
        //console.log(req);
        const ext = path_1.default.parse(file.originalname).ext;
        const name = path_1.default.parse(file.originalname).name;
        cb(null, `${name}-${Date.now()}${ext}`);
    },
});
let upload = (0, multer_1.default)({
    storage: storage
});
router.get('/getproduct', productController_1.ListProduct);
router.post('/create', upload.single('image'), productController_1.AddProduct);
router.put('/edit/:id', productController_1.updateProduct);
router.delete('/delete/:id', productController_1.deleteProduct);
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
