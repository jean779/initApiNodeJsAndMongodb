import Permission from '../models/Permission';
import Role from '../models/Role';
import PermissionEnum from '../utils/enums/PermissionEnum';
import { TypesRolesEnum, RoleDescription } from '../utils/enums/TypesRolesEnum';

const rolesWithPermissions: Record<TypesRolesEnum, string[]> = {
  [TypesRolesEnum.MASTER]: Object.values(PermissionEnum),
  [TypesRolesEnum.CLIENT]: [
    PermissionEnum.CREATE_ANALYSIS_REQUEST,
    PermissionEnum.VIEW_PROFILE,
    // adicione mais permissões de acordo com sua necessidade
  ],
  analyst: [
    // permissões do analista
  ]
  // adicione mais tipos de roles e suas permissões correspondentes
};
async function configureServer() {
  const roles = Object.values(TypesRolesEnum);
  
  // insere permissões no banco caso não existam
  for (const permission of Object.values(PermissionEnum)) {
    const existingPermission = await Permission.findOne({ name: permission });
    if (!existingPermission) {
      const newPermission = await Permission.create({ name: permission });
      console.log(`Permission ${newPermission.name} created`);
    }
  }

  // insere roles no banco caso não existam
  for (const role of roles) {
    const existingRole = await Role.findOne({ name: role });
    if (!existingRole) {
      const description = RoleDescription[role];
      const permissions = rolesWithPermissions[role];
      const permissionIds = [];
      for (const permission of permissions) {
        const permissionObject = await Permission.findOne({ name: permission });
        if (permissionObject) {
          permissionIds.push(permissionObject._id);
        }
      }
      const newRole = await Role.create({ name: role, description, permissionIds });
      console.log(`Role ${newRole.name} created with permissions ${permissions}`);
    }
  }
}

export default configureServer;