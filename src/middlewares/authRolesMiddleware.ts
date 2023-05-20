import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
import PermissionEnum from "../utils/enums/PermissionEnum";

export const authorizeMiddleware = <T extends keyof typeof PermissionEnum>(allowedPermission: T) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { role } = req.user;
    const permission = PermissionEnum[allowedPermission];

   
    // Verifica se o usuário tem a permissão permitida
    let hasPermission = false;
    for (const perm of role.permissionIds) {
      if (perm.name === permission) {
        hasPermission = true;
        break;
      }
    }

    // Se o usuário não tiver a permissão permitida, retorna uma resposta de erro
    if (!hasPermission) {
      return res.status(403).json({
        error: "Forbidden",
        message: "You do not have permission to access this route",
      });
    }

    next();
  };
};