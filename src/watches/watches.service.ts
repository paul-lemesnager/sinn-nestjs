/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateWatchDto } from "./create-watch.dto";
import { UpdateWatchDto } from "./update-watch.dto";
import { Watch } from "./watch.model";

@Injectable()
export class WatchesService {
  private watches: Watch[] = [];

  addWatch(createWatchDto: CreateWatchDto): Watch {
    const id = (Math.floor(Math.random() * 10000) + 1).toString();
    const watch = new Watch(id, createWatchDto.title, createWatchDto.description, createWatchDto.price);
    this.watches.push(watch);
    return watch;
  }

  getWatches() {
    return [...this.watches];
  }

  getWatch(id: string) {
    const watch = this.findWatch(id)[0];
    return { ...watch };
  }

  updateWatch(id: string, updateWatchDto: UpdateWatchDto): Watch {
    const [watch, index] = this.findWatch(id);

    const updatedWatch = { id: id, ...updateWatchDto };

    this.watches[index] = { id: id, ...updateWatchDto };

    return updatedWatch;
  }

  deleteWatch(id: string) {
    const index = this.findWatch(id)[1];
    this.watches.splice(index, 1);
  }

  private findWatch(id: string): [Watch, number] {
    const watchIndex = this.watches.findIndex((watch) => watch.id === id);
    const watch = this.watches[watchIndex];
    if (!watch) {
      throw new NotFoundException("Could not find watch.");
    }
    return [watch, watchIndex];
  }
}
