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
exports.deleteProduct = exports.updateProduct = exports.AddProduct = exports.ListProduct = void 0;
const sequelize_1 = __importDefault(require("sequelize"));
const Op = sequelize_1.default.Op;
const Category_1 = __importDefault(require("../../models/Category"));
const ProductModel_1 = __importDefault(require("../models/ProductModel"));
const ListProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const limit = parseInt(req.query.limit);
        const offsets = parseInt(req.query.offset);
        //const limit = Number(req.query.limit)
        //const limit:string = req.query.limit as string
        //const offsets :string= req.query.offset as string
        const category_id = req.query.category_id;
        const pro_status = req.query.status;
        const searchdata = req.query.searchdata;
        console.log(limit, offsets);
        let where_con = {};
        let category_name = '';
        if (category_id && category_id != '0') {
            where_con.category_id = category_id;
            category_name = yield Category_1.default.findOne({ where: { id: category_id } });
        }
        if (pro_status) {
            let status = pro_status;
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
        const { count, rows } = yield ProductModel_1.default.findAndCountAll({
            offset: offsets,
            limit: limit,
            attributes: ['id', 'category_id', 'name', 'description', 'status', 'price', 'image'],
            include: [{ model: Category_1.default, attributes: ["name"] }],
            where: where_con
        });
        console.log(count);
        console.log(rows);
        return res.status(200).json({ data: rows, count: count });
    }
    catch (e) {
        console.log(e);
        return res.status(400).json({ data: "Error" + e });
    }
});
exports.ListProduct = ListProduct;
const AddProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log(req.body);
        // console.log(req.file.path);
        const { body } = req;
        const reqData = ['name', 'description', 'price'];
        reqData.forEach(element => {
            if (!body[element] || body[element] === null)
                throw { message: 'Field Missing ' + element };
        });
        //body.category_id = parseInt(req.body.category_id)
        body.category_id = parseInt(req.body.category_id);
        body.image = req.file.path;
        console.log(body);
        yield ProductModel_1.default.create(body);
        return res.status(200).json({ message: "Product added Successfully" });
    }
    catch (e) {
        console.log(e);
        res.status(500).send({ message: "Product Not Added to DB" });
    }
});
exports.AddProduct = AddProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.params.id);
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
        const op = yield ProductModel_1.default.update(data, { where: { id: req.params.id } });
        console.log(op);
        //console.log(req.params.id);
        return res.status(200).json({ data: "Success" });
    }
    catch (e) {
        console.log(e);
        return res.status(400).json({ data: "Error" + e });
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => {
    try {
        //console.log("Delete prodcut with id "+req.params.id);
        ProductModel_1.default.update({
            status: 'trash'
        }, {
            where: { id: req.params.id },
        });
        res.status(200).send("Deleted");
    }
    catch (e) {
        res.status(400).send("Error........");
    }
};
exports.deleteProduct = deleteProduct;
