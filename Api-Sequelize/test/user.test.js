const chai  = require('chai');
var expect = chai.expect;
const assert = chai.assert;
const jsonSchema = require( 'chai-json-schema')
chai.use(jsonSchema);
let url = 'http://localhost:9000/api/user'
let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhYnJlZW5hLnRibHJAZ21haWwuY29tIiwiaWQiOjIsImlhdCI6MTY1NTc4NjUzOH0.mmu5ZkWbf0XRXOns0TWXARJsO0lNLsrGE4e5o_ExjbU'
let agent = require("supertest");
before(async function () {
    request = agent(url);
})



//login
//signup
//edit User
//delete User
//list Users
//add new User by admin

describe('User Api', () => {
    describe("POST /user/signup", function () {
        it("should create new account with first_name,last_name,email,phone_number,password,confirm_password", async function () {
            let signup_det = {
                first_name: {type: 'string'},
                last_name: { type: 'string' },
                email:{ type: 'email' },
                phone_number:{ type: 'number' },
                password : {type: 'string'},
                confirm_password : {type: 'string'}
            }

            let user = {
                        first_name:"Safeera",
                        last_name:"Sidhick", 
                        email: "suba5@gmail.com",
                        phone_number:1221373, 
                        password: "jazakallah5",
                        confirm_password:"jazakallah5" 
                    }

            expect(user).to.be.jsonSchema(signup_det);
            let result = await request.post('/signup').send(user)
            .then((res) => {
                expect(res.status).to.equal(200)
                expect(res.body).to.be.an("object")
                expect(res.body.token).to.be.an("string")
                expect(res.body.first_name).to.be.an("string")
                expect(res.body.email).to.be.an("string")
                expect(res.body.id).to.be.an("number")
                expect(res.body.role).to.be.an("string")
            })
        })
    })

    describe("User Login", function () {
        it("user login with email and password", async function () {
            let userSchema = {
                email: {type: 'email'},
                password: { type: 'string' }
            }

            let log_cred = { email: "sabreena.tblr@gmail.com", password: "jazakallah5" }

            expect(log_cred).to.be.jsonSchema(userSchema);
            let result = await request.post('/login').send(log_cred)
            .then((res) => {
                expect(res.status).to.equal(200)
                expect(res.body).to.be.an("object")
                expect(res.body.token).to.be.an("string")
                expect(res.body.email).to.be.an("string")
                expect(res.body.role).to.be.an("string")
                expect(res.body.id).to.be.an("number")
                expect(res.body.first_name).to.be.an("string")
               
            })
        })
    })
    describe("POST  /create", function () {
        it("should create new User by Admin", async function () {
            let userScheme = {
                first_name:{
                    type:'string'
                },
                last_name:{
                    type:'string'
                },email:{
                    type:'email'
                },
                phone_number:{
                    type:'number'
                },
                password:{
                    type:'string'
                },
                role_id:{
                    type:'number'
                }
            }
            let newUser = {first_name:'test1',last_name:'test11',email:'testr@gmail.com',phone_number:1761393,password:'jazakallah5',role_id:2}
            expect(newUser).to.be.jsonSchema(userScheme);
            let result = await request
            .post('/create')
            .send(newUser)
            .set('x-access-token', token)

            expect(result.status).to.equal(200)
            expect(result.body).to.be.an("object")
        })
    })


    describe("GET /users", function () {
        it("should list all users", async function () {
            let dataSchema = {
                offset: {type: Number},
                limit: {type: Number},
                status:{type:String}
            }
            let data = { offset: 0, limit: 5,status:'active'}
            expect(data).to.be.jsonSchema(dataSchema);

            let res = await request
            .get('/')
            .query(data)
            .set( 'content-Type', 'application/json')
            .set('Accept', 'application/json')
            .set('x-access-token', token)
            
            expect(res.status).to.equal(200)
            expect(res.body).to.be.an("Object")
            res.body.data.forEach(elem => {
              expect(elem.first_name).to.be.a("string")
              expect(elem.last_name).to.be.a("string")
              expect(elem.email).to.be.a("string")
              expect(elem.role).to.be.a("string")
              expect(elem.phone_number).to.be.a("number")
              expect(elem.status).to.be.a("string")
            });


        })
    })

    describe("PUT /user/edit", function () {
        it("should edit a user by Admin", async function () {
            let editSchema = {
                first_name: {type: Number},
                last_name: {type: Number},
                status:{type:String},
                email:{type:String}
            }
            let data = { first_name:'Nimi',role:'superadmin',last_name:'Tblr',status:'active',email:'nimi.tblr@gmail.com'}
            expect(data).to.be.jsonSchema(editSchema);
            let res = await request
            .put('/update/'+1)
            .send(data)
            .set('x-access-token', token)
            expect(res.status).to.equal(200)
            expect(res.body).to.be.an("object")
        })
    })

    describe("DELETE /user/delete", function () {
        it("should delete a user", async function () {
            let res = await request
            .delete('/delete/'+1)
            .set('x-access-token', token)
            expect(res.status).to.equal(200)
            expect(res.body).to.be.an("object")

        })
    })
})