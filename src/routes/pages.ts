import express, { Request, Response, NextFunction } from "express";
import { getHotelsForPages, getUserHotelsForDashboard } from "../controller/pagesController";
const router = express.Router();

/* GET users listing. */
// router.get("/login", (req, res) => {
//   res.render("login");
// });
// router.get("/signup", (req, res) => {
//   res.render("signup");
// });
//router.get("/", getHotelsForPages);
//router.get("/dashboard", getUserHotelsForDashboard);
//router.get("/admin", () => {});
//router.get("/delete", () => {});

export default router;
