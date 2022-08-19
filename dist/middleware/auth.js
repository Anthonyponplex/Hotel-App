"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth2 = exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../model/user");
const secret = process.env.JWT_SECRET;
async function auth(req, res, next) {
    try {
        const authorization = req.cookies.token;
        if (!authorization) {
            return res.status(401).json({
                Error: 'Kindly sign in as a user'
            });
        }
        //const token = authorization?.slice(7, authorization.length) as string
        const token = authorization;
        let verified = jsonwebtoken_1.default.verify(token, secret);
        if (!verified) {
            return res.status(401).json({
                Error: 'User not verified, you cant access this route'
            });
        }
        const { id } = verified;
        console.log("User id ", id);
        const user = await user_1.UserInstance.findOne({ where: { id } });
        if (!user) {
            return res.status(404).json({
                Error: 'User not verified'
            });
        }
        req.user = id;
        next();
    }
    catch (error) {
        res.status(403).json({
            Error: 'User not logged in'
        });
    }
}
exports.auth = auth;
async function auth2(req, res, next) {
    try {
        const authorization = req.cookies.token;
        if (!authorization) {
            return res.redirect("/login");
        }
        //const token = authorization?.slice(7, authorization.length) as string
        const token = authorization;
        let verified = jsonwebtoken_1.default.verify(token, secret);
        if (!verified) {
            return res.status(401).json({
                Error: 'User not verified, you cant access this route'
            });
        }
        const { id } = verified;
        console.log("User id ", id);
        const user = await user_1.UserInstance.findOne({ where: { id } });
        if (!user) {
            return res.status(404).json({
                Error: 'User not verified'
            });
        }
        req.user = id;
        next();
    }
    catch (error) {
        res.status(403).json({
            Error: 'User not logged in'
        });
    }
}
exports.auth2 = auth2;
