import Joi from 'joi'
import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';
export const createUserSchema = Joi.object().keys({
    fullName: Joi.string().required(),
    email: Joi.string().trim().lowercase().required(),
    password: Joi.string()
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .required(),
    phoneNumber: Joi.string()
      .length(11)
      .pattern(/^[0-9]+$/)
      .required(),
    confirmPassword: Joi.ref("password"),
})
.with("password", "confirmPassword");

// dotenv.config()

export const loginUserSchema = Joi.object().keys({
    email: Joi.string().trim().lowercase().required(),
    password: Joi.string()
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .required(),
  });

export const updateUserSchema = Joi.object().keys({
  fullName: Joi.string(),
  email: Joi.string().lowercase(),
  password: Joi.string(),
  phoneNumber: Joi.string(),
});

export const createListingSchema = Joi.object().keys({
    description: Joi.string().required(),
    image: Joi.string().required(),
    address: Joi.string().required(),
    price: Joi.number().required(),
    numOfBeds: Joi.number().required(),
    numOfBaths: Joi.number().required(),
    rating: Joi.number().required(),
})

export const updateListingSchema = Joi.object().keys({
  description: Joi.string(),
  image: Joi.string(),
  address: Joi.string(),
  price: Joi.number(),
  numOfBeds: Joi.number(),
  numOfBaths: Joi.number(),
  rating: Joi.number(),
});

//Generate Token
export const generateToken = (user: {[key: string]: unknown}): unknown => {
    const password = process.env.JWT_SECRET as string;
    return jwt.sign(user, password, { expiresIn: "7d" });  
};

export const options ={  
    abortEarly:false,
    errors:{
        wrap:{
            label: "",
        },
    },
};