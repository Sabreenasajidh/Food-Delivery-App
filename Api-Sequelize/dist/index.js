"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
var app = (0, express_1.default)();
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dbConfig_js_1 = __importDefault(require("./config/dbConfig.js"));
const PORT = dbConfig_js_1.default.PORT;
console.log(PORT);
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
const userRoute_js_1 = __importDefault(require("./routes/userRoute.js"));
const Products_js_1 = __importDefault(require("./routes/Products.js"));
app.use('/api/user', userRoute_js_1.default);
app.use('/api/products', Products_js_1.default);
app.use('/public/uploads', express_1.default.static('public/uploads'));
app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`);
});
