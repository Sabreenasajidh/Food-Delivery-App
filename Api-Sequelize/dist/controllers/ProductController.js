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
const Product_js_1 = __importDefault(require("../models/Product.js"));
const Category_js_1 = __importDefault(require("../models/Category.js"));
const sequelize_1 = __importDefault(require("sequelize"));
const Op = sequelize_1.default.Op;
const AddProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const { body } = req;
        const reqData = ['name', 'description', 'price'];
        reqData.forEach(element => {
            if (!body[element] || body[element] === null)
                throw { message: 'Field Missing ' + element };
        });
        body.category_id = parseInt(req.body.category_id);
        body.image = req.file.path;
        yield Product_js_1.default.create(body);
        return res.status(200).json({ message: "Product added Successfully" });
    }
    catch (e) {
        console.log(e);
        res.status(500).send({ message: "Product Not Added to DB" });
    }
});
const ListProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.query.limit);
        const limit = parseInt(req.query.limit);
        const offset = parseInt(req.query.offset);
        const category_id = req.query.category_id;
        const pro_status = req.query.status;
        const searchdata = req.query.searchdata;
        let where_con = {};
        let category_name = '';
        if (category_id && category_id != '0') {
            where_con.category_id = category_id;
            category_name = yield Category_js_1.default.findOne({ where: { id: category_id } });
        }
        if (pro_status) {
            let status = pro_status.toLowerCase();
            if (status == 'active' || status == 'inactive') {
                where_con.status = status;
            }
        }
        else {
            where_con.status = { [Op.ne]: 'trash' };
        }
        if (searchdata && searchdata != '') {
            where_con[Op.or] = {
                description: {
                    [Op.like]: '%' + searchdata + '%'
                },
                name: {
                    [Op.like]: '%' + searchdata + '%'
                }
            };
        }
        const { count, rows } = yield Product_js_1.default.findAndCountAll({
            offset: offset,
            limit: limit,
            attributes: ['id', 'category_id', 'name', 'description', 'status', 'price', 'image'],
            include: [{ model: Category_js_1.default, attributes: ["name"] }],
            where: where_con
        });
        return res.status(200).json({ data: rows, count: count, category_name: category_name.name });
    }
    catch (e) {
        console.log(e);
        return res.status(400).json({ data: "Error" + e });
    }
});
const getProductbyId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params.id);
    const id = req.params.id;
    const op = yield Product_js_1.default.findOne({ where: { id: id }, include: [{ model: Category_js_1.default }] });
    console.log(op);
    return res.status(200).json({ data: op });
});
const deleteProduct = (req, res) => {
    try {
        console.log("Delete prodcut with id " + req.params.id);
        Product_js_1.default.update({
            status: 'trash'
        }, {
            where: { id: req.params.id },
        });
        return res.status(200).json({ data: "Success" });
    }
    catch (e) {
        return res.status(400).json({ data: "Not Success" });
    }
};
const getCategoryName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categorydet = yield Category_js_1.default.findAll();
        return res.status(200).json({ data: categorydet });
    }
    catch (e) {
        console.log(e);
        return res.status(400).json({ data: "Error" + e });
    }
});
const updateProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = {};
        if (req.file) {
            data = {
                image: req.file.path,
                name: req.body.name,
                description: req.body.description,
                status: req.body.status,
                price: req.body.price,
            };
        }
        else {
            data = {
                name: req.body.name,
                description: req.body.description,
                status: req.body.status,
                price: req.body.price,
            };
        }
        console.log(data);
        const op = yield Product_js_1.default.update(data, { where: { id: req.params.id } });
        console.log(op);
        console.log(req.params.id);
        return res.status(200).json({ data: "Success" });
    }
    catch (e) {
        console.log(e);
        return res.status(400).json({ data: "Error" + e });
    }
});
exports.default = { AddProduct, ListProduct, deleteProduct, getCategoryName, updateProducts, getProductbyId };
