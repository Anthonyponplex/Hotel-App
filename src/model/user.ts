import { DataTypes, Model } from "sequelize";
import db from '../config/databaseConfig'
import { HotelListingInstance } from "./listings";

interface UsersAttributes {
  id: string;
  fullName:string;
  email:string;
  phoneNumber:string;
  password:string
}

export class UserInstance extends Model<UsersAttributes> {}

UserInstance.init({
  id: {
    type:DataTypes.UUIDV4,
    primaryKey:true,
    allowNull:false
  },
  fullName:{
     type:DataTypes.STRING,
     allowNull:false,
     validate:{
         notNull:{
             msg:'full Name is required'
         },
         notEmpty:{
             msg:'Please provide a full Name'
         }
     }
  },

  email:{
    type:DataTypes.STRING,
    allowNull:false,
    unique:true,
    validate:{
        notNull:{
            msg:'Email is required'
        },
        isEmail:{
            msg:'Please provide a a valid Email'
        }
    }
  },
  phoneNumber:{
    type:DataTypes.STRING,
    allowNull:false,
    unique:true,
    validate:{
        notNull:{
            msg:'phone number is required'
        },
        notEmpty:{
            msg:'Please provide a valid phone number'
        }
    } 
  },
  password:{
    type:DataTypes.STRING,
    allowNull:false,
    validate:{
        notNull:{
            msg:'password is required'
        },
        notEmpty:{
            msg:'Please provide a password'
        }
    }
  }
},{
    sequelize:db,
    tableName:'Users'
});

UserInstance.hasMany(HotelListingInstance, {foreignKey:'userID',
as:'Listings'
})

HotelListingInstance.belongsTo(UserInstance,{foreignKey:'userID',
as:'Users'}) 
