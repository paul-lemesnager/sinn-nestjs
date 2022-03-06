/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, NotFoundException } from "@nestjs/common";
import { Watch } from "./watch.model";

@Injectable()
export class WatchesService {
  private watches: Watch[] = [];

  addWatch(title: string, description: string, price: number) {
    const id = Math.random().toString();
    const watch = new Watch(id, title, description, price);
    this.watches.push(watch);
    return id;
  }

  getWatches() {
    return [...this.watches];
  }

  getWatch(id: string) {
    const watch = this.findWatch(id)[0];
    return { ...watch };
  }

  updateWatch(id: string, title: string, description: string, price: number) {
    const [watch, index] = this.findWatch(id);

    const updatedWatch = { ...watch };

    if (title) {
      updatedWatch.title = title;
    }

    if (description) {
      updatedWatch.description = description;
    }

    if (price) {
      updatedWatch.price = price;
    }

    this.watches[index] = { ...updatedWatch };

    return updatedWatch.id;
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
