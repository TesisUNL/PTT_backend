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
        synchronize: Boolean(process.env.ORM_SYNC && process.env.ORM_SYNC.toLowerCase().trim() == 'true'),
        logging: Boolean(process.env.DB_DEBUG && process.env.DB_DEBUG.toLowerCase().trim() == 'true'),
      },
    };
    return config.database;
  }

  get JWT_SECRET(): string {
    return process.env.JWT_SECRET || 'secret';
  }
  get JWT_EXPIRATION_TIME(): number {
    return parseInt(process.env.JWT_EXPIRATION_TIME) || 3600 * 24 * 7;
  }

  get UPLOADED_FILES_DESTINATION(): string {
    return process.env.UPLOADED_FILES_DESTINATION || 'public/uploads/';
  }
}
