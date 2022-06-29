"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//top informatiom section 
const info_json_1 = __importDefault(require("./info.json"));
const index_js_1 = __importDefault(require("./modules/index.js"));
console.log(index_js_1.default);
//import definitions
const index_js_2 = __importDefault(require("./definitions/index.js"));
//console.log(definitions);
//footer section
const footer_json_1 = __importDefault(require("./footer.json"));
let swaggerPayload = Object.assign(Object.assign(Object.assign(Object.assign({}, info_json_1.default), index_js_1.default), index_js_2.default), footer_json_1.default);
exports.default = swaggerPayload;
