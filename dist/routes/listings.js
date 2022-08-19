"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const hotelListController_1 = require("../controller/hotelListController");
const auth_1 = require("../middleware/auth");
/* GET home page. */
// router.get("/", (req,res)=>{
//   res.send("hello stan")
// });
router.get('/', hotelListController_1.getHotels);
router.get('/new', (req, res) => {
    res.render('new');
});
router.post('/', auth_1.auth, hotelListController_1.createHotel);
router.get('/:id/update', async (req, res, next) => {
    let record = await (0, hotelListController_1.getSingleHotel)(req, res, next);
    res.render("update", { record });
});
router.post('/:id', auth_1.auth, hotelListController_1.updateHotel);
router.post('/delete/:id', auth_1.auth, hotelListController_1.deleteHotel);
router.get("/logout", (req, res, next) => {
    res.status(200).clearCookie("id").clearCookie("token").redirect("/hotels");
});
exports.default = router;
