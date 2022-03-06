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
import { WatchesService } from "./watches.service";

@Controller("watches")
export class WatchesController {
  constructor(private watchesService: WatchesService) {}

  @Get()
  getAllWatches() {
    return this.watchesService.getWatches();
  }

  @Get(":id")
  findById(@Param("id") id: string) {
    return this.watchesService.getWatch(id);
  }

  @Post()
  createWatch(
    @Body("title") title: string,
    @Body("description") description: string,
    @Body("price") price: number
  ) {
    const watchId = this.watchesService.addWatch(title, description, price);
    return { id: watchId };
  }

  @Patch(":id")
  updateWatch(
    @Param("id") id: string,
    @Body("title") title: string,
    @Body("description") description: string,
    @Body("price") price: number
  ) {
    const watchId = this.watchesService.updateWatch(
      id,
      title,
      description,
      price
    );
    return { id: watchId };
  }

  @Delete(":id")
  deleteWatch(@Param("id") id: string) {
    this.watchesService.deleteWatch(id);
    return null;
  }
}
