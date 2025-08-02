// src/entities/EmailJob.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { Campaign } from "./Campaign";

@Entity()
export class EmailJob {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  recipientEmail!: string;

  @Column({ default: "pending" })
  status!: string;  // e.g. "pending", "sent", "failed"

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne(() => Campaign, (campaign) => campaign.emailJobs, { onDelete: "CASCADE" })
  campaign!: Campaign;
}
