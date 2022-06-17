import Product from "../models/Product.js";
import Category from "../models/Category.js";
import Sequelize from 'sequelize';
import path from 'path'

const Op = Sequelize.Op;

const AddProduct = async(req,res)=>{
    try{
        const {body} = req
        console.log(body);
        const reqData = ['name','description','price']
        reqData.forEach(element => {
            if(!body[element] ||body[element] === null) 
            throw {message:'Field Missing '+ element };
        }); 

        body.category_id = parseInt(req.body.category_id)
        console.log(req.file.path);
        body.image = req.file.path;

       const product = await Product.create(body)
        console.log(product);
        res.send({message:"Product added Successfully"})

    }catch(e){
        console.log(e);
        res.send({message:"Product Not Added to DB"})

    }
}
const ListProduct = async(req,res)=>{
    try{
        const limit = parseInt(req.query.limit)
        const offset = parseInt(req.query.offset)
        const category_id = req.query.category_id
        const pro_status = req.query.status
        console.log(pro_status);
        const searchdata = req.query.searchdata
        console.log(searchdata);
        let where_con = {}
        let category_name = ''
        if (category_id && category_id !='0'){
            console.log(category_id,"**************");
            where_con.category_id = category_id
            category_name = await Category.findOne({where:{id:category_id}})
       }
       //console.log(category_name);
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
        const { count, rows } = await Product.findAndCountAll({
            offset:offset,
            limit:limit,
            attributes: ['id','category_id','name','description','status','price','image'],
            include:[{ model: Category,attributes:["name"]}],
            where:where_con
          });
          console.log("rows",rows);
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
        console.log('here');
        await Product.update(
            {
                name:req.body.name,
                description	:req.body.description,
                status:req.body.status,
                price:req.body.price,
                image :req.file.path
            },
            {
              where: { id: req.params.id },
            }
          );
          return res.status(200).json({data:"Success"})

     }catch(e){
        console.log(e);
        return res.status(400).json({data:"Error"+e})

     }
 }

export default {AddProduct,ListProduct,deleteProduct,getCategoryName,updateProducts,getProductbyId}