import express from "express";
const router = express.Router();
import {
  deleteUser,
  getSingleUser,
  getUsers,
  updateUser,
  createUser,
  loginUser,
} from "../controller/userController";

/* GET users listing. */
router.post("/create", createUser);
router.post("/login", loginUser);
router.get("/getUsers", getUsers);
router.get("/getUsers/:id", getSingleUser);
router.patch("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);

export default router;