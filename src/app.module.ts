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
import { TemplateModule } from './modules/templates/template.module';
import { ScriptModule } from './modules/ScriptAPi/scriptApi.module';
import { AudienceModule } from './modules/audi/audience.module';
import { ProjectModule } from './modules/Projects/project.module';
// import { VeoModule } from './modules/veo_videos/veo_module';

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
    ScriptModule,
    TemplateModule,
    AudienceModule,
    ProjectModule,
  ],
  // controllers: [CommonController],
  // providers: [CommonService],
})
export class AppModule {}
