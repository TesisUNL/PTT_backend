import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './api/database/database.module';
import { UsersModule } from './api/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './api/config/config.module';
import { CantonsModule } from './api/cantons/cantons.module';
import { AttractionsModule } from './api/attractions/attractions.module';
import { RatingsModule } from './api/ratings/ratings.module';
import { TouristRoutesModule } from './api/tourist-routes/tourist-routes.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UsersModule,
    CantonsModule,
    AttractionsModule,
    RatingsModule,
    TouristRoutesModule,
    RatingsModule,
    SharedModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
