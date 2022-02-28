import { ConfigService } from '../config/config.service';
import { ConnectionOptions, createConnection } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (configService: ConfigService) =>
      await createConnection(configService.TypeOrmConfig as ConnectionOptions),
    inject: [ConfigService],
  },
];
