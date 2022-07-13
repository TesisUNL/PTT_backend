import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '../config/config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => configService.TypeOrmConfig as TypeOrmModuleOptions,
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
