import Company from "../models/Company";
import Permission from "../models/Permission";
import PermissionEnum from "../utils/enums/PermissionEnum";

export interface IPermission {
  name: String;
}

class PermissionsService{
  getAllPermissions = async () => {
    return Permission.find();
  }

  permissionsCreate= async (permissionsType: IPermission) => {
    return await Permission.create(permissionsType);
  }

  permissionsUpdate = async (id: string, permissionsType: IPermission) => {
    return await Permission.findByIdAndUpdate(id, permissionsType, { new: true });
  }

  permissionsDelete = async (id: string) => {
    return await Permission.findByIdAndDelete(id);
  }

}

export default new PermissionsService;