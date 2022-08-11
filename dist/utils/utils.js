"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = exports.generateToken = exports.updateListingSchema = exports.createListingSchema = exports.updateUserSchema = exports.loginUserSchema = exports.createUserSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// import dotenv from 'dotenv';
exports.createUserSchema = joi_1.default.object().keys({
    fullName: joi_1.default.string().required(),
    email: joi_1.default.string().trim().lowercase().required(),
    password: joi_1.default.string()
        .regex(/^[a-zA-Z0-9]{3,30}$/)
        .required(),
    phoneNumber: joi_1.default.string()
        .length(11)
        .pattern(/^[0-9]+$/)
        .required(),
    confirmPassword: joi_1.default.ref("password"),
})
    .with("password", "confirmPassword");
// dotenv.config()
exports.loginUserSchema = joi_1.default.object().keys({
    email: joi_1.default.string().trim().lowercase().required(),
    password: joi_1.default.string()
        .regex(/^[a-zA-Z0-9]{3,30}$/)
        .required(),
});
exports.updateUserSchema = joi_1.default.object().keys({
    fullName: joi_1.default.string(),
    email: joi_1.default.string().lowercase(),
    password: joi_1.default.string(),
    phoneNumber: joi_1.default.string(),
});
exports.createListingSchema = joi_1.default.object().keys({
    description: joi_1.default.string().required(),
    image: joi_1.default.string().required(),
    address: joi_1.default.string().required(),
    price: joi_1.default.number().required(),
    numOfBeds: joi_1.default.number().required(),
    numOfBaths: joi_1.default.number().required(),
    rating: joi_1.default.number().required(),
});
exports.updateListingSchema = joi_1.default.object().keys({
    description: joi_1.default.string(),
    image: joi_1.default.string(),
    address: joi_1.default.string(),
    price: joi_1.default.number(),
    numOfBeds: joi_1.default.number(),
    numOfBaths: joi_1.default.number(),
    rating: joi_1.default.number(),
});
//Generate Token
const generateToken = (user) => {
    const password = process.env.JWT_SECRET;
    return jsonwebtoken_1.default.sign(user, password, { expiresIn: "7d" });
};
exports.generateToken = generateToken;
exports.options = {
    abortEarly: false,
    errors: {
        wrap: {
            label: "",
        },
    },
};
