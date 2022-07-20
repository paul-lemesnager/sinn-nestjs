import { WatchesModule } from './watches/watches.module';
import { WatchesService } from './watches/watches.service';
import { WatchesController } from './watches/watches.controller';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getEnvPath } from './common/helpers/env.helper';

const envFilePath: string = getEnvPath(`${__dirname}/common/environments`);

@Module({
  imports: [ConfigModule.forRoot({ envFilePath, isGlobal: true }), WatchesModule, MongooseModule.forRootAsync({
    imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const mongoUri = `mongodb+srv://${encodeURIComponent(configService.get('MONGO_USER'))}:${encodeURIComponent(configService.get('MONGO_PASSWORD'))}@${configService.get('MONGO_CLUSTER')}.jasznim.mongodb.net/Sinn?retryWrites=true&w=majority`;
        return {
          uri: mongoUri
        }
      },
      inject: [ConfigService],
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
