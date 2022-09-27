import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  get TypeOrmConfig() {
    //  TODO :move this to use multiple configs
    const config = {
      database: {
        type: 'mysql',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE_NAME,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: Boolean(process.env.ORM_SYNC),
        logging: Boolean(process.env.DB_DEBUG),
      },
    };
    return config.database;
  }

  get JWT_SECRET(): string {
    return process.env.JWT_SECRET || 'secret';
  }
  get JWT_EXPIRATION_TIME(): number {
    return Number(process.env.JWT_EXPIRATION_TIME) || 3600;
  }
}
