import { IUser }                                       from "@haisl-manager/api-interface";
import { Injectable }                                  from "@nestjs/common";
import { InjectRepository }                            from "@nestjs/typeorm";
import { FindManyOptions, FindOneOptions, Repository } from "typeorm";
import { IUserService }                                from "./_user.service";
import { User }                                        from "./entities/user.entity";

@Injectable()
export class UserService implements IUserService
{
    public constructor(@InjectRepository(User) private readonly userRepository: Repository<User>)
    {
    }

    async getAllUsers(skip?: number, take?: number): Promise<IUser[]>
    {
        const findOptions: FindManyOptions = { relations: ["roles"] };

        if (skip)
            findOptions.skip = skip;

        if (take)
            findOptions.take = take;

        try
        {
            // noinspection UnnecessaryLocalVariableJS  -  Left for debugging aid...
            const users: User[] = await this.userRepository.find(findOptions);
            return users;
        }
        catch (err)
        {
            const i = err;
            throw err;
        }
    }

    async getUserById(id: number): Promise<IUser>
    {
        const findOptions: FindOneOptions = {
            relations: ["roles"],
            where: {
                id
            }
        };

        return await this.userRepository.findOne(findOptions);
    }

    async getUserByUsername(username: string): Promise<IUser>
    {
        const findOptions: FindOneOptions = {
            relations: ["roles"],
            where: {
                username
            }
        };

        return await this.userRepository.findOne(findOptions);
    }

    async getUserByUsernamePwdHash(username: string, pwdHash: string): Promise<IUser>
    {
        const findOptions: FindOneOptions = {
            relations: ["roles"],
            where: {
                username,
                password: pwdHash
            }
        };

        return await this.userRepository.findOne(findOptions);
    }

    async getUserByEmailPwdHash(email: string, pwdHash: string): Promise<IUser>
    {
        const findOptions: FindOneOptions = {
            relations: ["roles"],
            where: {
                email,
                password: pwdHash
            }
        };

        return await this.userRepository.findOne(findOptions);
    }

    async getUserByEmail(email: string): Promise<IUser>
    {
        const findOptions: FindOneOptions = {
            relations: ["roles"],
            where: {
                email
            }
        };

        return await this.userRepository.findOne(findOptions);
    }

    async addUser(newUser: IUser): Promise<IUser>
    {
        return await this.userRepository.save(newUser);
    }

    async modifyUser(changedUser: IUser): Promise<IUser>
    {
        await this.userRepository.update(changedUser.id, changedUser);

        return await this.getUserById(changedUser.id);
    }

    async removeUser(userId: number | number[]): Promise<void>
    {
        const usersToRemove: User[] = [];

        if (!(userId instanceof Array))
        {
            const userToRemove = new User();
            userToRemove.id = userId;
            usersToRemove.push(userToRemove);
        }
        else
        {
            const userIds = userId as number[];

            userIds.forEach((id: number) =>
            {
                const userToRemove = new User();
                userToRemove.id = id;
                usersToRemove.push(userToRemove);
            });
        }

        await this.userRepository.remove(usersToRemove);
    }
}
