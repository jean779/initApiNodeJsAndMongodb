import { NextFunction,  Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

type JwtPaylooad ={
    id: number
}

export const authMiddleware = async (
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    const { authorization } = req.headers;

        if(!authorization){
        return  res.status(401).json({
                error: "Unauthorized",
                message: "you do not have authorization for this route"
            })
        }
        const token = authorization.split(' ')[1] ;

        console.log(token);

        const { id } = jwt.verify(token, process.env.JWT_PASS ?? '') as JwtPaylooad;
        console.log("chegou ate aqui")
        const user =  await User.findById(id)
        .populate({
            path: 'role',
            populate: {
                path: 'permissionIds',
                select: 'name -_id'
            }
        })
        .select('-password');

        if(!user){
            return  res.status(401).json({
                error: "Unauthorized",
                message: "User not found"
            })
        }
        
        const {email, name, _id, role} = user;

            // Adiciona as informações do usuário e suas permissões ao req.user
        req.user = {
            _id,
            email,
            name,
            role: role,
        };

        next();
    
}