import { IRole }                                      from "@haisl-manager/api-interface";
import { HaislObject, SentryCategory, SentryService } from "@haisl-manager/backend/common";
import { Query, Resolver }                            from "@nestjs/graphql";
import { Severity }                                   from "@sentry/types";
import { Role }                                       from "../database/entities/role.entity";
import { RoleService }                                from "../database/role.service";

@Resolver(() => Role)
export class RoleResolver extends HaislObject
{
    constructor(private roleService: RoleService, sentry: SentryService)
    {
        super(sentry);
    }

    @Query("allRoles")
    public async allRoles(): Promise<IRole[]>
    {
        this.sentry.addBreadcrumb("GraphQL: Getting all Roles", Severity.Debug, SentryCategory.GraphQL);

        // noinspection UnnecessaryLocalVariableJS  -  Left for debugging aid...
        const roles: IRole[] = await this.roleService.getAllRoles();
        return roles;
    }
}
