"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const userController_1 = require("../controller/userController");
/* GET users listing. */
router.post("/create", userController_1.createUser);
router.post("/login", userController_1.loginUser);
router.get("/getUsers", userController_1.getUsers);
router.get("/getUsers/:id", userController_1.getSingleUser);
router.patch("/update/:id", userController_1.updateUser);
router.delete("/delete/:id", userController_1.deleteUser);
exports.default = router;
