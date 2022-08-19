import express from "express";
import { rmSync } from "fs";
import { getHotels } from "../controller/hotelListController";
const router = express.Router();
import {
  deleteUser,
  getSingleUser,
  getUsers,
  updateUser,
  createUser,
  loginUser,
  getUniqueListing
} from "../controller/userController";
import { auth2 } from "../middleware/auth";

/* GET users listing. */
router.get('/', getHotels)

router.get('/register',(req,res)=>{
  res.render('register')
})

router.post('/register',createUser)

router.get('/dashboard', auth2, getUniqueListing)
router.get('/login',(req,res)=>{
  res.render("login")
})
router.post('/login',loginUser)



//router.post("/create", createUser);
//router.post("/login", loginUser);
// router.get("/getUsers", getUsers);
// router.get("/getUsers/:id", getSingleUser);
// router.patch("/update/:id", updateUser);
// router.delete("/delete/:id", deleteUser);

export default router;