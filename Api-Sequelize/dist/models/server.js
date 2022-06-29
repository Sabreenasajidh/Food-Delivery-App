"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbConfig_js_1 = __importDefault(require("../config/dbConfig.js"));
const sequelize_1 = __importDefault(require("sequelize"));
const sequelize = new sequelize_1.default(dbConfig_js_1.default.DB, dbConfig_js_1.default.USER, dbConfig_js_1.default.PASSWORD, {
    host: dbConfig_js_1.default.HOST,
    dialect: dbConfig_js_1.default.dialect,
    define: { timeStamp: false }
});
sequelize.sync().then(() => {
    console.log('connected to db');
}).catch(err => {
    console.log('Unable to connect to db', err);
});
const db = {};
db.sequelize = sequelize;
db.Sequelize = sequelize_1.default;
// sequelize.sync({force:false}).then(()=>{
//     console.log('re-sync done');
// })
exports.default = sequelize;
