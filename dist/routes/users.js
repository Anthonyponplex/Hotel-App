"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const userController_1 = require("../controller/userController");
const auth_1 = require("../middleware/auth");
/* GET users listing. */
router.get('/register', (req, res) => {
    res.render('register');
});
router.post('/register', userController_1.createUser);
router.get('/dashboard', auth_1.auth2, userController_1.getUniqueListing);
router.get('/login', (req, res) => {
    res.render("login");
});
router.post('/login', userController_1.loginUser);
//router.post("/create", createUser);
//router.post("/login", loginUser);
// router.get("/getUsers", getUsers);
// router.get("/getUsers/:id", getSingleUser);
// router.patch("/update/:id", updateUser);
// router.delete("/delete/:id", deleteUser);
exports.default = router;
