import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { EmailJob } from "./EmailJob";
import "reflect-metadata";


@Entity()
export class Campaign {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @OneToMany(() => EmailJob, (emailJob) => emailJob.campaign)
  emailJobs!: EmailJob[];
}
