import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import { UserInstance } from "../model/user";
import {
  createUserSchema,
  generateToken,
  loginUserSchema,
  options,
  updateUserSchema,
} from "../utils/utils";
import bcrypt from "bcryptjs";
import { HotelListingInstance } from "../model/listings";

export async function createUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = uuidv4();
  try {
    const validationResult = createUserSchema.validate(req.body, options);
    if (validationResult.error) {
      return res.status(400).json({
        error: validationResult.error.details[0].message,
      });
    }
    const duplicateEmail = await UserInstance.findOne({
      where: { email: req.body.email },
    });
    if (duplicateEmail) {
      return res.status(409).json({
        error: "Email is used, please change email",
      });
    }
    const duplicatePhoneNumber = await UserInstance.findOne({
        where: {
          phoneNumber: req.body.phoneNumber,
        },
      });
    if (duplicatePhoneNumber) {
    res.status(409)
    res.json({
        error: "Phone number is used",
      });
    }
    const passwordHash = await bcrypt.hash(req.body.password, 8);
    const record = await UserInstance.create({
      id,
      fullName: req.body.fullName,
      email: req.body.email,
      password: passwordHash,
      phoneNumber: req.body.phoneNumber,
    });
    res.redirect('/login')
    // res.status(201).json({
    //   msg: "You have successfully created a user",
    //   record,
    // });
  } catch (error) {
    console.log(error);
  }
}

export async function loginUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = uuidv4();
  try {
    const validationResult = loginUserSchema.validate(req.body, options);
    if (validationResult.error) {
      return res.status(400).json({
        Error: validationResult.error.details[0].message,
      });
    }
    const user = (await UserInstance.findOne({
      where: { email: req.body.email },
      include:[{model:HotelListingInstance, as:"Listings"}]
    })) as unknown as { [key: string]: string };
    //console.log(user);

    if (!user) {
      res.status(401);
      res.json({
        message: "user does not exist",
      });
    }

    const { id } = user;
    const token = generateToken({ id });
    console.log(token);
    const validUser = await bcrypt.compare(req.body.password, user.password);

    if (!validUser) {
      res.status(401);
      res.json({
        message: "Password do not match",
      });
    }

    if (validUser) {
        res.cookie("token", token, {
          maxAge: 1000 * 60 * 60 * 24,
          //sameSite: "strict",
          httpOnly: true,
        })
        res.cookie("id", id, {
          maxAge: 1000 * 60 * 60 * 24,
          //sameSite: "strict",
          httpOnly: true,
        });
        res.redirect('/dashboard')
      // res.json({
      //   message: "Successfully logged in",
      //   token,
      //   user,
      // });
    }
  } catch (err) {
    console.log(err);
    res.status(500);
    console.log(err);
  }
}
// Get all users
export async function getUsers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const limit = req.query?.limit as number | undefined;
    const offset = req.query?.offset as number | undefined;
    //  const record = await TodoInstance.findAll({where: {},limit, offset})
    const record = await UserInstance.findAndCountAll({
      limit,
      offset,
      include: [
        {
          model: HotelListingInstance,
          as: "Listings",
        },
      ],
    });
    //res.render("index")
    res.status(200).json({
      msg: "You have successfully fetch all HotelList",
      count: record.count,
      record: record.rows,
    });
  } catch (error) {
    res.status(500).json({
      msg: "failed to get users",
      route: "/getUser",
    });
  }
}
// Get single User

export async function getSingleUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const record = await UserInstance.findOne({
      where: {
        id,
      },
    });
    res.status(200).json({
      message: `You have successfully retrieved a user with the id of ${id}`,
      record,
    });
  } catch (error) {
    res.status(500).json({
      message: "failed to get user",
      route: "/read/:id",
    });
  }
}

export async function updateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const { email, password, fullName, phoneNumber } = req.body;
    const validationResult = updateUserSchema.validate(req.body, options);
    if (validationResult.error) {
      return res.status(400).json({
        error: validationResult.error.details[0].message,
      });
    }
    const record = await UserInstance.findOne({
      where: {
        id,
      },
    });
    if (!record) {
      return res.status(404).json({
        error: "Cannot find user",
      });
    }
    const updateRecord = await record.update({
      email,
      password,
      fullName,
      phoneNumber,
    });

    res.status(202).json({
      message: `You have successfully updated user with the id of ${id}`,
      updateRecord,
    });
  } catch (error) {
    res.status(500).json({
      message: "failed to update user",
      route: "/update/:id",
    });
  }
}

export async function getUniqueListing(req:Request,res:Response,next:NextFunction){
  let id = req.cookies.id
  try{
    const record = await UserInstance.findOne({where:{id},
    include:[{model:HotelListingInstance, as:'Listings'}]
    })
    res.render("dashboardList",{record})
  }catch(error){
    res.status(500).json({
      msg:"failed to read",
      route: "/read",
    })
  }
  
}

export async function deleteUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const record = await UserInstance.findOne({
      where: {
        id,
      },
    });
    if (!record) {
      return res.status(404).json({
        error: "User does not exist",
      });
    }
    const deletedRecord = await record.destroy();
    return res.status(200).json({
      message: `User with the id of ${id} has been successfully deleted`,
      deletedRecord,
    });
  } catch (error) {
    res.status(500).json({
      message: "failed to delete user",
      route: "/delete/:id",
    });
  }
}
