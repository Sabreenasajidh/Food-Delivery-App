import express from 'express'
var app = express();
import bodyParser from 'body-parser'
import cors from 'cors'
import port from './config/dbConfig.js'
//import mustacheExpress from 'mustache-express'
//import path from 'path';
// import { fileURLToPath } from 'url';
// const __filename = fileURLToPath(import.meta.url);

// const __dirname = path.dirname(__filename);
// console.log(__dirname);
const PORT = port.PORT
console.log(PORT);

app.use(cors())


app.use(express.json());
app.use(express.urlencoded({ extended: false })); 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })); 

import User from './routes/userRoute.js'
import Prodcut from './routes/Products.js'
// app.set('views', __dirname + '/views');
// app.set('view engine', 'mustache');
//app.engine('mustache', mustacheExpress());


app.use('/api/user',User)
app.use('/api/products',Prodcut)
app.use('/public/uploads', express.static('public/uploads'))
app.listen(PORT,()=>{
    console.log(`listening to port ${PORT}`);
})