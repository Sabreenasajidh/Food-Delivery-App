const chai  = require('chai');
var expect = chai.expect;
const jsonSchema = require( 'chai-json-schema')
chai.use(jsonSchema);
let url = 'http://localhost:9000/api/user/order'
let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhamlkaDM4QGdtYWlsLmNvbSIsImlkIjozLCJpYXQiOjE2NTY2MjI1NjN9.8m8jp9zlV0YQ58rEFnI-WMpmsAK3Zjkg9d9lusYckt8'
const request  = require("supertest");

//add
//list

describe('Order Api', () => {

    describe("POST /order/create", function () {
      it("should create a new order", async function () {
          const OrderSchema = {
              product_id:{type:Number},
              item_count:{type:Number},
              amount:{type:Number},
              user_id:{type:Number},
              reference_id:{type:String}
          }
          const data = [{product_id:11,item_count:1,amount:200,user_id:2,reference_id:'&324sffr'}]
          expect(data).to.be.jsonSchema(OrderSchema);
       const res =  await request(url)
                .post('/add')
                .send(data)
                .set('x-access-token', token)
        expect(res.status).to.equal(200)
        expect(res.body).to.be.an("object")
      })
      describe("GET /order", function () {
        it("should list all order", async function () {
            const res =  await request(url)
                        .get('/')
                        .set('x-access-token', token)
        })
      })
})