import { Request, Response, NextFunction } from "express";
import { UserInstance } from "../model/user";
import { HotelListingInstance } from "../model/listings";

export async function getHotelsForPages(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = req.cookies.user;
    const offset = req.query.offset as number | undefined;
    const limit = req.query.limit as number | undefined;
    const record = await HotelListingInstance.findAndCountAll({
      limit,
      offset,
      include: [
        {
          model: UserInstance,
          attributes: ["id", "fullName", "email", "phoneNumber"],
          as: "Users",
        },
      ],
    });

    res.status(200).render("index", { listings: record.rows, user: id });
  } catch (error) {
    res.status(500).json({
      message: "failed to getHotels",
      route: "/",
    });
  }
}

export async function getUserHotelsForDashboard(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = req.cookies.user;
    const offset = req.query.offset as number | undefined;
    const limit = req.query.limit as number | undefined;
    const record = await HotelListingInstance.findAndCountAll({
      where: {
        userID: id,
      },
      limit,
      offset,
    });
    res.status(200);
    res.render("dashboard", { hotels: record.rows });
  } catch (error) {
    console.log(req);
    // console.log(error);
    res.status(500).json({
      error: "Failed to get Hotels",
      route: "/user/getHotels/:id",
    });
  }
}
