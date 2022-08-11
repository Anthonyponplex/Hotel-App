"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const hotelListController_1 = require("../controller/hotelListController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
/* GET home page. */
router.post("/create", auth_1.auth, hotelListController_1.createHotel);
router.get("/getHotels", hotelListController_1.getHotels);
router.get("/getHotels/:id", hotelListController_1.getSingleHotel);
router.get("/user/getHotels/:id", hotelListController_1.getUserHotels);
router.patch("/update/:id", auth_1.auth, hotelListController_1.updateHotel);
router.delete("/delete/:id", auth_1.auth, hotelListController_1.deleteHotel);
exports.default = router;
