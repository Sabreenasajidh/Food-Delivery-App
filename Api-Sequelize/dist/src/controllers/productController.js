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
exports.ListProduct = void 0;
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
//export default {listProduct}
