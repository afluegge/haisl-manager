import { IUser } from "@haisl-manager/api-interface";
import { User }  from "./entities/user.entity";

export interface IUserService
{
    getAllUsers(skip?: number, take?: number): Promise<User[]>;

    getUserById(id: number): Promise<IUser>;

    getUserByUsername(username: string): Promise<IUser>;

    getUserByUsernamePwdHash(username: string, pwdHash: string): Promise<IUser>;

    getUserByEmailPwdHash(email: string, pwdHash: string): Promise<IUser>;

    getUserByEmail(email: string): Promise<IUser>;

    addUser(newUser: IUser): Promise<IUser>;

    modifyUser(changedUser: IUser): Promise<IUser>;

    removeUser(userId: IUser | IUser[]): Promise<void>;
}
