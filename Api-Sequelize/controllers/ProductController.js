import Product from "../models/Product.js";
import Category from "../models/Category.js";
import Sequelize from 'sequelize';
const Op = Sequelize.Op;
import path from 'path'
import Cart from "../models/Cart.js";


const AddProduct = async(req,res)=>{
    try{
        console.log(req.body);
        const {body} = req
        const reqData = ['name','description','price']
        reqData.forEach(element => {
            if(!body[element] ||body[element] === null) 
            throw {message:'Field Missing '+ element };
        }); 

        body.category_id = parseInt(req.body.category_id)
        body.image = req.file.path;
        
       await Product.create(body)
       return res.status(200).json({message:"Product added Successfully"})

    }catch(e){
        console.log(e);
        res.status(500).send({message:"Product Not Added to DB"})

    }
}
const ListProduct = async(req,res)=>{
    try{
        console.log(req.query)
        const limit = req.query.limit
        const offset = req.query.offset
        const category_id = req.query.category_id
        const pro_status = req.query.status
        const searchdata = req.query.searchdata
        let where_con = {}
        let category_name = ''
        if (category_id && category_id !='0'){
            where_con.category_id = category_id
            category_name = await Category.findOne({where:{id:category_id}})
       }
       if(pro_status){
         let  status = pro_status.toLowerCase()
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
        console.log(where_con);
        if(limit && offset){
            const { count, rows } = await Product.findAndCountAll({
                offset:parseInt(offset),
                limit:parseInt(limit),
                attributes: ['id','category_id','name','description','status','price','image'],
                include:[
                    { model: Cart,attributes:["count"],where:{user_id:req.user.id},required:false},
                    { model: Category,attributes:["name"]},
                ],
                where:where_con
            });
            
            console.log(rows,"here");
            
                      
                return res.status(200).json({data:rows,count:count,category_name:category_name.name})
        }else{
            const { count, rows } = await Product.findAndCountAll({
                attributes: ['id','title','description','maximum_attendee','status'],
                include:[
                    { model: Cart,attributes:["count"],where:{user_id:req.user.id},required:false},
                    { model: Category,attributes:["name"]},
                ],
                where:where_con
            });

            let op = rows.map(elem=>{ 
                return {
                    id:elem.id,
                    category_id : elem.category_id,
                    name:elem.name,
                    description:elem.description,
                    status:elem.status,
                    price:elem.price,
                    image:elem.image,
                    prod_count:elem.Carts[0]
                }
            })
            
              
        return res.status(200).json({data:op,count:count,category_name:category_name.name})

        }
  
    //     const { count, rows } = await Product.findAndCountAll({
    //         offset:offset,
    //         limit:limit,
    //         attributes: ['id','category_id','name','description','status','price','image'],
    //         include:[
    //             { model: Cart,attributes:["count"],where:{user_id:req.user.id},required:false},
    //             { model: Category,attributes:["name"]},
    //         ],
    //         where:where_con
    //       });
    //       let op = rows.map(elem=>{ 
    //         return {
    //             id:elem.id,
    //             category_id : elem.category_id,
    //             name:elem.name,
    //             description:elem.description,
    //             status:elem.status,
    //             price:elem.price,
    //             image:elem.image,
    //             prod_count:elem.Carts[0]
    //         }
    //     })
        
          
    // return res.status(200).json({data:op,count:count,category_name:category_name.name})

    }catch(e){
        console.log(e);
        return res.status(400).json({data:"Error"+e})
    }
}
const getProductbyId = async(req,res)=>{
    console.log(req.params.id);
    const id = req.params.id
    const op = await Product.findOne({where:{id:id},include:[{ model: Category}]})
    console.log(op);
    return res.status(200).json({data:op})
}

const deleteProduct = (req,res)=>{
    try{
        console.log("Delete prodcut with id "+req.params.id);
        Product.update(
            {
                status:'trash'
            },
            {
            where: { id: req.params.id },
          });
        return res.status(200).json({data:"Success"})

    }catch(e){
        return res.status(400).json({data:"Not Success"})
    }
}
const getCategoryName = async(req,res)=>{
    try{
        const categorydet = await Category.findAll();
        return res.status(200).json({data:categorydet})
    
    }catch(e){
        console.log(e);
        return res.status(400).json({data:"Error"+e})

    }
}

 const updateProducts = async(req,res)=>{
     try{
         console.log(req);
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
          return res.status(200).json({data:"Success"})

     }catch(e){
        console.log(e);
        return res.status(400).json({data:"Error"+e})

     }
 }

export default {AddProduct,ListProduct,deleteProduct,getCategoryName,updateProducts,getProductbyId}