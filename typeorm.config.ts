import { DataSource } from 'typeorm';
import { User } from './src/database/entities/user.entity';
import { Otp } from './src/database/entities/otp.entity';
import * as dotenv from 'dotenv';

dotenv.config();

export default new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'nest_auth_otp',
  entities: [User, Otp],
  migrations: ['src/database/migrations/*.ts'],
  synchronize: false,
}); 
