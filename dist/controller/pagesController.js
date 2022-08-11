"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserHotelsForDashboard = exports.getHotelsForPages = void 0;
const user_1 = require("../model/user");
const listings_1 = require("../model/listings");
async function getHotelsForPages(req, res, next) {
    try {
        const id = req.cookies.user;
        const offset = req.query.offset;
        const limit = req.query.limit;
        const record = await listings_1.HotelListingInstance.findAndCountAll({
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
        res.status(200).render("index", { listings: record.rows, user: id });
    }
    catch (error) {
        res.status(500).json({
            message: "failed to getHotels",
            route: "/",
        });
    }
}
exports.getHotelsForPages = getHotelsForPages;
async function getUserHotelsForDashboard(req, res, next) {
    try {
        const id = req.cookies.user;
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
        res.render("dashboard", { hotels: record.rows });
    }
    catch (error) {
        console.log(req);
        // console.log(error);
        res.status(500).json({
            error: "Failed to get Hotels",
            route: "/user/getHotels/:id",
        });
    }
}
exports.getUserHotelsForDashboard = getUserHotelsForDashboard;
