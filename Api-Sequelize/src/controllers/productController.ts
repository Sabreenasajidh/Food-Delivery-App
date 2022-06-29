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
//export default {listProduct}