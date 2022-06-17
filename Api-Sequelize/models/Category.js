import Sequelize from 'sequelize'
import sequelize from './server.js'

let Category = sequelize.define('categories',{
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
    }
},{
    freezeTableName:true
})
export default Category