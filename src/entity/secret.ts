import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum levelType {
    mild = 1,
    fervent = 2,
    fierce = 3,
    utmost = 4,
    diy = 5
}

@Entity()
export default class Secret {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column()
  countdown: number;

  @Column()
  level: number;
}
