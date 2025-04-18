import { PrimaryGeneratedColumn, Column } from "typeorm";
import { Entity } from "typeorm";
@Entity("user")
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({unique: true})
    email: string

    @Column()
    password: string
}
