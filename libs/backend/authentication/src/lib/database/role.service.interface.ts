import { IRole } from "@haisl-manager/api-interface";

export interface IRoleService
{
    getAllRoles(skip?: number, take?: number): Promise<IRole[]>;
}
