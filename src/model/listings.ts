import { DataTypes, Model } from "sequelize";
import db from '../config/databaseConfig'

interface HotelListingAttributes {
    description: string;
    image: string;
    address: string;
    price: number;
    numOfBeds: number;
    numOfBaths: number;
    rating: number;
    id: string;
    userID: string;
}

export class HotelListingInstance extends Model<HotelListingAttributes> {}

HotelListingInstance.init(
    {
        description: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        image: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        address: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        price: {
          type: DataTypes.NUMBER,
          allowNull: false,
        },
        numOfBeds: {
          type: DataTypes.NUMBER,
          allowNull: false,
        },
        numOfBaths: {
          type: DataTypes.NUMBER,
          allowNull: false,
        },
        rating: {
          type: DataTypes.NUMBER,
          allowNull: false,
        },
        id: {
          type: DataTypes.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },
        userID: {
          type: DataTypes.STRING,
        },
      },
      {
        sequelize: db,
        tableName: "Listings",
      }
    );
