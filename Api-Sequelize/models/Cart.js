import Sequelize from 'sequelize'
import sequelize from './server.js'
import Product from './Product.js'
import User from './userModel.js'


let Cart = sequelize.define('Cart',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement : true
    },
    product_name:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    count:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    user_id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        // references: {
        //     model: 'users',
        //     key: 'id'
        // }
    },
    product_id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        // references: {
        //     model: 'prodcuts',
        //     key: 'id'
        // }
    }
},{
    freezeTableName:true
})
Product.hasMany(Cart,{foreignKey:'product_id'})
Cart.belongsTo(Product,{
    foreignKey : 'product_id',
    allowNull:false
})
User.hasMany(Cart,{foreignKey : 'user_id'})
Cart.belongsTo(User,{
    foreignKey : 'user_id',
    allowNull:false
})


export default Cart