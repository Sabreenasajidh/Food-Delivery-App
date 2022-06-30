import User from '../models/userModel.js'
import Role from '../models/roleModel.js'
import Cart from '../models/Cart.js';
import Order from '../models/Orders.js';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer'
import  config  from '../config/dbConfig.js';
import Sequelize from 'sequelize';
import Product from '../models/Product.js';
const Op = Sequelize.Op;
import crypto from 'crypto';

let mailTransporter = nodemailer.createTransport({service:'gmail',
auth:{  
    user:config.AUTH_USER,
    pass:config.AUTH_PASS
}})

function generateAccessToken(email,id) {
    return jwt.sign({
        email:email,
        id:id
        },config.JWT_TOKEN);
    //, { expiresIn: '1800s' }
  }
  

const signUp = async (req,res)=>{
    try{
        const {body} = req
        console.log(body);
        
        const reqData = ['first_name','last_name','email','phone_number','password','confirm_password']

        reqData.forEach(element => {
            if(!body[element] ||body[element] === null) 
            throw {message:'Field Missing '+ element };
        });
         if(body.password !== body.confirm_password) {
            throw {message:'Password doesnot match '+ element };
         } 
         const role = await Role.findOne({where:{role_name:'superadmin'}})              
        const salt =  bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password,salt)
        body.password_salt = salt 
        body.password = hash
        const user1 = await User.findOne({where:{role_id:role.id}}) 
        body.created_by = user1.id
        
        const user = await User.create(body)
        const roledet = await Role.findOne({where:{id:user.role_id}})
          
        const token = generateAccessToken(user.email,user.id);

        return res.status(200).json({
            token:token,
            email:user.email,
            first_name:user.first_name,
            id:user.id,
            role:roledet.role_name
            
        })

    }catch(err){
        console.log(err);
        return res.status(400).json({ 
            //error:console.log(err),
            error: err.message });
    }
}

const login = async(req,res)=>{
    try{
        const {body} = req
        console.log(body);
        const reqData = ["email","password"]
        reqData.forEach(field=>{
            if(!body[field] || body[field] === null) throw new Error(field +' Missing');
        })
        const user =await User.findOne({where:{email:req.body.email}})
        
        if(!user){
            throw new Error('Incorrect Email or Password')
        }
        else{

            const compPassword = bcrypt.compareSync(req.body.password,user.password)
            console.log(compPassword);
            if(compPassword){

                const roledet = await Role.findOne({where:{id:user.role_id}})
                const token = generateAccessToken(user.email,user.id);
                console.log("wdde");
                
                return res.status(200).json({
                    token:token,
                    email:user.email,
                    first_name:user.first_name,
                    id:user.id,
                    role:roledet.role_name
                    
                })
            }
            else throw new Error('Incorrect Email or Password')
        }
    
       
            
    }catch(e){
        console.log(e);
    return res.status(400).json({error :e.message})
   }
}

const listUsers = async(req,res)=>{
    try{
        let where_con = {}
        let param = req.query.role
        const limit = parseInt(req.query.limit)
        const offset = parseInt(req.query.offset)
        const pro_status = req.query.status
        const searchdata = req.query.searchdata

        if(pro_status){
            let  status = pro_status.toLowerCase()
              if(status == 'active' || status == 'inactive'){
                  where_con.status = status
              }
          }else{
           where_con= {
               status:{[Op.ne]: 'trash'}
             }
          }
        if (param && param !='0'){
             where_con.role_id = param
        }
        if(searchdata){
            where_con[Op.or]= {

                first_name: {
                    [Op.like]: '%'+searchdata+'%'
                },
                last_name: {
                    [Op.like]: '%'+searchdata+'%'
                }
            }
        }
        console.log(where_con);
          
        const { count, rows } = await User.findAndCountAll({
            offset:offset,
            limit:limit,
            attributes: ['id','role_id','first_name','last_name','email','phone_number','status'],
            where:where_con,
            include:[{ model: Role}]
        })
        
        let op = rows.map(elem=>{ 
            return {
                id:elem.id,
                first_name : elem.first_name,
                role:elem.role.role_name,
                last_name:elem.last_name,
                email:elem.email,
                phone_number:elem.phone_number,
                status:elem.status
            }
        })
        console.log(op);
    return res.status(200).json({data:op,count:count})

    }
    catch(e){
        console.log(e);
        return res.status(400).json({error :e.message})

    }

}

const addUser = async(req,res)=>{
    try{

        const {body} = req
        console.log(req.body);
        const reqData = ['first_name','last_name','email','phone_number','password']
        reqData.forEach(element => {
            if(!body[element] ||body[element] === null) 
            throw {message:'Field Missing '+ element };
        });  
        const user_exist = await User.findOne({where:{email:req.body.email}})
    
        if(user_exist){
            throw new Error('User Exist with same Email Id')
        }          
        const salt =  bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password,salt)
        body.password_salt = salt 
        body.password = hash
        body.created_by = req.user.id
        body.role_id= parseInt(req.body.role_id)
        console.log(body);

        const user = await User.create(body)

        let details = {
            from:config.AUTH_USER,
            to:req.body.email,
            subject:'Login Crediantials',
            text:'Hi..your random password is'+req.body.password
        }
        mailTransporter.sendMail(details,err=>{
            if(err){

                console.log("Error........");
            }
            else{
                console.log("Mail send Successfully........");
            }
        })
        return res.status(200).json({
            message:'Success'
            
        })

    }catch(err){
        console.log(err);
        return res.status(400).json({ 
            error: err.message });
    }

}
const getRole = async(req,res)=>{
    try{
        const role = await Role.findAll({
            attributes: ['id','role_name']})
        return res.status(200).json({
            data:role
        })
        
    }catch(e){
        return res.status(400).json({
            message:"Failed to load"+e
        })

    }
}
const updateUser = async(req,res)=>{
    try{
        console.log(req.body.role);
        const {body} = req
        const role = await Role.findOne({where:{role_name:body.role}})
        const role_id = role.id
        console.log(role_id);
        body.role_id = role_id
       const data = await User.update(
           {
               first_name:req.body.first_name,
               last_name:req.body.last_name,
               email:req.body.email,
               status:req.body.status,
               role_id:role_id
           },
           {where: { id: req.params.id }}
        );
         return res.status(200).json({data:"success"})

    }catch(e){
       console.log(e);
       return res.status(400).json({data:"Error"+e})

    }
}
const deleteUser = async(req,res)=>{
    try{
        console.log("Delete prodcut with id "+req.params.id);
        User.update(
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
const addorUpdateCart  =async(req,res)=>{
    try{
        const {body} = req
        const reqData = ['product_id','product_name','count']
        reqData.forEach(element => {
            if(!body[element] ||body[element] === null) 
            throw ({data: element+' missing'});
        });  
        const data = await Cart.findOne({where:{user_id:req.user.id,product_id:req.body.product_id}})
        if(data){
            await Cart.increment({count: req.body.count}, {where:{user_id:req.user.id,product_id:req.body.product_id}})
            return res.status(200).json({data:"Success"})

        }else{

            body.user_id = req.user.id
            await Cart.create(body)
            return res.status(200).json({data:"Success"})
        }
    }catch(e){
        console.log(e);
        return res.status(400).json(e)
    }

}
// const updateCart = async(req,res)=>{
//     try{
//         const {body} = req
//        const data = await User.update(
//            {count:req.body.count},
//            {where: { user_id: req.body.user_id,product_id:req.body.product_id }}
//         );
//          return res.status(200).json({data:"success"})

//     }catch(e){
//        return res.status(400).json({data:"Error"+e})

//     }
// }
const listcartItems = async(req,res)=>{
    try{

        console.log("List Cart Items");
       const list = await Cart.findAll({where:{user_id:req.user.id},
        include:[{ model: Product}]
       })
       console.log(list);
    //    const totalPrice= await Product.sum('price',{where:{user_id:req.user.id}});
    //    console.log(totalPrice);
       return res.status(200).json({data:list})
    }catch(e){
        console.log(e);
        return res.status(400).json(e)
    }   
}
const addOrder = async(req,res)=>{
    try{
        const {body} = req
        console.log(body);
        const dd = await Order.bulkCreate(body)
        console.log(dd);
        await Cart.destroy({
            where: {
              user_id: req.user.id
            }
          });
        
        return res.status(200).json({data:"Success"})
    }catch(e){
        console.log(e);
        return res.status(400).json(e)
        
    }
    
}
const listOrder = async(req,res)=>{
    try{
        
        const data = await Order.findAll({where:{user_id:req.user.id}, include:[{ model: Product}]})
    //    const data =  await Order.findAll({where:{user_id:req.user.id},include:[{ model: Product}]})
        console.log(data);
        return res.status(200).json({data:data})
    }catch(e){
        return res.status(400).json(e)
    }
}
const deleteCart = async(req,res)=>{
    try{

        console.log(req.query);
        const {query} = req
        await Cart.destroy({where: query });
        return res.status(200).json({data:'success'})
    }catch(e){
        console.log(e);
        return res.status(400).json(e)
    }

}
export default {signUp,login,listUsers,addUser,getRole,updateUser,deleteUser,addorUpdateCart,listcartItems,addOrder,listOrder,deleteCart}