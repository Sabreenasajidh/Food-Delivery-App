import cors from 'cors';
import express, { Express, Request, Response } from 'express';
//import dotenv from 'dotenv';
//var cors = require('cors')


//dotenv.config();

const app: Express = express();
const port = 8000;
import Prodcut from './src/routes/productRoute'
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false })); 

app.use('/api/product',Prodcut)
app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});