import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

    @Column()
    created_at: string;

    @Column()
    updated_at: string; 

}