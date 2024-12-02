import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './config/database.config';
import userConfig from './config/user.config';
import todoConfig from './config/todo.config';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: ['.env', 'develop.env'],
    isGlobal: true,
    load: [databaseConfig, userConfig, todoConfig]
  })],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigSharingModule { }
