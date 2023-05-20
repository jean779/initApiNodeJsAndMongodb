export enum TypesRolesEnum {
  MASTER = 'master',
  CLIENT = 'client',
  ANALYST = 'analyst',
}

export const RoleDescription = {
  [TypesRolesEnum.MASTER]: 'Usuário Master com acesso total ao sistema',
  [TypesRolesEnum.CLIENT]: 'Usuário Cliente com acesso limitado',
  [TypesRolesEnum.ANALYST]: 'Usuário Analista com acesso a funcionalidades de análise de dados',
};