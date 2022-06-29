"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const server_js_1 = __importDefault(require("./server.js"));
let Role = server_js_1.default.define('roles', {
    id: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    role_name: {
        type: sequelize_1.default.STRING,
        allowNull: false
    }
}, {
    freezeTableName: true
});
exports.default = Role;
