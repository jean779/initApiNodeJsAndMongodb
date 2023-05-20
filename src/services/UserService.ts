import User from "../models/User";
import { Request, Response } from "express";
import { ApiError, BadRequestError } from "../helpers/api-errors";

class UserService {


    getAllUsers = async () =>{
        return User.find().populate("role");
    }

    getAllUserActive = async() => {
        return User.find({isActive: true }).populate("role")
    }

    getUsersByName = async (userName: any) =>{
        console.log(userName);
        const name = userName.userName
        console.log(name);
        return User.find({name: {$regex: '^' + name}, isActive: true},{ password: 0 });
    }

    userCreate = async (name: any, email: any, password: any, role: string) =>{        
        const user = await User.create({
            name,
            email,
            password,
            role,
        })

        return user;
    }

    userUpdate = async(userId : any, email:any )=>{
        return await User.findByIdAndUpdate(userId, {email: email});
    }

    userDelte = async(userId : any)=>{
        return await User.findByIdAndRemove(userId);
    }

    userSoftDelete = async(userId : any)=>{
        return await User.findByIdAndUpdate(userId, {isActive: false});;
    }
    
    getCompanysByResponsible= async (userId: any) =>{
        return User.find({responsible: userId});
    }
}

export default new UserService;