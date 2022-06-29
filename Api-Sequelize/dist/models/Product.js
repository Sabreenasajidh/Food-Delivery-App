"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const server_js_1 = __importDefault(require("./server.js"));
const Category_js_1 = __importDefault(require("./Category.js"));
let Product = server_js_1.default.define('products', {
    id: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    },
    status: {
        type: sequelize_1.default.STRING,
        defaultValue: 'active',
    },
    price: {
        type: sequelize_1.default.INTEGER,
        allowNull: false,
    },
    image: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    },
}, {
    freezeTableName: true
});
Category_js_1.default.hasMany(Product, { foreignKey: 'category_id' });
Product.belongsTo(Category_js_1.default, {
    foreignKey: 'category_id',
    allowNull: false
});
exports.default = Product;
