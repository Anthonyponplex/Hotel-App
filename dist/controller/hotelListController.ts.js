"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteHotelLists = exports.updateHotelLists = exports.getSingleHotelList = exports.getHotelLists = exports.hotelLists = void 0;
const uuid_1 = require("uuid");
const hotelList_1 = require("../model/hotelList.");
const utils_1 = require("../utils/utils");
async function hotelLists(req, res, next) {
    const id = (0, uuid_1.v4)();
    // let todo = {...req.body, id}
    try {
        const verified = req.user;
        const validationResult = utils_1.createHotelListSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            return res.status(400).json({
                Error: validationResult.error.details[0].message
            });
        }
        const record = await hotelList_1.HotelListInstance.create({
            id,
            ...req.body,
            userId: verified.id,
        });
        res.status(201).json({
            msg: "You have successfully created a HotelList",
            record
        });
    }
    catch (err) {
        res.status(500).json({
            msg: 'failed to create',
            route: '/create'
        });
    }
}
exports.hotelLists = hotelLists;
async function getHotelLists(req, res, next) {
    try {
        const limit = req.query?.limit;
        const offset = req.query?.offset;
        const record = await hotelList_1.HotelListInstance.findAndCountAll({ limit, offset,
            include: [{
                    model: UserInstance,
                    attributes: ['id', 'firstname', 'lastname', 'email', 'phonenumber'],
                    as: 'user'
                }
            ]
        });
        res.status(200).json({
            msg: "You have successfully fetch all hotelLists",
            count: record.count,
            records: record.rows,
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "failed to read",
            route: "/read"
        });
    }
}
exports.getHotelLists = getHotelLists;
async function getSingleHotelList(req, res, next) {
    try {
        const { id } = req.params;
        const record = await hotelList_1.HotelListInstance.findOne({ where: { id } });
        return res.status(200).json({
            msg: "Successfully gotten user information",
            record,
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "failed to read single todo",
            route: "/read/:id"
        });
    }
}
exports.getSingleHotelList = getSingleHotelList;
async function updateHotelLists(req, res, next) {
    try {
        const { id } = req.params;
        const { title, completed } = req.body;
        const validationResult = utils_1.updateHotelListSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            return res.status(400).json({
                Error: validationResult.error.details[0].message
            });
        }
        const record = await hotelList_1.HotelListInstance.findOne({ where: { id } });
        if (!record) {
            return res.status(404).json({
                Error: "Cannot find existing hotelList",
            });
        }
        const updatedrecord = await record.update({
            title: title,
            completed: completed
        });
        res.status(200).json({
            msg: "You have successfully updated you hotelList",
            updatedrecord
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "failed to update",
            route: "/update/:id"
        });
    }
}
exports.updateHotelLists = updateHotelLists;
async function deleteHotelLists(req, res, next) {
    try {
        const { id } = req.params;
        const record = await hotelList_1.HotelListInstance.findOne({ where: { id } });
        if (!record) {
            return res.status(404).json({
                msg: "Cannot find hotelList"
            });
        }
        const deletedRecord = await record.destroy();
        return res.status(200).json({
            msg: "hotelList deleted successfully",
            deletedRecord
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "failed to delete",
            route: "/delete/:id"
        });
    }
}
exports.deleteHotelLists = deleteHotelLists;
