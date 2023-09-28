import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity("moment")
export default class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: string;

  @Column()
  nickname: string;

  @Column()
  location: string;

  @Column()
  like_num: number;

  @Column()
  comment_num: number;

  @CreateDateColumn()
  create_at: string;
}
