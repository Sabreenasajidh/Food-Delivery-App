import Sequelize from 'sequelize'
import sequelize from './server.js'
import Product from './Product.js'
import User from './userModel.js'

let Order = sequelize.define('Orders',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement : true
    },
    reference_id:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    user_id:{
        type:Sequelize.INTEGER,
        allowNull:false

    },
    product_id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        // references: {
        //     model: 'products',
        //     key: 'id'
        // }
    },
    item_count:{
        type:Sequelize.INTEGER,
        allowNull:false,

    },
    amount:{
        type:Sequelize.INTEGER,
        allowNull:false

    }

},
{    
    freezeTableName:true,
})

Product.hasMany(Order,{foreignKey:'product_id'})
Order.belongsTo(Product,{
    foreignKey : 'product_id',
    allowNull:false
})
User.hasMany(Order,{foreignKey : 'user_id'})
Order.belongsTo(User,{
    foreignKey : 'user_id',
    allowNull:false
})

export default Order