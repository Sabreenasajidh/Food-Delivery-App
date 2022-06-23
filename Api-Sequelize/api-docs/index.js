//const createError = require('http-errors');
import express from 'express'
//import swaggerJsDoc from 'swagger-jsdoc';
import swaggerDocument from './swagger/index.js';
import swaggerUI from 'swagger-ui-express'

var app = express();
import bodyParser from 'body-parser'

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const options = {
  customCss: '.swagger-ui .topbar { display: none }',
  customLevelTitle: "API Overview | swagger API Documentation"
};
app.use('/docs/web', swaggerUI.serveFiles(swaggerDocument,options), swaggerUI.setup(swaggerDocument,options));

app.listen(5000,()=>{
  console.log(`listening to port 5000`);
})

//module.exports = app;
