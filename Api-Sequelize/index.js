import express from 'express'
var app = express();
import bodyParser from 'body-parser'
import cors from 'cors'
import port from './config/dbConfig.js'
const PORT = port.PORT
console.log(PORT);

app.use(cors())


app.use(express.json());
app.use(express.urlencoded({ extended: false })); 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })); 

import User from './routes/userRoute.js'
import Prodcut from './routes/Products.js'
import { config } from 'process';


app.use('/api/user',User)
app.use('/api/products',Prodcut)
app.use('/public/uploads', express.static('public/uploads'))
app.listen(PORT,()=>{
    console.log(`listening to port ${PORT}`);
})