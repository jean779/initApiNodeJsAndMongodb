import Company from "../models/Company";
import Permission from "../models/Permission";
import Role from "../models/Role";

export interface IRole {
  name: string;
  description: string;
  permissions: string[];
}

class RoleService{
  getAllroles = async () => {
    return Role.find().populate({ 
      path: "permissionIds", 
      select: "name" 
    });
  }

  roleServiceCreate= async (role: IRole) => {
    return await Role.create(role);
  }


  public async arePermissionIdsValid(permissionIds: string[]): Promise<{ valid: boolean, invalidIds: string[] }> {
    const validIds = await Promise.all(permissionIds.map(async (id) => {
      const permission = await Permission.findById(id);
      return !!permission;
    }));
    
    const invalidIds = permissionIds.filter((id, index) => !validIds[index]);
    
    return { valid: invalidIds.length === 0, invalidIds };
  }

  rolesDelete = async (id: string) => {
    return await Role.findByIdAndDelete(id);
  }


}


export default new RoleService;