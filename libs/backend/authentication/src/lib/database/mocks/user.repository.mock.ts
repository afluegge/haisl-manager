import { EntityFactory }  from "../../test/entity-factory";
import { User }           from "../entities/user.entity";
import { RepositoryMock } from "./repository.mock";

export class UserRepositoryMock extends RepositoryMock<User>
{
    constructor(modified?: Date, created?: Date)
    {
        super(UserRepositoryMock.generateMockData(modified, created));
    }


    private static generateMockData(modified?: Date, created?: Date): User[]
    {
        const sideAdmin = EntityFactory.createRole(1, "SiteAdmin", "A SiteAdmin", modified, created);
        const sideEditor = EntityFactory.createRole(2, "SiteEditor", "A SiteEditor", modified, created);
        const sideUser = EntityFactory.createRole(3, "SiteUser", "A SiteUser", modified, created);
        const ClientAdmin = EntityFactory.createRole(4, "ClientAdmin", "A ClientAdmin", modified, created);
        const ClientEditor = EntityFactory.createRole(5, "ClientEditor", "A ClientEditor", modified, created);
        const ClientUser = EntityFactory.createRole(6, "ClientUser", "A ClientUser", modified, created);
        const Tenant = EntityFactory.createRole(7, "Tenant", "A Tenant", modified, created);
        const Anonymous = EntityFactory.createRole(8, "Anonymous", "An Anonymous", modified, created);

        const userData: User[] = [];

        userData.push(EntityFactory.createUser(1, "pbrause", "secret", "Paul", "Brause", "pbrause@mail.com", "Some Notes...", false, [ClientAdmin], modified, created));
        userData.push(EntityFactory.createUser(2, "hkrawuttke", "geheim", "Helga", "Krawuttke", "hkrawuttke@mail.com", "", false, [ClientEditor], modified, created));
        userData.push(EntityFactory.createUser(3, "afluegge", "secret", "Andreas", "Flügge", "aflg1963@gmail.com", "ABCDEFG", false, [sideAdmin, sideUser], modified, created));
        userData.push(EntityFactory.createUser(4, "cfluegge", "geheim", "Claudia", "Flügge", "cflg1966@gmail.com", "WXYZ", false, [sideEditor, sideUser], modified, created));
        userData.push(EntityFactory.createUser(5, "hwinkle", "secret", "Heinz", "Winkle", "hwinkle@mail.com", "12345", true, [ClientUser], modified, created));
        userData.push(EntityFactory.createUser(6, "kkunze", "geheim", "Horst-Rudolf", "Kunze", "pbrause@mail.com", "6789", false, [Tenant], modified, created));
        userData.push(EntityFactory.createUser(7, "gmaier", "secret", "Gerd", "Maier", "gmaier@mail.com", "987654321", true, [Anonymous], modified, created));

        return userData;
    }
}
