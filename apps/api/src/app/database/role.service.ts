import { IRole }                       from "@haisl-manager/api-interface";
import { Injectable }                  from "@nestjs/common";
import { InjectRepository }            from "@nestjs/typeorm";
import { FindManyOptions, Repository } from "typeorm";
import { Role }                        from "./entities/role.entity";

@Injectable()
export class RoleService
{
    constructor(@InjectRepository(Role) private readonly roleRepository: Repository<Role>)
    {
    }


    public async getAllRoles(skip?: number, take?: number): Promise<IRole[]>
    {
        const findOptions: FindManyOptions = {};

        if(skip)
            findOptions.skip = skip;

        if(take)
            findOptions.take = take;

        return await this.roleRepository.find(findOptions);
    }
}
