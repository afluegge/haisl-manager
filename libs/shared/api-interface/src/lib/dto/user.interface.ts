import { IRole } from "./role.interface";

export interface IUser
{
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    notes: string;
    locked: boolean;
    modified: Date;
    created: Date;

    roles: IRole[];
}
