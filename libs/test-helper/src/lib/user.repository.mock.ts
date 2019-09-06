import { Role }            from "../../../../apps/api/src/app/database/entities/role.entity";
import { User }            from "../../../../apps/api/src/app/database/entities/user.entity";
import { RepositoryMock }  from "./repository.mock";

export class UserRepositoryMock extends RepositoryMock<User>
{
    constructor(modified?: Date, created?: Date)
    {
        super(UserRepositoryMock.generateMockData(modified, created));
    }


    private static generateMockData(modified?: Date, created?: Date): User[]
    {
        const sideAdmin = this.createRole(1, "SiteAdmin", "A SiteAdmin", modified, created);
        const sideEditor = this.createRole(2, "SiteEditor", "A SiteEditor", modified, created);
        const sideUser = this.createRole(3, "SiteUser", "A SiteUser", modified, created);
        const ClientAdmin = this.createRole(4, "ClientAdmin", "A ClientAdmin", modified, created);
        const ClientEditor = this.createRole(5, "ClientEditor", "A ClientEditor", modified, created);
        const ClientUser = this.createRole(6, "ClientUser", "A ClientUser", modified, created);
        const Tenant = this.createRole(7, "Tenant", "A Tenant", modified, created);
        const Anonymous = this.createRole(8, "Anonymous", "An Anonymous", modified, created);

        const userData: User[] = [];

        userData.push(this.createUser(1, "pbrause", "secret", "Paul", "Brause", "pbrause@mail.com", "Some Notes...", false, [ClientAdmin], modified, created));
        userData.push(this.createUser(2, "hkrawuttke", "geheim", "Helga", "Krawuttke", "hkrawuttke@mail.com", "", false, [ClientEditor], modified, created));
        userData.push(this.createUser(3, "afluegge", "secret", "Andreas", "Flügge", "aflg1963@gmail.com", "ABCDEFG", false, [sideAdmin, sideUser], modified, created));
        userData.push(this.createUser(4, "cfluegge", "geheim", "Claudia", "Flügge", "cflg1966@gmail.com", "WXYZ", false, [sideEditor, sideUser], modified, created));
        userData.push(this.createUser(5, "hwinkle", "secret", "Heinz", "Winkle", "hwinkle@mail.com", "12345", true, [ClientUser], modified, created));
        userData.push(this.createUser(6, "kkunze", "geheim", "Horst-Rudolf", "Kunze", "pbrause@mail.com", "6789", false, [Tenant], modified, created));
        userData.push(this.createUser(7, "gmaier", "secret", "Gerd", "Maier", "gmaier@mail.com", "987654321", true, [Anonymous], modified, created));

        return userData;
    }


    private static createUser(id: number, username: string, password: string, firstName: string, lastName: string, email: string, notes: string, locked: boolean, roles: Role[], modified?: Date, created?: Date): User
    {
        const user = new User();

        user.id = id;
        user.username = username;
        user.password = password;
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.notes = notes;
        user.locked = locked;
        user.roles = roles;
        user.modified = modified ? modified : new Date();
        user.created = created ? created : new Date();

        return user;
    }

    private static createRole(id: number, name: string, description: string, modified?: Date, created?: Date): Role
    {
        const role = new Role();

        role.id = id;
        role.name = name;
        role.description = description;
        role.modified = modified ? modified : new Date();
        role.created = created ? created : new Date();

        return role;
    }
}
