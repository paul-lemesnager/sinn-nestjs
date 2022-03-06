/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { WatchesController } from './watches.controller';
import { WatchesService } from './watches.service';

@Module({
    imports: [],
    controllers: [WatchesController],
    providers: [WatchesService],
})
export class WatchesModule {}
