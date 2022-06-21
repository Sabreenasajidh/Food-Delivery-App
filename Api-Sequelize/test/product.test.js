import chai from 'chai';
var expect = chai.expect;
import jsonSchema from 'chai-json-schema'
chai.use(jsonSchema);
let url = 'http://localhost:9000'
let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhYnJlZW5hLnRibHJAZ21haWwuY29tIiwiaWQiOjIsImlhdCI6MTY1NTc4NjUzOH0.mmu5ZkWbf0XRXOns0TWXARJsO0lNLsrGE4e5o_ExjbU'
import request from "supertest";

describe('Product Api', () => {

          describe("POST /product/create", function () {
            it("should create a new product", async function () {
              await request(url)
                .post('/api/products/create')
                .attach('image', '/home/sabreena/Downloads/donuts.jpeg', 'image.jpg')
                .field('name', 'biriyani')
                .field('description','malabari')
                .field('status','active')
                .field('price',50)
                .field('category_id',1)
                .set( 'content-Type', 'application/json')
                .set('Accept', 'application/json')
                .set('x-access-token', token)
                .then((res) => {
                    expect(res.status).to.equal(200)
                    expect(res.body).to.be.an("object")

                })
                .catch((err)=>{
                  expect(err).to.have.status(500)
                  expect(err.body).to.be.an("object")
                })
              });
          });
          describe("GET /products", function () {
            it("should return 200 OK with all products", async ()=> {  

              let dataSchema = {
                  offset: {type: Number},
                  limit: {type: Number},
              }
              let data = { offset: 0, limit: 3}
              expect(data).to.be.jsonSchema(dataSchema);

              let res = await request(url)
              .get('/api/products/')
              .query(data)
              .set( 'content-Type', 'application/json')
              .set('Accept', 'application/json')
              .set('x-access-token', token)
              
              expect(res.status).to.equal(200)
              expect(res.body).to.be.an("Object")
              res.body.data.forEach(elem => {
                expect(elem.name).to.be.a("string")
                expect(elem.description).to.be.a("string")
                expect(elem.status).to.be.a("string")
                expect(elem.image).to.be.a("string")
                expect(elem.price).to.be.a("number")
                expect(elem.category_id).to.be.a("number")
                expect(elem.id).to.be.a("number")
              });
            })
          });

         
            
          it("should have valid products", async function () {
            
          });
          
          describe("GET /product/:id", function () {
            it("should query an individual product", async function () {
              
            });
          });
          
          
          describe("PATCH /products/:id", function () {
            it("should update an existing product", async function () {
              
            });
          });
          
          describe("DELETE /products/:id", function () {
            it("should delete an existing product", async function () {
              
            });
          });
        });
       