import { Request, Response } from "express";
import User from "../models/User"
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"
import  UserService   from "../services/UserService"
import { BadRequestError } from "../helpers/api-errors";
import Role from "../models/Role";
import { TypesRolesEnum } from "../utils/enums/TypesRolesEnum";

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
        return res.json(users);
    }

    async create(req: Request, res: Response){
        console.log("chegou no create")
        const {name, email, password, role_id} = req.body;
        console.log(req.body);
        
        const userExists = await User.findOne({email})
            
        if(userExists){
            throw new  BadRequestError ("User already exists");
        }

        const roleExists = await Role.findById(role_id);
        console.log(roleExists);
        if (!roleExists) {
          throw new BadRequestError("Invalid Role");
        }
      
        if (roleExists.name === TypesRolesEnum.ANALYST) {
          throw new BadRequestError("Cannot create user with Analyst role");
        }
      
        const user = await UserService.userCreate(name, email, password, role_id)

        return res.json(user);
    }

    async login(req: Request, res: Response){
        const {email, password} = req.body;
        const user = await User.findOne({email}).populate("role")
        console.log(req.user);
        console.log(user);
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
                role: user.role.name || undefined,
                message: "Successfully logged in",
        })
    }

    async getProfile(req: Request, res: Response){
        console.log(req.user);
        return res.json(req.user);
        
    }

    async getUserByName(req: Request, res: Response){
        const userName = req.body;
        const user = await UserService.getUsersByName(userName);
        return res.json(user);
    }

    async softDelete(req: Request, res: Response){
        const {id } = req.params;
        const userExist = await User.findById(id);
        console.log("chegou aqui ")
    
        if(!userExist)
          return  res.status(400).json({
            error: "Bad Request",
            message: "User does not exist"
          })

        const user = await UserService.userSoftDelete(id);
        console.log(user);
        return res.json(
            {message: "User removed successfully"}
        )
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
            {message: "success"}
        )
    }
}

export default new UserController;