"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteHotel = exports.updateHotel = exports.getUserHotels = exports.getSingleHotel = exports.getHotels = exports.createHotel = void 0;
// import { number } from "joi";
const listings_1 = require("../model/listings");
const uuid_1 = require("uuid");
const user_1 = require("../model/user");
const utils_1 = require("../utils/utils");
async function createHotel(req, res, next) {
    const id = (0, uuid_1.v4)();
    const userID = req.user;
    try {
        const validationResult = utils_1.createListingSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            console.log(validationResult.error);
            return res.status(400).json({
                Error: validationResult.error.details[0].message,
            });
        }
        const record = await listings_1.HotelListingInstance.create({
            id,
            ...req.body,
            userID
        });
        res.redirect("/dashboard");
        // res.status(201).json({
        //   msg: "You have successfully created a HotelList",
        //   record,
        // });
    }
    catch (err) {
        res.status(500).json({
            message: "failed to create"
        });
    }
}
exports.createHotel = createHotel;
async function getHotels(req, res, next) {
    try {
        const limit = req.query?.limit;
        const offset = req.query?.offset;
        const record = await listings_1.HotelListingInstance.findAll({
            limit,
            offset,
            include: [
                {
                    model: user_1.UserInstance,
                    attributes: ["id", "fullName", "email", "phoneNumber"],
                    as: "Users",
                },
            ],
        });
        res.render("index", { record });
        // res.status(200).json({
        //   msg: "You have successfully fetch all hotelLists",
        //   // count: record
        //   records: record
        // });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "failed to read",
            route: "/getHotels",
        });
    }
}
exports.getHotels = getHotels;
async function getSingleHotel(req, res, next) {
    try {
        const { id } = req.params;
        const record = await listings_1.HotelListingInstance.findOne({ where: { id } });
        if (!record) {
            return res.status(404).json({
                error: "cannot find hotel",
            });
        }
        return record;
        // res.status(200).json({
        //   msg: `you successfully gotten the hotel information with the id of ${id}`,
        //   record,
        // });
    }
    catch (error) {
        console.log(error);
    }
}
exports.getSingleHotel = getSingleHotel;
async function getUserHotels(req, res, next) {
    try {
        const { id } = req.params;
        const offset = req.query.offset;
        const limit = req.query.limit;
        const record = await listings_1.HotelListingInstance.findAndCountAll({
            where: {
                userID: id,
            },
            limit,
            offset,
        });
        res.status(200);
        res.json({
            message: `Hotels by User with the id of ${id}`,
            record,
        });
    }
    catch (error) {
        // console.log(error);
        res.status(500).json({
            error: "Failed to get Hotels",
            route: "/user/getHotels/:id",
        });
    }
}
exports.getUserHotels = getUserHotels;
async function updateHotel(req, res, next) {
    try {
        const { id } = req.params;
        const userID = req.user;
        const { description, image, address, price, numOfBeds, numOfBaths, rating, } = req.body;
        const validationResult = utils_1.updateListingSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            return res.status(400).json({
                Error: validationResult.error.details[0].message,
            });
        }
        const record = await listings_1.HotelListingInstance.findOne({ where: { id } });
        if (!record) {
            return res.status(404).json({
                Error: "Cannot find existing hotel",
            });
        }
        if (userID != record.getDataValue("userID")) {
            return res.status(401).json({
                error: "User Not Authorized",
            });
        }
        const updatedRecord = await record.update({
            description,
            image,
            address,
            price,
            numOfBeds,
            numOfBaths,
            rating,
        });
        res.redirect('/dashboard');
        // res.status(200).json({
        //   msg: "You have successfully updated your hotel",
        //   updatedRecord,
        // });
    }
    catch (error) {
        console.log(error);
    }
}
exports.updateHotel = updateHotel;
async function deleteHotel(req, res, next) {
    try {
        const { id } = req.params;
        const userID = req.user;
        const record = await listings_1.HotelListingInstance.findOne({ where: { id } });
        if (!record) {
            return res.status(404).json({
                msg: "Hotel does not exist",
            });
        }
        if (userID != record.getDataValue("userID")) {
            return res.status(401).json({
                error: "User Not Authorized",
            });
        }
        const deletedRecord = await record.destroy();
        res.redirect('/dashboard');
        // return res.status(200).json({
        //   msg: `hotel with the id of ${id} has been deleted successfully`,
        //   deletedRecord,
        // });
    }
    catch (error) {
        console.log(error);
    }
}
exports.deleteHotel = deleteHotel;
