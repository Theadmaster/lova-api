import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export default class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    nickname: string;

    @Column()
    gender: number;

    @Column()
    phone: string;

    @Column()
    appid: string;

    @Column()
    openid: string;

    @Column()
    unionid: string;

    @Column()
    session_key: string;

    @Column()
    access_token: string;

    @Column()
    user_id: string;

    @CreateDateColumn()
    created_at: string;

    @UpdateDateColumn()
    updated_at: string; 

}