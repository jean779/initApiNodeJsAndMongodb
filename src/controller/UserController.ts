import { Request, Response } from "express";
import User from "../models/User"
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"
import  UserService   from "../services/UserService"
import { BadRequestError } from "../helpers/api-errors";

require('dotenv').config()

type JwtPaylooad ={
    id: number
}

class UserController{

    async find(req: Request, res: Response){
        return res.json(await UserService.getAllUsers());
    }

    async findUserActives(req: Request, res: Response){
        const users = await UserService.getAllUserActive()
        console.log(users);
        return res.json(users);
    }

    async create(req: Request, res: Response){
        const {name, email, password} = req.body;
        
        const userExists = await User.findOne({email})
            
        if(userExists){
            throw new  BadRequestError ("User already exists");
        }

        const user = await UserService.userCreate(name, email, password)

        return res.json(user);
    }

    async login(req: Request, res: Response){
        const {email, password} = req.body;
        const user = await User.findOne({email})

         if(!user)
            throw new  BadRequestError ("Invalid email or passwords");

        const verifyPass = await bcrypt.compare(password, user.password);

        if(!verifyPass)
            throw new  BadRequestError ("Invalid email or passwords");


        const token = jwt.sign( {id: user.id},  process.env.JWT_PASS ?? 'a71e8c308d026413bc060cddab7a7dc9', { 
            expiresIn: '1h'
        })

        return res.json({
                userId: user.id,
                name: user.name,
                email: user.email,
                token: token,
                message: "Successfully logged in",
        })
    }

    async getProfile(req: Request, res: Response){
        return res.json(req.user);
        
    }

    async update(req: Request, res: Response){
        const {userId, email} = req.body;
        const user = await UserService.userUpdate(userId, email)
        return res.json(user);
    }

    async delete(req: Request, res: Response){
        const {userId} = req.body;
        const user = await UserService.userDelte(userId)
        return res.json(
            {message: "sucesso bebe"}
        )
    }
}

export default new UserController;