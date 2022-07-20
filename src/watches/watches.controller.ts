/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Delete,
} from "@nestjs/common";
import { CreateWatchDto } from "./create-watch.dto";
import { UpdateWatchDto } from "./update-watch.dto";
import { Watch } from "./watch.model";
import { WatchesService } from "./watches.service";

@Controller("watches")
export class WatchesController {
  constructor(private watchesService: WatchesService) {}

  @Get()
  getAllWatches(): Watch[] {
    return this.watchesService.getWatches();
  }

  @Get(":id")
  findById(@Param("id") id: string): Watch {
    return this.watchesService.getWatch(id);
  }

  @Post()
  async createWatch(
    @Body() createWatchDto: CreateWatchDto
  ) {
    const watch = await this.watchesService.addWatch(createWatchDto);
    return watch;
  }

  @Patch(":id")
  updateWatch(
    @Param("id") id: string,
    @Body() updateWatchDto: UpdateWatchDto
  ): Watch {
    const watch = this.watchesService.updateWatch(
      id,
      updateWatchDto
    );
    return watch;
  }

  @Delete(":id")
  deleteWatch(@Param("id") id: string): void {
    this.watchesService.deleteWatch(id);
  }
}
