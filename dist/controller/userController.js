"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.getUniqueListing = exports.updateUser = exports.getSingleUser = exports.getUsers = exports.loginUser = exports.createUser = void 0;
const uuid_1 = require("uuid");
const user_1 = require("../model/user");
const utils_1 = require("../utils/utils");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const listings_1 = require("../model/listings");
async function createUser(req, res, next) {
    const id = (0, uuid_1.v4)();
    try {
        const validationResult = utils_1.createUserSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            return res.status(400).json({
                error: validationResult.error.details[0].message,
            });
        }
        const duplicateEmail = await user_1.UserInstance.findOne({
            where: { email: req.body.email },
        });
        if (duplicateEmail) {
            return res.status(409).json({
                error: "Email is used, please change email",
            });
        }
        const duplicatePhoneNumber = await user_1.UserInstance.findOne({
            where: {
                phoneNumber: req.body.phoneNumber,
            },
        });
        if (duplicatePhoneNumber) {
            res.status(409);
            res.json({
                error: "Phone number is used",
            });
        }
        const passwordHash = await bcryptjs_1.default.hash(req.body.password, 8);
        const record = await user_1.UserInstance.create({
            id,
            fullName: req.body.fullName,
            email: req.body.email,
            password: passwordHash,
            phoneNumber: req.body.phoneNumber,
        });
        res.redirect('/login');
        // res.status(201).json({
        //   msg: "You have successfully created a user",
        //   record,
        // });
    }
    catch (error) {
        console.log(error);
    }
}
exports.createUser = createUser;
async function loginUser(req, res, next) {
    const id = (0, uuid_1.v4)();
    try {
        const validationResult = utils_1.loginUserSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            return res.status(400).json({
                Error: validationResult.error.details[0].message,
            });
        }
        const user = (await user_1.UserInstance.findOne({
            where: { email: req.body.email },
            include: [{ model: listings_1.HotelListingInstance, as: "Listings" }]
        }));
        //console.log(user);
        if (!user) {
            res.status(401);
            res.json({
                message: "user does not exist",
            });
        }
        const { id } = user;
        const token = (0, utils_1.generateToken)({ id });
        console.log(token);
        const validUser = await bcryptjs_1.default.compare(req.body.password, user.password);
        if (!validUser) {
            res.status(401);
            res.json({
                message: "Password do not match",
            });
        }
        if (validUser) {
            res.cookie("token", token, {
                maxAge: 1000 * 60 * 60 * 24,
                //sameSite: "strict",
                httpOnly: true,
            });
            res.cookie("id", id, {
                maxAge: 1000 * 60 * 60 * 24,
                //sameSite: "strict",
                httpOnly: true,
            });
            res.redirect('/dashboard');
            // res.json({
            //   message: "Successfully logged in",
            //   token,
            //   user,
            // });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500);
        console.log(err);
    }
}
exports.loginUser = loginUser;
// Get all users
async function getUsers(req, res, next) {
    try {
        const limit = req.query?.limit;
        const offset = req.query?.offset;
        //  const record = await TodoInstance.findAll({where: {},limit, offset})
        const record = await user_1.UserInstance.findAndCountAll({
            limit,
            offset,
            include: [
                {
                    model: listings_1.HotelListingInstance,
                    as: "Listings",
                },
            ],
        });
        //res.render("index")
        res.status(200).json({
            msg: "You have successfully fetch all HotelList",
            count: record.count,
            record: record.rows,
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "failed to get users",
            route: "/getUser",
        });
    }
}
exports.getUsers = getUsers;
// Get single User
async function getSingleUser(req, res, next) {
    try {
        const { id } = req.params;
        const record = await user_1.UserInstance.findOne({
            where: {
                id,
            },
        });
        res.status(200).json({
            message: `You have successfully retrieved a user with the id of ${id}`,
            record,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "failed to get user",
            route: "/read/:id",
        });
    }
}
exports.getSingleUser = getSingleUser;
async function updateUser(req, res, next) {
    try {
        const { id } = req.params;
        const { email, password, fullName, phoneNumber } = req.body;
        const validationResult = utils_1.updateUserSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            return res.status(400).json({
                error: validationResult.error.details[0].message,
            });
        }
        const record = await user_1.UserInstance.findOne({
            where: {
                id,
            },
        });
        if (!record) {
            return res.status(404).json({
                error: "Cannot find user",
            });
        }
        const updateRecord = await record.update({
            email,
            password,
            fullName,
            phoneNumber,
        });
        res.status(202).json({
            message: `You have successfully updated user with the id of ${id}`,
            updateRecord,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "failed to update user",
            route: "/update/:id",
        });
    }
}
exports.updateUser = updateUser;
async function getUniqueListing(req, res, next) {
    let id = req.cookies.id;
    try {
        const record = await user_1.UserInstance.findOne({ where: { id },
            include: [{ model: listings_1.HotelListingInstance, as: 'Listings' }]
        });
        res.render("dashboardList", { record });
    }
    catch (error) {
        res.status(500).json({
            msg: "failed to read",
            route: "/read",
        });
    }
}
exports.getUniqueListing = getUniqueListing;
async function deleteUser(req, res, next) {
    try {
        const { id } = req.params;
        const record = await user_1.UserInstance.findOne({
            where: {
                id,
            },
        });
        if (!record) {
            return res.status(404).json({
                error: "User does not exist",
            });
        }
        const deletedRecord = await record.destroy();
        return res.status(200).json({
            message: `User with the id of ${id} has been successfully deleted`,
            deletedRecord,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "failed to delete user",
            route: "/delete/:id",
        });
    }
}
exports.deleteUser = deleteUser;
