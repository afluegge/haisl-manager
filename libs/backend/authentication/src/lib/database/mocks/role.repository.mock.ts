import { EntityFactory }  from "../../test/entity-factory";
import { Role }           from "../entities/role.entity";
import { RepositoryMock } from "./repository.mock";

export class RoleRepositoryMock extends RepositoryMock<Role>
{
    constructor(modified?: Date, created?: Date)
    {
        super(RoleRepositoryMock.generateMockData(modified, created));
    }


    private static generateMockData(modified?: Date, created?: Date): Role[]
    {
        const roleData: Role[] = [];

        roleData.push(EntityFactory.createRole(1, "SiteAdmin", "A SiteAdmin", modified, created));
        roleData.push(EntityFactory.createRole(2, "SiteEditor", "A SiteEditor", modified, created));
        roleData.push(EntityFactory.createRole(3, "SiteUser", "A SiteUser", modified, created));
        roleData.push(EntityFactory.createRole(4, "ClientAdmin", "A ClientAdmin", modified, created));
        roleData.push(EntityFactory.createRole(5, "ClientEditor", "A ClientEditor", modified, created));
        roleData.push(EntityFactory.createRole(6, "ClientUser", "A ClientUser", modified, created));
        roleData.push(EntityFactory.createRole(7, "Tenant", "A Tenant", modified, created));
        roleData.push(EntityFactory.createRole(8, "Anonymous", "An Anonymous", modified, created));

        return roleData;
    }
}
