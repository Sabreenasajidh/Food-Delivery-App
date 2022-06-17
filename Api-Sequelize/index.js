import express from 'express'
var app = express();
import bodyParser from 'body-parser'

import cors from 'cors'
import port from './config/dbConfig.js'

app.use(cors())


app.use(express.json());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.urlencoded({ extended: false })); 

import User from './routes/userRoute.js'
import Prodcut from './routes/Products.js'
import { config } from 'process';


app.use('/api/user',User)
app.use('/api/products',Prodcut)
app.use('/public/uploads', express.static('public/uploads'))
// app.use('/public/uploads', express.static('/public'));


// app.use('/Images',express.static('./Images'))
//app.use('/user',mongUser)
//app.use(cookieParser());

app.listen(port.PORT,()=>{
    console.log('listening to port 7000');
})