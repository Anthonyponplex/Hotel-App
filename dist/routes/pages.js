"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pagesController_1 = require("../controller/pagesController");
const router = express_1.default.Router();
/* GET users listing. */
router.get("/login", (req, res) => {
    res.render("login");
});
router.get("/signup", (req, res) => {
    res.render("signup");
});
router.get("/", pagesController_1.getHotelsForPages);
router.get("/dashboard", pagesController_1.getUserHotelsForDashboard);
router.get("/admin", () => { });
router.get("/delete", () => { });
exports.default = router;
