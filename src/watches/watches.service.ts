/*
https://docs.nestjs.com/providers#services
*/

import { Model } from "mongoose";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CreateWatchDto } from "./create-watch.dto";
import { UpdateWatchDto } from "./update-watch.dto";
import { Watch, WatchDocument } from "./watch.schema";

@Injectable()
export class WatchesService {
  private watches: any[] = [];

  constructor(@InjectModel(Watch.name) private readonly watchModel: Model<WatchDocument>) {}

  async addWatch(createWatchDto: CreateWatchDto) {
    const watch = new this.watchModel(createWatchDto);
    const addedWatch = await watch.save();
    console.log(addedWatch);
    return addedWatch;
  }

  getWatches() {
    return [...this.watches];
  }

  getWatch(id: string) {
    const watch = this.findWatch(id)[0];
    return { ...watch };
  }

  updateWatch(id: string, updateWatchDto: UpdateWatchDto) {
    const [watch, index] = this.findWatch(id);

    const updatedWatch = { id: id, ...updateWatchDto };

    this.watches[index] = { id: id, ...updateWatchDto };

    return updatedWatch;
  }

  deleteWatch(id: string) {
    const index = this.findWatch(id)[1];
    this.watches.splice(index, 1);
  }

  private findWatch(id: string): [any, number] {
    const watchIndex = this.watches.findIndex((watch) => watch.id === id);
    const watch = this.watches[watchIndex];
    if (!watch) {
      throw new NotFoundException("Could not find watch.");
    }
    return [watch, watchIndex];
  }
}
