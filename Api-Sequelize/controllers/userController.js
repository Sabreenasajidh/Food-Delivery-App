import User from '../models/userModel.js'
import Role from '../models/roleModel.js'
import Cart from '../models/Cart.js';
import Order from '../models/Orders.js';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer'
import  config  from '../config/dbConfig.js';
import Product from '../models/Product.js';
import Sequelize from 'sequelize';
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
        console.log(req.user.id);
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
        const {body} = req
        const role = await Role.findOne({where:{role_name:body.role}})
        const role_id = role.id
        body.role_id = role_id
       await User.update(
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
        const reqData = ['product_id','product_name']
        reqData.forEach(element => {
            if(!body[element] ||body[element] === null) 
            throw ({data: element+' missing'});
        });  
        const data = await Cart.findOne({where:{user_id:req.user.id,product_id:req.body.product_id}})
        if(req.body.count == 0){
            await Cart.destroy({where:{user_id:req.query.id,product_id:req.body.product_id}});
        return res.status(200).json({data:'success'})

        }
        if(data){
            await Cart.update(
                {count:req.body.count},
                {where: { user_id: req.query.id,product_id:req.body.product_id }}
            );
            return res.status(200).json({data:"Success"})

        }else{
            body.user_id = req.query.id
            await Cart.create(body)
            return res.status(200).json({data:"Success"})
        }
    }catch(e){
        return res.status(400).json(e)
    }

}

const listcartItems = async(req,res)=>{
    try{
       const list = await Cart.findAll({where:{user_id:req.user.id},
        include:[{ model: Product}]
       })
       return res.status(200).json({data:list})
    }catch(e){
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
        //const data = await Order.findAll({where:{user_id:req.user.id}, include:[{ model: Product}]})
        const data = await Order.findAll(
            {
                where:{ user_id:req.user.id}, 
                attributes:['reference_id','item_count','amount','createdAt'],
                include: [{
                    model: Product,
                    attributes: ['name','price'],
                }]
            },
            {group: 'reference_id'}
        )
    //    const data =  await Order.findAll({where:{user_id:req.user.id},include:[{ model: Product}]})
        console.log(req.user.id);
        return res.status(200).json({data:data})
    }catch(e){
        console.log(e);
        return res.status(400).json(e)
    }
}
const deleteCart = async(req,res)=>{
    try{
        const {query} = req
        await Cart.destroy({where: query });
        return res.status(200).json({data:'success'})
    }catch(e){
        console.log(e);
        return res.status(400).json(e)
    }

}
const getCount = async(req,res)=>{
    try{

        // const {rows,count} = await Cart.findAndCountAll({where:{ user_id:req.user.id} });
        const result = await Cart.sum('count', {where:{ user_id:req.user.id} })
        console.log(result);
        return res.status(200).json({count:result})
    }catch(e){
        console.log(e);
        return res.status(400).json({e})
    }

}
const forgetPassword = async(req,res)=>{
    try{
        const user=await User.findOne({where:{ email:req.body.email}})
        
        if(user){
            const secret = config.JWT_TOKEN+user.password
            const payload = {
                email:user.email,
                id:user.id
            }
            let token = jwt.sign(resl, JWT_TOKEN, { expiresIn: '60m' });
            const token = jwt.sign(payload,secret,{expiresIn:'15m'})
            console.log(token);
            const link = `http://localhost:3000/reset-password/${user.id}/${token}`
            console.log(link);

            let details = {
                from:config.AUTH_USER,
                to:req.body.email,
                subject:'Resest Password',
                text:'Click the link to reset password '+ link
            }
            mailTransporter.sendMail(details,err=>{
                if(err){
    
                    console.log(err,"Error........");
                }
                else{
                    console.log("Mail send Successfully........");
                }
            })

            return res.status(200).json({data:'reset mail send to your mail'})
        }else{
            return res.status(400).json({data:'No such email exist'})
        }

    }catch(e){
        return res.status(400).json({data:'error'})
    }

}

const resetPassword = async(req,res)=>{
    try{
        const {body} = req         
        const reqData = ['password','confirm_password']
    
        reqData.forEach(element => {
            if(!body[element] ||body[element] === null) 
            throw {message:'Field Missing '+ element };
        });
         if(body.password !== body.confirm_password) {
            throw {message:'Password doesnot match '+ element };
        }    
        const salt =  bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password,salt)
        body.password_salt = salt 
        body.password = hash
        console.log(req.body);
        await User.update({'password':body.password,'password_salt':body.password_salt},{where:{'id':req.body.id}})

    }catch(e){
        console.log(e);
        return res.status(400).json({data:'error'})
    }

}
export default {
    signUp,login,forgetPassword,resetPassword,
    listUsers,addUser,getRole,updateUser,deleteUser,
    addorUpdateCart,listcartItems,deleteCart,
    addOrder,listOrder,getCount
    }