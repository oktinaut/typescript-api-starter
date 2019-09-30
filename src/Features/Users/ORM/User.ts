import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

import { IUser } from "../Contracts/IUser"

@Entity()
export class User implements IUser {
    
    @PrimaryGeneratedColumn("uuid")
    id: string
    
    @Column()
    username: string
    
    @Column()
    password: string
}