import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Email {
  @PrimaryGeneratedColumn()
  id!: number;    

  @Column()
  subject!: string; 

  @Column()
  body!: string;

  @ManyToOne(() => User, user => user.emails)
  user!: User;           

  @CreateDateColumn()
  sentAt!: Date;       
}
