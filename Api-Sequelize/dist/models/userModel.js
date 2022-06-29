"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const server_js_1 = __importDefault(require("./server.js"));
const roleModel_js_1 = __importDefault(require("../models/roleModel.js"));
let User = server_js_1.default.define('users', {
    id: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    first_name: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    },
    last_name: {
        type: sequelize_1.default.STRING,
        allowNull: false
    },
    email: {
        type: sequelize_1.default.STRING,
        isUnique: true,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    phone_number: {
        type: sequelize_1.default.INTEGER,
        allowNull: false,
        unique: true
    },
    password: {
        type: sequelize_1.default.STRING,
        allowNull: false
    },
    password_salt: {
        type: sequelize_1.default.STRING,
        allowNull: false
    },
    created_by: {
        type: sequelize_1.default.INTEGER,
        allowNull: false,
    },
    status: {
        type: sequelize_1.default.STRING,
        defaultValue: 'active'
    },
    role_id: {
        type: sequelize_1.default.INTEGER,
        defaultValue: 3,
        references: {
            model: 'roles',
            key: 'id'
        }
    },
    subscribe: {
        type: sequelize_1.default.BOOLEAN,
        defaultValue: false
    }
}, {
    freezeTableName: true,
    indexes: [
        {
            name: 'first_name',
            fields: ['first_name']
        },
    ]
});
roleModel_js_1.default.hasMany(User, { foreignKey: 'role_id' });
User.belongsTo(roleModel_js_1.default, {
    foreignKey: 'role_id',
    allowNull: false
});
exports.default = User;
