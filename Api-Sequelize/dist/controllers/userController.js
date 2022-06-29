"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_js_1 = __importDefault(require("../models/userModel.js"));
const roleModel_js_1 = __importDefault(require("../models/roleModel.js"));
const Cart_js_1 = __importDefault(require("../models/Cart.js"));
const Orders_js_1 = __importDefault(require("../models/Orders.js"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const dbConfig_js_1 = __importDefault(require("../config/dbConfig.js"));
const sequelize_1 = __importDefault(require("sequelize"));
const Product_js_1 = __importDefault(require("../models/Product.js"));
const Op = sequelize_1.default.Op;
let mailTransporter = nodemailer_1.default.createTransport({ service: 'gmail',
    auth: {
        user: dbConfig_js_1.default.AUTH_USER,
        pass: dbConfig_js_1.default.AUTH_PASS
    } });
function generateAccessToken(email, id) {
    return jsonwebtoken_1.default.sign({
        email: email,
        id: id
    }, dbConfig_js_1.default.JWT_TOKEN);
    //, { expiresIn: '1800s' }
}
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        console.log(body);
        const reqData = ['first_name', 'last_name', 'email', 'phone_number', 'password', 'confirm_password'];
        reqData.forEach(element => {
            if (!body[element] || body[element] === null)
                throw { message: 'Field Missing ' + element };
        });
        if (body.password !== body.confirm_password) {
            throw { message: 'Password doesnot match ' + element };
        }
        const role = yield roleModel_js_1.default.findOne({ where: { role_name: 'superadmin' } });
        const salt = bcryptjs_1.default.genSaltSync(10);
        const hash = bcryptjs_1.default.hashSync(req.body.password, salt);
        body.password_salt = salt;
        body.password = hash;
        const user1 = yield userModel_js_1.default.findOne({ where: { role_id: role.id } });
        body.created_by = user1.id;
        const user = yield userModel_js_1.default.create(body);
        const roledet = yield roleModel_js_1.default.findOne({ where: { id: user.role_id } });
        const token = generateAccessToken(user.email, user.id);
        return res.status(200).json({
            token: token,
            email: user.email,
            first_name: user.first_name,
            id: user.id,
            role: roledet.role_name
        });
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({
            //error:console.log(err),
            error: err.message
        });
    }
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        console.log(body);
        const reqData = ["email", "password"];
        reqData.forEach(field => {
            if (!body[field] || body[field] === null)
                throw new Error(field + ' Missing');
        });
        const user = yield userModel_js_1.default.findOne({ where: { email: req.body.email } });
        if (!user) {
            throw new Error('Incorrect Email or Password');
        }
        else {
            const compPassword = bcryptjs_1.default.compareSync(req.body.password, user.password);
            console.log(compPassword);
            if (compPassword) {
                const roledet = yield roleModel_js_1.default.findOne({ where: { id: user.role_id } });
                const token = generateAccessToken(user.email, user.id);
                console.log("wdde");
                return res.status(200).json({
                    token: token,
                    email: user.email,
                    first_name: user.first_name,
                    id: user.id,
                    role: roledet.role_name
                });
            }
            else
                throw new Error('Incorrect Email or Password');
        }
    }
    catch (e) {
        console.log(e);
        return res.status(400).json({ error: e.message });
    }
});
const listUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let where_con = {};
        let param = req.query.role;
        const limit = parseInt(req.query.limit);
        const offset = parseInt(req.query.offset);
        const pro_status = req.query.status;
        const searchdata = req.query.searchdata;
        if (pro_status) {
            let status = pro_status.toLowerCase();
            if (status == 'active' || status == 'inactive') {
                where_con.status = status;
            }
        }
        else {
            where_con = {
                status: { [Op.ne]: 'trash' }
            };
        }
        if (param && param != '0') {
            where_con.role_id = param;
        }
        if (searchdata) {
            where_con[Op.or] = {
                first_name: {
                    [Op.like]: '%' + searchdata + '%'
                },
                last_name: {
                    [Op.like]: '%' + searchdata + '%'
                }
            };
        }
        console.log(where_con);
        const { count, rows } = yield userModel_js_1.default.findAndCountAll({
            offset: offset,
            limit: limit,
            attributes: ['id', 'role_id', 'first_name', 'last_name', 'email', 'phone_number', 'status'],
            where: where_con,
            include: [{ model: roleModel_js_1.default }]
        });
        let op = rows.map(elem => {
            return {
                id: elem.id,
                first_name: elem.first_name,
                role: elem.role.role_name,
                last_name: elem.last_name,
                email: elem.email,
                phone_number: elem.phone_number,
                status: elem.status
            };
        });
        console.log(op);
        return res.status(200).json({ data: op, count: count });
    }
    catch (e) {
        console.log(e);
        return res.status(400).json({ error: e.message });
    }
});
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        console.log(req.body);
        const reqData = ['first_name', 'last_name', 'email', 'phone_number', 'password'];
        reqData.forEach(element => {
            if (!body[element] || body[element] === null)
                throw { message: 'Field Missing ' + element };
        });
        const user_exist = yield userModel_js_1.default.findOne({ where: { email: req.body.email } });
        if (user_exist) {
            throw new Error('User Exist with same Email Id');
        }
        const salt = bcryptjs_1.default.genSaltSync(10);
        const hash = bcryptjs_1.default.hashSync(req.body.password, salt);
        body.password_salt = salt;
        body.password = hash;
        body.created_by = req.user.id;
        body.role_id = parseInt(req.body.role_id);
        console.log(body);
        const user = yield userModel_js_1.default.create(body);
        let details = {
            from: dbConfig_js_1.default.AUTH_USER,
            to: req.body.email,
            subject: 'Login Crediantials',
            text: 'Hi..your random password is' + req.body.password
        };
        mailTransporter.sendMail(details, err => {
            if (err) {
                console.log("Error........");
            }
            else {
                console.log("Mail send Successfully........");
            }
        });
        return res.status(200).json({
            message: 'Success'
        });
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({
            error: err.message
        });
    }
});
const getRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const role = yield roleModel_js_1.default.findAll({
            attributes: ['id', 'role_name']
        });
        return res.status(200).json({
            data: role
        });
    }
    catch (e) {
        return res.status(400).json({
            message: "Failed to load" + e
        });
    }
});
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.params.id);
        const { body } = req;
        const role = yield roleModel_js_1.default.findOne({ where: { role_name: body.role } });
        const role_id = role.id;
        console.log(role_id);
        body.role_id = role_id;
        const data = yield userModel_js_1.default.update({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            status: req.body.status,
            role_id: role_id
        }, { where: { id: req.params.id } });
        return res.status(200).json({ data: "success" });
    }
    catch (e) {
        console.log(e);
        return res.status(400).json({ data: "Error" + e });
    }
});
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Delete prodcut with id " + req.params.id);
        userModel_js_1.default.update({
            status: 'trash'
        }, {
            where: { id: req.params.id },
        });
        return res.status(200).json({ data: "Success" });
    }
    catch (e) {
        return res.status(400).json({ data: "Not Success" });
    }
});
const addtoCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const reqData = ['product_id', 'product_name', 'count'];
        reqData.forEach(element => {
            if (!body[element] || body[element] === null)
                throw ({ data: element + ' missing' });
        });
        const data = yield Cart_js_1.default.findOne({ where: { user_id: req.user.id, product_id: req.body.product_id } });
        if (data) {
            yield Cart_js_1.default.increment({ count: req.body.count }, { where: { user_id: req.user.id, product_id: req.body.product_id } });
            return res.status(200).json({ data: "Success" });
        }
        else {
            body.user_id = req.user.id;
            yield Cart_js_1.default.create(body);
            return res.status(200).json({ data: "Success" });
        }
    }
    catch (e) {
        return res.status(400).json(e);
    }
});
const updateCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const data = yield userModel_js_1.default.update({ count: req.body.count }, { where: { user_id: req.body.user_id, product_id: req.body.product_id } });
        return res.status(200).json({ data: "success" });
    }
    catch (e) {
        return res.status(400).json({ data: "Error" + e });
    }
});
const listcartItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("List Cart Items");
        const list = yield Cart_js_1.default.findAll({ where: { user_id: req.user.id },
            include: [{ model: Product_js_1.default }]
        });
        console.log(list);
        //    const totalPrice= await Product.sum('price',{where:{user_id:req.user.id}});
        //    console.log(totalPrice);
        return res.status(200).json({ data: list });
    }
    catch (e) {
        console.log(e);
        return res.status(400).json(e);
    }
});
const addOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        console.log(body);
        yield Cart_js_1.default.destroy({
            where: {
                user_id: req.user.id
            }
        });
        const dd = yield Orders_js_1.default.bulkCreate(body);
        console.log(dd);
        return res.status(200).json({ data: "Success" });
    }
    catch (e) {
        console.log(e);
        return res.status(400).json(e);
    }
});
const listOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield Orders_js_1.default.findAll({ where: { user_id: req.user.id }, include: [{ model: Product_js_1.default }] });
        //    const data =  await Order.findAll({where:{user_id:req.user.id},include:[{ model: Product}]})
        //    console.log(data);
        return res.status(200).json({ data: data });
    }
    catch (e) {
        return res.status(400).json(e);
    }
});
const deleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const { body } = req;
        yield Cart_js_1.default.destroy({ where: body });
        return res.status(200).json({ data: 'success' });
    }
    catch (e) {
        return res.status(400).json(e);
    }
});
exports.default = { signUp, login, listUsers, addUser, getRole, updateUser, deleteUser, addtoCart, updateCart, listcartItems, addOrder, listOrder, deleteOrder };
