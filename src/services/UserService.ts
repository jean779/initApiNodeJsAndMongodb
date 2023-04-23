import User from "../models/User";
import { Request, Response } from "express";
import { ApiError, BadRequestError } from "../helpers/api-errors";

class UserService {


    getAllUsers = async () =>{
        return User.find();
    }

    getAllUserActive = async() => {
        return User.find({isActive: true })
    }

    userCreate = async (name: any, email: any, password: any) =>{        
        const user = await User.create({
            name,
            email,
            password
        })

        return user;
    }

    userUpdate = async(userId : any, email:any )=>{
        return await User.findByIdAndUpdate(userId, {email: email});
    }

    userDelte = async(userId : any)=>{
        return await User.findByIdAndRemove(userId);
    }
    
}

export default new UserService;