import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Email } from "./Email";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;   

  @Column({ unique: true })
  email!: string; 

  @OneToMany(() => Email, email => email.user)
  emails!: Email[];     
}
