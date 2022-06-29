import Sequelize from 'sequelize'
import sequelize from '../../models/server'
import Category from '../../models/Category'

let Product = sequelize.define('products',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement : true
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    description:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    status:{
        type:Sequelize.STRING,
        defaultValue:'active',
    },
    price:{
        type:Sequelize.INTEGER,
        allowNull:false,
    },
    image:{
        type:Sequelize.STRING,
        allowNull:false,
    },
},{
    freezeTableName:true
})
Category.hasMany(Product,{foreignKey:'category_id'})
Product.belongsTo(Category,{
    foreignKey : 'category_id',
    allowNull:false
})
export default Product