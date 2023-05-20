
import { Request, Response } from "express";
import User from "../models/User";
import CompanyService from "../services/CompanyService";
import RoleService from "../services/RoleService";
import Role from "../models/Role";
import { RoleDescription } from "../utils/enums/TypesRolesEnum";


class RoleController{

  async create(req: Request, res: Response){
    const { permissionIds} = req.body;
    if (permissionIds) {
      const { valid, invalidIds } = await RoleService.arePermissionIdsValid(permissionIds);
      if (!valid) {
        return res.status(400).json({ error: `Invalid permission ids: ${invalidIds.join(', ')}` });
      }
     }
    const { name } = req.body;

    if (name in RoleDescription) {
      return res.status(400).json({ error: `Role ${name} already exists` });
    }
      
    return res.json(await RoleService.roleServiceCreate(req.body));
  }

  async find(req: Request, res: Response){
    console.log(req.user);
    console.log("chegou");
    return res.json(await RoleService.getAllroles());
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const permissionExist = await Role.findById(id);
    console.log("chegou aqui ")

    if(!permissionExist)
      return  res.status(400).json({
        error: "Bad Request",
        message: "Role does not exist"
      })

   await RoleService.rolesDelete(id);

   return res.json({
    message: "Role deleted successfully",
  });
  
  }

}
  
export default new RoleController;