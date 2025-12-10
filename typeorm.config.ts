import { DataSource } from 'typeorm';
import { User } from './src/database/entities/user.entity';
import { Otp } from './src/database/entities/otp.entity';
import * as dotenv from 'dotenv';
import { Brand } from './src/database/entities/brand.entity';
import { VideoType } from './src/database/entities/video-type.entity';
import { Product } from 'src/database/entities/product.entity';
import { Avatar } from 'src/database/entities/avatar.entity';
import { Hook } from 'src/database/entities/hooks.entity';
import { VideoSpec } from 'src/database/entities/video-spec.entity';
import { Template } from 'src/database/entities/template.entity';

dotenv.config();

export default new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'nest_auth_otp',
  entities: [User, Otp, Brand, VideoType, Product, Avatar, Hook, VideoSpec, Template, VideoSpec],
  migrations: ['src/database/migrations/*.ts'],
  synchronize: false,
}); 