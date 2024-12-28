import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

import { LearningModule } from './learning/learning.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import { config } from 'dotenv';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { AppConfigModule } from './config/app-config.module';
import { AppConfigService } from './config/app-config.service';
import { ListsModule } from './lists/lists.module';
import { WordsModule } from './words/words.module';
config({
  path: path.resolve(
    __dirname,
    `../../${process.env.NODE_ENV || 'development'}.env`,
  ),
});

console.log(
  path.resolve(__dirname, `../../${process.env.NODE_ENV || 'development'}.env`),
);
console.log(`process.env.DATABASE_NAME: ${process.env.DATABASE_NAME}`);

@Module({
  imports: [
    AppConfigModule,
    ConfigModule.forRoot({
      envFilePath: path.resolve(
        __dirname,
        `../../${process.env.NODE_ENV || 'development'}.env`,
      ),
      isGlobal: true, // Makes env variables globally available
    }),
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: (appConfigService: AppConfigService) => ({
        type: 'postgres',
        host: appConfigService.get('DATABASE_HOST'),
        port: appConfigService.getNumber('DATABASE_PORT'),
        username: appConfigService.get('DATABASE_USERNAME'),
        password: appConfigService.get('DATABASE_PASSWORD'),
        database: appConfigService.get('DATABASE_NAME'),
        autoLoadEntities: true,
        namingStrategy: new SnakeNamingStrategy(),
        logging: true, // Enable to see SQL queries
        synchronize: false,
      }),
    }),

    AuthModule,
    UserModule,
    LearningModule,
    CoreModule,
    SharedModule,
    ConfigModule,
    ListsModule,
    WordsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
