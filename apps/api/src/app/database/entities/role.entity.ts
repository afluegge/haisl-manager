import { IRole }                                  from "@haisl-manager/api-interface";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("roles")
export class Role implements IRole
{
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ name: "name" })
    public name: string;

    @Column({ name: "description" })
    public description: string;

    @Column({
        name:    "modified",
        default: "CURRENT_TIMESTAMP"
    })
    public modified: Date;

    @Column({
        name:    "created",
        default: "CURRENT_TIMESTAMP"
    })
    public created: Date;
}
