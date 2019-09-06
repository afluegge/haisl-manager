import { IEntity } from "./entity.interface";

export interface IRole extends IEntity
{
    id: number;
    name: string;
    description: string;
    modified: Date;
    created: Date;
}
