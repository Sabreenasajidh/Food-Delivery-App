import Product from "../models/Product.js";
import Category from "../models/Category.js";
import Sequelize from 'sequelize';
import path from 'path'

const Op = Sequelize.Op;

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
        console.log(req.query.limit);
        const limit = parseInt(req.query.limit)
        const offset = parseInt(req.query.offset)
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
        const { count, rows } = await Product.findAndCountAll({
            offset:offset,
            limit:limit,
            attributes: ['id','category_id','name','description','status','price','image'],
            include:[{ model: Category,attributes:["name"]}],
            where:where_con
          });
    return res.status(200).json({data:rows,count:count,category_name:category_name.name})

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
          console.log(req.params.id);
          return res.status(200).json({data:"Success"})

     }catch(e){
        console.log(e);
        return res.status(400).json({data:"Error"+e})

     }
 }

export default {AddProduct,ListProduct,deleteProduct,getCategoryName,updateProducts,getProductbyId}