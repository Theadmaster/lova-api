import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export default class UserAdmin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;
}
