
import { Request, Response } from "express";
import PermissionService, { IPermission } from "../services/PermissionService";
import Permission from "../models/Permission";
import PermissionEnum from "../utils/enums/PermissionEnum";


class PermissionController{

  async create(req: Request, res: Response){
    const { name } = req.body;
    const permissions = Object.values(PermissionEnum);
    if (!permissions.includes(name)) {
      return  res.status(400).json({
        error: "Bad Request",
        message: "Invalid permission name"
      })
    }
    const existingPermission = await Permission.findOne({ name: name });
    if (existingPermission) {
      return  res.status(400).json({
        error: "Bad Request",
        message: "Permission already exists"
      })
    }
    return res.json(await PermissionService.permissionsCreate(req.body));
  }

  async find(req: Request, res: Response){
    return res.json(await PermissionService.getAllPermissions());
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const {name} = req.body;
    const permissionExist = await Permission.findById(id);

    if(!permissionExist)
      return  res.status(400).json({
        error: "Bad Request",
        message: "Permissions does not exist"
      })
      const permissions = Object.values(PermissionEnum);
      if (!permissions.includes(name)) {
        return  res.status(400).json({
          error: "Bad Request",
          message: "Invalid permission name"
        })
      }  
    const permission = { name } as IPermission; 
    return res.json(await PermissionService.permissionsUpdate(id, permission));
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const permissionExist = await Permission.findById(id);
    console.log("chegou aqui ")

    if(!permissionExist)
      return  res.status(400).json({
        error: "Bad Request",
        message: "Permissions does not exist"
      })

   await PermissionService.permissionsDelete(id);

   return res.json({
    message: "Permission deleted successfully",
  });
  }

  async index(req: Request, res: Response) {
    const permissions = Object.values(PermissionEnum);
    return res.json(permissions);
  }
}
  
export default new PermissionController;