import { HaislError }                                  from "@haisl-manager/api-interface";
import { FindConditions, FindManyOptions, Repository } from "typeorm";
import { Role }                                        from "../../../../apps/api/src/app/database/entities/role.entity";
import { User }                                        from "../../../../apps/api/src/app/database/entities/user.entity";

export class UserRepositoryMock  extends Repository<User>
{
    private readonly _userData: User[] = [];

    private _creationDate: Date;
    private _modificationDate: Date;


    public get creationDate(): Date
    {
        return this._creationDate;
    }

    public get modificationDate(): Date
    {
        return this._modificationDate;
    }


    constructor()
    {
        super();
        this.resetMock();
    }


    private isFindManyOptions<TEntity>(options: FindManyOptions<TEntity> | FindConditions<TEntity>): options is FindManyOptions<TEntity>
    {
        const testObj = (options as FindManyOptions<TEntity>);

        if (testObj.skip === undefined)
        {
            if (testObj.relations === undefined)
                return false;
        }

        return true;
    }


    public find(options?: FindManyOptions<User> | FindConditions<User>): Promise<User[]>
    {
        let result: User[] = this._userData;

        if (options)
        {
            if (this.isFindManyOptions(options))
            {
                if (options.skip && options.skip > 0)
                    result = this._userData.slice(options.skip);

                if (options.take && options.take > 0)
                    result = result.slice(0, options.take);
            }
            else
            {
                throw new HaislError("--- Not Implemented ---")
            }
        }

        return Promise.resolve(result);
    }


    public resetMock(): void
    {
        this._modificationDate = new Date(2019, 5, 12, 14, 42);
        this._creationDate = new Date(2019, 4, 11, 9, 38);

        const sideAdmin    = this.createRole(1, "SiteAdmin", "A SiteAdmin", this._modificationDate, this._creationDate);
        const sideEditor   = this.createRole(2, "SiteEditor", "A SiteEditor", this._modificationDate, this._creationDate);
        const sideUser     = this.createRole(3, "SiteUser", "A SiteUser", this._modificationDate, this._creationDate);
        const ClientAdmin  = this.createRole(4, "ClientAdmin", "A ClientAdmin", this._modificationDate, this._creationDate);
        const ClientEditor = this.createRole(5, "ClientEditor", "A ClientEditor", this._modificationDate, this._creationDate);
        const ClientUser   = this.createRole(6, "ClientUser", "A ClientUser", this._modificationDate, this._creationDate);
        const Tenant       = this.createRole(7, "Tenant", "A Tenant", this._modificationDate, this._creationDate);
        const Anonymous    = this.createRole(8, "Anonymous", "An Anonymous", this._modificationDate, this._creationDate);

        this._userData.push(this.createUser(1, "pbrause", "secret", "Paul", "Brause", "pbrause@mail.com", "Some Notes...", false,
            [ClientAdmin], this._modificationDate, this._creationDate));

        this._userData.push(this.createUser(2, "hkrawuttke", "geheim", "Helga", "Krawuttke", "hkrawuttke@mail.com", "", false,
            [ClientEditor], this._modificationDate, this._creationDate));

        this._userData.push(this.createUser(3, "afluegge", "secret", "Andreas", "Flügge", "aflg1963@gmail.com", "ABCDEFG", false,
            [sideAdmin, sideUser], this._modificationDate, this._creationDate));

        this._userData.push(this.createUser(4, "cfluegge", "geheim", "Claudia", "Flügge", "cflg1966@gmail.com", "WXYZ", false,
            [sideEditor, sideUser], this._modificationDate, this._creationDate));

        this._userData.push(this.createUser(5, "hwinkle", "secret", "Heinz", "Winkle", "hwinkle@mail.com", "12345", true,
            [ClientUser], this._modificationDate, this._creationDate));

        this._userData.push(this.createUser(6, "kkunze", "geheim", "Horst-Rudolf", "Kunze", "pbrause@mail.com", "6789", false,
            [Tenant], this._modificationDate, this._creationDate));

        this._userData.push(this.createUser(7, "gmaier", "secret", "Gerd", "Maier", "gmaier@mail.com", "987654321", true,
            [Anonymous], this._modificationDate, this._creationDate));
    }


    private createUser(id: number, username: string, password: string, firstName: string, lastName: string, email: string, notes: string, locked: boolean, roles: Role[], modified?: Date, created?: Date): User
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

    private createRole(id: number, name: string, description: string, modified?: Date, created?: Date): Role
    {
        const role = new Role();

        role.id = id;
        role.name = name;
        role.description = description;
        role.modified = modified ? modified : new Date();
        role.created = created ? created : new Date();

        return role;
    }

    private getNextId(): number
    {
        return Math.max.apply(Math, this._userData.map(function(o) { return o.id; }));
    }
}
