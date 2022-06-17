import Sequelize from 'sequelize'
import sequelize from './server.js'

let Role = sequelize.define('roles',{
    
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement : true
    },
    role_name:{
        type:Sequelize.STRING,
        allowNull:false

    }

},
{
    freezeTableName:true
})


export default Role