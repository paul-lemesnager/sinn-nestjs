/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { WatchesController } from './watches.controller';
import { WatchesService } from './watches.service';
import { Watch, WatchSchema } from './watch.schema';

@Module({
    imports: [MongooseModule.forFeature([{name: Watch.name, schema: WatchSchema}])],
    controllers: [WatchesController],
    providers: [WatchesService],
})
export class WatchesModule {}
