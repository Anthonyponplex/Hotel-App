import express from "express";
import {
  createHotel,
  deleteHotel,
  getHotels,
  getSingleHotel,
  getUserHotels,
  updateHotel,
} from "../controller/hotelListController";
import { auth } from "../middleware/auth";
const router = express.Router();

/* GET home page. */
router.post("/create", auth, createHotel);
router.get("/getHotels", getHotels);
router.get("/getHotels/:id", getSingleHotel);
router.get("/user/getHotels/:id", getUserHotels);
router.patch("/update/:id", auth, updateHotel);
router.delete("/delete/:id", auth, deleteHotel);

export default router;
