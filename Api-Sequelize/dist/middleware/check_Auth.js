"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dbConfig_js_1 = __importDefault(require("../config/dbConfig.js"));
const checkAuth = (req, res, next) => {
    try {
        // console.log(req);
        const token = req.headers['x-access-token'];
        const decodedToken = jsonwebtoken_1.default.verify(token, dbConfig_js_1.default.JWT_TOKEN);
        req.user = decodedToken;
        next();
    }
    catch (err) {
        res.status(401).send('Please authenticate');
    }
};
exports.default = checkAuth;
