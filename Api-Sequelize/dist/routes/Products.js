"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
const ProductController_js_1 = __importDefault(require("../controllers/ProductController.js"));
const check_Auth_js_1 = __importDefault(require("../middleware/check_Auth.js"));
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
router.get('/', check_Auth_js_1.default, ProductController_js_1.default.ListProduct); //list all product
router.post('/create', check_Auth_js_1.default, upload.single('image'), ProductController_js_1.default.AddProduct); //create new product
router.get('/getCategoryName', check_Auth_js_1.default, ProductController_js_1.default.getCategoryName); //get categorynames
router.put('/update/:id', check_Auth_js_1.default, upload.single('image'), ProductController_js_1.default.updateProducts); //update product
router.delete('/delete/:id', check_Auth_js_1.default, ProductController_js_1.default.deleteProduct); // delete product
router.get('/:id', check_Auth_js_1.default, ProductController_js_1.default.getProductbyId); //get single product details
exports.default = router;
