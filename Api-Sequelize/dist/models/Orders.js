"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const server_js_1 = __importDefault(require("./server.js"));
const Product_js_1 = __importDefault(require("./Product.js"));
const userModel_js_1 = __importDefault(require("./userModel.js"));
let Order = server_js_1.default.define('Orders', {
    id: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    reference_id: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    },
    user_id: {
        type: sequelize_1.default.INTEGER,
        allowNull: false
    },
    product_id: {
        type: sequelize_1.default.INTEGER,
        allowNull: false,
        // references: {
        //     model: 'products',
        //     key: 'id'
        // }
    },
    item_count: {
        type: sequelize_1.default.INTEGER,
        allowNull: false,
    },
    amount: {
        type: sequelize_1.default.INTEGER,
        allowNull: false
    }
}, {
    freezeTableName: true,
});
Product_js_1.default.hasMany(Order, { foreignKey: 'product_id' });
Order.belongsTo(Product_js_1.default, {
    foreignKey: 'product_id',
    allowNull: false
});
userModel_js_1.default.hasMany(Order, { foreignKey: 'user_id' });
Order.belongsTo(userModel_js_1.default, {
    foreignKey: 'user_id',
    allowNull: false
});
exports.default = Order;
