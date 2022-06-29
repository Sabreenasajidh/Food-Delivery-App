"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = __importDefault(require("chai"));
var expect = chai_1.default.expect;
const chai_json_schema_1 = __importDefault(require("chai-json-schema"));
chai_1.default.use(chai_json_schema_1.default);
let url = 'http://localhost:9000';
let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhYnJlZW5hLnRibHJAZ21haWwuY29tIiwiaWQiOjIsImlhdCI6MTY1NTc4NjUzOH0.mmu5ZkWbf0XRXOns0TWXARJsO0lNLsrGE4e5o_ExjbU';
const supertest_1 = __importDefault(require("supertest"));
describe('Product Api', () => {
    describe("POST /product/create", function () {
        it("should create a new product", function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield (0, supertest_1.default)(url)
                    .post('/api/products/create')
                    .attach('image', '/home/sabreena/Downloads/donuts.jpeg', 'image.jpg')
                    .field('name', 'biriyani')
                    .field('description', 'malabari')
                    .field('status', 'active')
                    .field('price', 50)
                    .field('category_id', 1)
                    .set('content-Type', 'application/json')
                    .set('Accept', 'application/json')
                    .set('x-access-token', token)
                    .then((res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body).to.be.an("object");
                })
                    .catch((err) => {
                    expect(err).to.have.status(500);
                    expect(err.body).to.be.an("object");
                });
            });
        });
    });
    describe("GET /products", function () {
        it("should return 200 OK with all products", () => __awaiter(this, void 0, void 0, function* () {
            let dataSchema = {
                offset: { type: Number },
                limit: { type: Number },
            };
            let data = { offset: 0, limit: 3 };
            expect(data).to.be.jsonSchema(dataSchema);
            let res = yield (0, supertest_1.default)(url)
                .get('/api/products/')
                .query(data)
                .set('content-Type', 'application/json')
                .set('Accept', 'application/json')
                .set('x-access-token', token);
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("Object");
            res.body.data.forEach(elem => {
                expect(elem.name).to.be.a("string");
                expect(elem.description).to.be.a("string");
                expect(elem.status).to.be.a("string");
                expect(elem.image).to.be.a("string");
                expect(elem.price).to.be.a("number");
                expect(elem.category_id).to.be.a("number");
                expect(elem.id).to.be.a("number");
            });
        }));
    });
    it("should have valid products", function () {
        return __awaiter(this, void 0, void 0, function* () {
        });
    });
    describe("GET /product/:id", function () {
        it("should query an individual product", function () {
            return __awaiter(this, void 0, void 0, function* () {
            });
        });
    });
    describe("PATCH /products/:id", function () {
        it("should update an existing product", function () {
            return __awaiter(this, void 0, void 0, function* () {
            });
        });
    });
    describe("DELETE /products/:id", function () {
        it("should delete an existing product", function () {
            return __awaiter(this, void 0, void 0, function* () {
            });
        });
    });
});
