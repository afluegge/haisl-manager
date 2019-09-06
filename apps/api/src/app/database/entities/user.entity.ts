import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { IEntity }                                                       from "../../../../../../libs/shared/api-interface/src/lib/dto/entity.interface";
import { Role }                                                          from "./role.entity";

@Entity("users")
export class User implements IEntity
{
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ name: "username" })
    public username: string;

    @Column({ name: "password" })
    public password: string;

    @Column({ name: "firstName" })
    public firstName: string;

    @Column({ name: "lastName" })
    public lastName: string;

    @Column({ name: "email" })
    public email: string;

    @Column({ name: "notes" })
    public notes: string;

    @Column({ name: "locked" })
    public locked: boolean;

    @ManyToMany(type => Role)
    @JoinTable({
        name:              "users_roles",
        joinColumn:        {
            name: "userId"
        },
        inverseJoinColumn: {
            name: "roleId"
        }
    })
    public roles: Role[];

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
