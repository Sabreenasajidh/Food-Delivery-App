import Sequelize from 'sequelize'
import sequelize from './server.js'
import Role from '../models/roleModel.js'

let User = sequelize.define('users',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement : true
    },
    first_name:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    last_name:{
        type:Sequelize.STRING,
        allowNull:false

    },
    email : {
        type : Sequelize.STRING,
        isUnique :true,
        allowNull:false,
        validate:{
            isEmail : true
        }
    },
    phone_number:{
        type:Sequelize.INTEGER,
        allowNull:false,
        unique:true

    },
    password:{
        type:Sequelize.STRING,
        allowNull:false

    },
    password_salt:{
        type:Sequelize.STRING,
        allowNull:false

    },
    created_by:{
        type:Sequelize.INTEGER,
        allowNull:false,
    },
    status:{
        type:Sequelize.STRING,
        defaultValue:'active'
    },
    role_id:{
        type:Sequelize.INTEGER,
        defaultValue:3,
        references: {
            model: 'roles',
            key: 'id'
        }

    },
    subscribe:{
        type:Sequelize.BOOLEAN,
        defaultValue:false
    }

},
{    
    freezeTableName:true,
    indexes: [
        {
            name: 'first_name',
            fields: ['first_name']
        },
    ]
},
)

Role.hasMany(User,{foreignKey:'role_id'})
User.belongsTo(Role,{
    foreignKey : 'role_id',
    allowNull:false
})


export default User