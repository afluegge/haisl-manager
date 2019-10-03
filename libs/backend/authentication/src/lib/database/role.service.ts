import { IRole }                                      from "@haisl-manager/api-interface";
import { HaislObject, SentryCategory, SentryService } from "@haisl-manager/backend/common";
import { Injectable }                                 from "@nestjs/common";
import { InjectRepository }                           from "@nestjs/typeorm";
import { Severity }                                   from "@sentry/types";
import { FindManyOptions, Repository }                from "typeorm";
import { Role }                                       from "./entities/role.entity";
import { IRoleService }                               from "./role.service.interface";

@Injectable()
export class RoleService extends HaislObject implements IRoleService
{
    constructor(@InjectRepository(Role) private readonly roleRepository: Repository<Role>, sentry: SentryService)
    {
        super(sentry);
    }


    async getAllRoles(skip?: number, take?: number): Promise<IRole[]>
    {
        this.sentry.addBreadcrumb("Repository: Getting all Roles", Severity.Debug, SentryCategory.Repository);

        const findOptions: FindManyOptions = {};

        if (skip)
            findOptions.skip = skip;

        if (take)
            findOptions.take = take;

        return await this.roleRepository.find(findOptions);
    }
}
