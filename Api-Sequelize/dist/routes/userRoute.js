"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
const userController_js_1 = __importDefault(require("../controllers/userController.js"));
const check_Auth_js_1 = __importDefault(require("../middleware/check_Auth.js"));
router.post('/signup', userController_js_1.default.signUp);
router.post('/login', userController_js_1.default.login);
router.get('/', check_Auth_js_1.default, userController_js_1.default.listUsers); //list all users #admin
router.post('/create', check_Auth_js_1.default, userController_js_1.default.addUser); //add new user by admin
router.put('/update/:id', check_Auth_js_1.default, userController_js_1.default.updateUser); // edit single user by admin
router.delete('/delete/:id', check_Auth_js_1.default, userController_js_1.default.deleteUser); //delete user by admin
router.get('/getrole', check_Auth_js_1.default, userController_js_1.default.getRole);
router.post('/cart', check_Auth_js_1.default, userController_js_1.default.addtoCart);
router.get('/cartlist', check_Auth_js_1.default, userController_js_1.default.listcartItems);
router.put('/cart/update', check_Auth_js_1.default, userController_js_1.default.updateCart);
router.post('/order/add', check_Auth_js_1.default, userController_js_1.default.addOrder);
router.get('/order', check_Auth_js_1.default, userController_js_1.default.listOrder);
router.post('/order/delete', check_Auth_js_1.default, userController_js_1.default.deleteOrder);
exports.default = router;
