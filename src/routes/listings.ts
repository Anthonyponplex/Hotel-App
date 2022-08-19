import express from "express";



const router = express.Router();
import {
  createHotel,
  deleteHotel,
  getHotels,
  getSingleHotel,
  getUserHotels,
  updateHotel,
} from "../controller/hotelListController";
import { auth } from "../middleware/auth";

/* GET home page. */
// router.get("/", (req,res)=>{
//   res.send("hello stan")
// });

router.get('/new',(req,res)=>{
  res.render('new')
})
router.post('/',auth,createHotel)

router.get('/:id/update',async (req,res,next)=>{
  let record = await getSingleHotel(req,res,next)
  res.render("update",{record})
})

router.post('/:id',auth,updateHotel)
router.post('/delete/:id',auth,deleteHotel)
router.get("/logout", (req,res, next) => {
  res.status(200).clearCookie("id").clearCookie("token").redirect("/hotels") 
}) 
export default router;
