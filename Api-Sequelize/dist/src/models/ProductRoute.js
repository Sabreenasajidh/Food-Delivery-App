"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//const sequelize = require('../../models/server').sequelize
const server_1 = __importDefault(require("../../models/server"));
const Category_1 = __importDefault(require("../../models/Category"));
let Product = server_1.default.define('products', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    status: {
        type: Sequelize.STRING,
        defaultValue: 'active',
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    image: {
        type: Sequelize.STRING,
        allowNull: false,
    },
}, {
    freezeTableName: true
});
Category_1.default.hasMany(Product, { foreignKey: 'category_id' });
Product.belongsTo(Category_1.default, {
    foreignKey: 'category_id',
    allowNull: false
});
exports.default = Product;
