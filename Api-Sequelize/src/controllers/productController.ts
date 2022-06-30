import express, { Express, Request, Response } from 'express';
import Sequelize from 'sequelize';
const Op = Sequelize.Op;
import Category from "../../models/Category";
import Product from '../models/ProductModel'

export const ListProduct = async(req:Request,res:Response)=>{
    try{
        const limit:number = parseInt(req.query.limit as string)
        const offsets:number = parseInt(req.query.offset as string)
        //const limit = Number(req.query.limit)
        //const limit:string = req.query.limit as string
        //const offsets :string= req.query.offset as string
        const category_id = req.query.category_id
        const pro_status = req.query.status
        const searchdata = req.query.searchdata
        console.log(limit,offsets);

        let where_con:any = {}
        let category_name = ''
        if (category_id && category_id !='0'){
            where_con.category_id = category_id
            category_name = await Category.findOne({where:{id:category_id}})
        }
        if(pro_status){
            let  status = pro_status
              if(status == 'active' || status == 'inactive'){
                  where_con.status = status
              }
          }else{
           where_con.status={[Op.ne]: 'trash'}
          }

          if(searchdata && searchdata != ''){
            where_con[Op.or]= {

                description: {
                    [Op.like]: '%'+searchdata+'%'
                },
                name: {
                    [Op.like]: '%'+searchdata+'%'
                }
            }
        }

        const { count, rows } = await Product.findAndCountAll({
            offset:offsets,
            limit:limit,
            attributes: ['id','category_id','name','description','status','price','image'],
            include:[{ model: Category,attributes:["name"]}],
            where:where_con
          });

          console.log(count);
          console.log(rows);
          
          return res.status(200).json({data:rows,count:count})
          
        
    }catch(e){
        console.log(e);
        return res.status(400).json({data:"Error"+e})
    }
}
interface MulterRequest extends Request {
    file?: any;
    body:any;
}


export const AddProduct = async(req:MulterRequest,res:Response)=>{
    try{
        // console.log(req.body);
        // console.log(req.file.path);
        
        const {body} = req
        const reqData = ['name','description','price']
        reqData.forEach(element => {
            if(!body[element] ||body[element] === null) 
            throw {message:'Field Missing '+ element };
        }); 

        //body.category_id = parseInt(req.body.category_id)
        body.category_id = parseInt(req.body.category_id as string)
        body.image= req.file.path;
        console.log(body);
        
       await Product.create(body)
       return res.status(200).json({message:"Product added Successfully"})

    }catch(e){
        console.log(e);
        res.status(500).send({message:"Product Not Added to DB"})

    }
}
export const updateProduct = async(req:Request,res:Response)=>{
    try{
        console.log(req.params.id);
        
        let data = {}
       if(req.file){
           data = {
               image :req.file.path,
               name:req.body.name,
               description	:req.body.description,
               status:req.body.status,
               price:req.body.price,

           }
       }
       else{
           data = {
               name:req.body.name,
               description	:req.body.description,
               status:req.body.status,
               price:req.body.price,

           }
       }
       console.log(data);
       const op = await Product.update(
           data,
           { where: { id: req.params.id } }
         );
         console.log(op);
         //console.log(req.params.id);
         return res.status(200).json({data:"Success"})

    }catch(e){
       console.log(e);
       return res.status(400).json({data:"Error"+e})

    }
    

}
export const deleteProduct = (req:Request,res:Response)=>{
    try{
       //console.log("Delete prodcut with id "+req.params.id);
        Product.update(
            {
                status:'trash'
            },
            {
            where: { id: req.params.id },
          });
       res.status(200).send("Deleted")
        

    }catch(e){
        res.status(400).send("Error........")
        

    }

}