"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotelListingInstance = void 0;
const sequelize_1 = require("sequelize");
const databaseConfig_1 = __importDefault(require("../config/databaseConfig"));
class HotelListingInstance extends sequelize_1.Model {
}
exports.HotelListingInstance = HotelListingInstance;
HotelListingInstance.init({
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false,
    },
    numOfBeds: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false,
    },
    numOfBaths: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false,
    },
    rating: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false,
    },
    id: {
        type: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    userID: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    sequelize: databaseConfig_1.default,
    tableName: "Listings",
});
