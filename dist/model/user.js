"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInstance = void 0;
const sequelize_1 = require("sequelize");
const databaseConfig_1 = __importDefault(require("../config/databaseConfig"));
const listings_1 = require("./listings");
class UserInstance extends sequelize_1.Model {
}
exports.UserInstance = UserInstance;
UserInstance.init({
    id: {
        type: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    fullName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'full Name is required'
            },
            notEmpty: {
                msg: 'Please provide a full Name'
            }
        }
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notNull: {
                msg: 'Email is required'
            },
            isEmail: {
                msg: 'Please provide a a valid Email'
            }
        }
    },
    phoneNumber: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notNull: {
                msg: 'phone number is required'
            },
            notEmpty: {
                msg: 'Please provide a valid phone number'
            }
        }
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'password is required'
            },
            notEmpty: {
                msg: 'Please provide a password'
            }
        }
    }
}, {
    sequelize: databaseConfig_1.default,
    tableName: 'Users'
});
UserInstance.hasMany(listings_1.HotelListingInstance, { foreignKey: 'userID',
    as: 'Listings'
});
listings_1.HotelListingInstance.belongsTo(UserInstance, { foreignKey: 'userID',
    as: 'Users' });
