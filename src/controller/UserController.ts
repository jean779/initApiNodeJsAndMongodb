import { Request, Response } from "express";
import User from "../database/schemas/User"
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"
require('dotenv').config()

class UserController{
    
    async find(req: Request, res: Response){
        try{
            const users = await User.find();
            return res.json(users);
        }catch(error){
            return res.status(500).json({
                error: "Something wrong happened, try again",
                message: error,
            });
        }
    }

    async create(req: Request, res: Response){
        const {name, email, password} = req.body;
        try{
            const userExists = await User.findOne({email})
            
            if(userExists){
                return res.status(400).json({
                    error : "Ooops",
                    message: "User already exists"
                })
            }
                    
            const user = await User.create({
                name,
                email,
                password
            })

            res.json(user);

        }catch(error){
            return res.status(500).send({
                error: "Registrarion failed",
                message: error
            })
        }
    }

    async login(req: Request, res: Response){
        const {email, password} = req.body;
        const user = await User.findOne({email})
                  
        if(!user){
            return res.status(400).json({
                error : "Ooops",
                message: "Invalid email"
            })
        } 

        const verifyPass = await bcrypt.compare(password, user.password);

        if(!verifyPass){
            return res.status(400).json({
                error : "Ooops",
                message: "Invalid email or passwords"
            })
        } 

        console.log(process.env.JWT_PASS);

        const token = jwt.sign( {id: user.id},  process.env.JWT_PASS ?? 'aaajjjj22', { 
            expiresIn: '1h'
        })

       console.log(token);
    }
}

export default new UserController;