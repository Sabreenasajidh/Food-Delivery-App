"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//const createError = require('http-errors');
const express_1 = __importDefault(require("express"));
//import swaggerJsDoc from 'swagger-jsdoc';
const index_js_1 = __importDefault(require("./swagger/index.js"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
var app = (0, express_1.default)();
const body_parser_1 = __importDefault(require("body-parser"));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
const options = {
    customCss: '.swagger-ui .topbar { display: none }',
    customLevelTitle: "API Overview | swagger API Documentation"
};
app.use('/docs/web', swagger_ui_express_1.default.serveFiles(index_js_1.default, options), swagger_ui_express_1.default.setup(index_js_1.default, options));
app.listen(5000, () => {
    console.log(`listening to port 5000`);
});
//module.exports = app;
