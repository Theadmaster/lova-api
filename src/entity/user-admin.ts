import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity("user_admin")
export default class UserAdmin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @Column()
  avatar: string;
}
