import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { OtpModule } from './common/otp/otp.module';
import { MailModule } from './common/mail/mail.module';
import { CommonModule } from './modules/common/common.module';
import { BrandModule } from './modules/brand/brand.module';
import { SeedModule } from './database/seeder/seed.module';
import { VideoTypeModule } from './modules/videotype/videotype.module';
import { AvatarModule } from './modules/avatar/avatar.module';
import { ProductsModule } from './modules/products/products.module';
import { HookModule } from './modules/hooks/hooks.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true,
      synchronize: false,
    }),
    UsersModule,
    AuthModule,
    OtpModule,
    MailModule,
    CommonModule,
    BrandModule,
    SeedModule,
    VideoTypeModule,
    AvatarModule,
    ProductsModule,
    HookModule,
  ],
  // controllers: [CommonController],
  // providers: [CommonService],
})
export class AppModule {}
