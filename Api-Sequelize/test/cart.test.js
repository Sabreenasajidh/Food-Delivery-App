const chai  = require('chai');
var expect = chai.expect;
const jsonSchema = require( 'chai-json-schema')
chai.use(jsonSchema);
let url = 'http://localhost:9000/api/user/cart'
let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhamlkaDM4QGdtYWlsLmNvbSIsImlkIjozLCJpYXQiOjE2NTY2MjI1NjN9.8m8jp9zlV0YQ58rEFnI-WMpmsAK3Zjkg9d9lusYckt8'
const request  = require("supertest");

//createcart
//listcart
//updatecart
//delete cart

describe('Cart Api', () => {

    describe("POST /cart/create", function () {
      it("should create a new cart", async function () {
          const cartSchema = {
              product_id:{type:Number},
              product_name:{type:String},
              count:{type:Number}
          }
          const data = {product_id:11,product_name:'donuts',count:2}
          expect(data).to.be.jsonSchema(cartSchema);
       const res =  await request(url)
                .post('/create')
                .send(data)
                .set('x-access-token', token)
        expect(res.status).to.equal(200)
        expect(res.body).to.be.an("object")
      })
    })

    describe("GET /cart/list", function () {
        it("should list cart items", async function () {
            const res =  await request(url)
                .get('/')
                .set('x-access-token', token)
        expect(res.status).to.equal(200)
        expect(res.body).to.be.an("object")

        })
    })

    describe("UPDATE /cart/update", function () {
        it("should update cart items", async function () {
            const cartSchema = {
                product_id:{type:Number},
                product_name:{type:String},
                count:{type:Number}
            }
            const data = {product_id:11,product_name:'donuts',count:2}
            expect(data).to.be.jsonSchema(cartSchema);
            const res =  await request(url)
                  .put('/update')
                  .send(data)
                  .set('x-access-token', token)
          expect(res.status).to.equal(200)
          expect(res.body).to.be.an("object")
        })
    })

    describe("DELETE /cart/delete", function () {
        it("should delete particular item in  cart", async function () {
          
            
            const res =  await request(url)
                  .delete('/delete')
                  .query({ user_id: '3', product_id: '12' })
                  .set('x-access-token', token)
          expect(res.status).to.equal(200)
          expect(res.body).to.be.an("object")
        })
    })
})