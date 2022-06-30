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
const chai = require('chai');
var expect = chai.expect;
const jsonSchema = require('chai-json-schema');
chai.use(jsonSchema);
let url = 'http://localhost:9000/api/user';
//let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhYnJlZW5hLnRibHJAZ21haWwuY29tIiwiaWQiOjIsImlhdCI6MTY1NTc4NjUzOH0.mmu5ZkWbf0XRXOns0TWXARJsO0lNLsrGE4e5o_ExjbU'
let agent = require("supertest");
before(function () {
    return __awaiter(this, void 0, void 0, function* () {
        request = agent(url);
    });
});
//login
//signup
//edit User
//delete User
//list Users
//add new User by admin
describe('User Api', () => {
    describe("POST /user/signup", function () {
        it("should create new account", function () {
            return __awaiter(this, void 0, void 0, function* () {
            });
        });
    });
    describe("User Login", function () {
        it("user login with email and password", function () {
            return __awaiter(this, void 0, void 0, function* () {
                let userSchema = {
                    email: { type: 'email' },
                    password: { type: 'string' }
                };
                let user = { email: "sabreena.tblr@gmail.com", password: "jazakallah5" };
                expect(user).to.be.jsonSchema(userSchema);
                let result = yield request.post('/login').send(user)
                    .then((res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body).to.be.an("object");
                    expect(res.body.token).to.be.an("string");
                    expect(res.body.email).to.be.an("string");
                    expect(res.body.role).to.be.an("string");
                    expect(res.body.id).to.be.an("number");
                    expect(res.body.first_name).to.be.an("string");
                })
                    .catch((err) => {
                    expect(err).to.have.status(400);
                    expect(err.body).to.be.an("object");
                });
                // result.body.forEach(elem => {
                //     expect(elem.email).to.be.a("string")
                //     expect(elem.first_name).to.be.a("string")
                //     expect(elem.id).to.be.a("number")
                //     expect(elem.role).to.be.a("number")
                // });
                // res.body.data.forEach(elem => {
                //     expect(elem.token).to.be.a("string")
                //     expect(elem.email).to.be.a("string")
                //     expect(elem.first_name).to.be.a("string")
                //     expect(elem.id).to.be.a("number")
                //     expect(elem.role).to.be.a("number")
                //   });
                // let userData = res.body
                // expect(userData.id).to.be.a("number")
                // expect(userData.first_name).to.be.a("string")
                // expect(userData.last_name).to.be.a("string")
                // expect(userData.email).to.be.a("string")
                // expect(userData.token).to.be.a("string")
                // expect(userData.role_name).to.be.a("string")
                // expect(userData.message).to.be.a("string")
            });
        });
    });
    describe("GET /users", function () {
        it("should list all users", function () {
            return __awaiter(this, void 0, void 0, function* () {
            });
        });
    });
    describe("PUT /user/edit", function () {
        it("should edit a user", function () {
            return __awaiter(this, void 0, void 0, function* () {
            });
        });
    });
    describe("DELETE /user/delete", function () {
        it("should delete a user", function () {
            return __awaiter(this, void 0, void 0, function* () {
            });
        });
    });
});
