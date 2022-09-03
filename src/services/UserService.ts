import User from "../database/schemas/User";
import { Request, Response } from "express";
import { ApiError, BadRequestError } from "../helpers/api-errors";

class UserService {


    getAllUsers = async () =>{
        const users = User.find();
        return users;
    }

    userCreate = async (name: any, email: any, password: any) =>{        
        const user = await User.create({
            name,
            email,
            password
        })

        return user;
    }
}

export default new UserService;