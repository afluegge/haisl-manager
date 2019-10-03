import { Role } from "../database/entities/role.entity";
import { User } from "../database/entities/user.entity";

export class EntityFactory
{
    public static createUser(id: number, username: string, password: string, firstName: string, lastName: string, email: string, notes: string, locked: boolean, roles: Role[], modified?: Date, created?: Date): User
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

    public static createRole(id: number, name: string, description: string, modified?: Date, created?: Date): Role
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
