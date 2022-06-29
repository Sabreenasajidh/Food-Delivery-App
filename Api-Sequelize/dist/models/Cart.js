"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const server_js_1 = __importDefault(require("./server.js"));
const Product_js_1 = __importDefault(require("./Product.js"));
const userModel_js_1 = __importDefault(require("./userModel.js"));
let Cart = server_js_1.default.define('Cart', {
    id: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    product_name: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    },
    count: {
        type: sequelize_1.default.INTEGER,
        allowNull: false
    },
    user_id: {
        type: sequelize_1.default.INTEGER,
        allowNull: false,
        // references: {
        //     model: 'users',
        //     key: 'id'
        // }
    },
    product_id: {
        type: sequelize_1.default.INTEGER,
        allowNull: false,
        // references: {
        //     model: 'prodcuts',
        //     key: 'id'
        // }
    }
}, {
    freezeTableName: true
});
Product_js_1.default.hasMany(Cart, { foreignKey: 'product_id' });
Cart.belongsTo(Product_js_1.default, {
    foreignKey: 'product_id',
    allowNull: false
});
userModel_js_1.default.hasMany(Cart, { foreignKey: 'user_id' });
Cart.belongsTo(userModel_js_1.default, {
    foreignKey: 'user_id',
    allowNull: false
});
exports.default = Cart;
