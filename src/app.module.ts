import { WatchesModule } from './watches/watches.module';
import { WatchesService } from './watches/watches.service';
import { WatchesController } from './watches/watches.controller';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [WatchesModule],
  controllers: [WatchesController, AppController],
  providers: [WatchesService, AppService],
})
export class AppModule {}
