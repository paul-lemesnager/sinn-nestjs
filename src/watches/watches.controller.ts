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
  async getAllWatches()  {
    const watches = await this.watchesService.getWatches();
    return watches;
  }

  @Get(":id")
  async findById(@Param("id") id: string) {
    const watch = await this.watchesService.getWatch(id);
    return watch;
  }

  @Post()
  async createWatch(
    @Body() createWatchDto: CreateWatchDto
  ) {
    const watch = await this.watchesService.addWatch(createWatchDto);
    return watch;
  }

  @Patch(":id")
  async updateWatch(
    @Param("id") id: string,
    @Body() updateWatchDto: UpdateWatchDto
  ) {
    const watch = await this.watchesService.updateWatch(
      id,
      updateWatchDto
    );
    return watch;
  }

  @Delete(":id")
  async deleteWatch(@Param("id") id: string): Promise<void> {
    await this.watchesService.deleteWatch(id);
  }
}
