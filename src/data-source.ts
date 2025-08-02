import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { Email } from "./entities/Email";
import { Campaign } from "./entities/Campaign";
import { EmailJob } from "./entities/EmailJob";

import dotenv from 'dotenv';
dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "3306"),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [User, Email, Campaign, EmailJob],
  migrations: [],
  subscribers: [],
});
