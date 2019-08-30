import { IRole }           from "@haisl-manager/api-interface";
import { Query, Resolver } from "@nestjs/graphql";
import { Role }            from "../database/entities/role.entity";
import { RoleService }     from "../database/role.service";

@Resolver(() => Role)
export class RoleResolver
{
    constructor(private roleService: RoleService)
    {
    }

    @Query("allRoles")
    public async allRoles(): Promise<IRole[]>
    {
        // noinspection UnnecessaryLocalVariableJS  -  Left for debugging aid...
        const roles: IRole[] = await this.roleService.getAllRoles();
        return roles;
    }
}
