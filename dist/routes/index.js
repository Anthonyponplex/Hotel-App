"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
const hotelListController_1 = require("../controller/hotelListController");
router.post('/create', auth_1.auth, hotelListController_1.hotelLists);
router.get('/read', hotelListController_1.getHotelLists);
router.get('/read/:id', hotelListController_1.getSingleHotelList);
router.patch('/update/:id', auth_1.auth, hotelListController_1.updateHotelLists);
router.delete('/delete/:id', auth_1.auth, hotelListController_1.deleteHotelLists);
exports.default = router;
