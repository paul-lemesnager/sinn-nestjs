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

  constructor(@InjectModel(Watch.name) private readonly watchModel: Model<WatchDocument>) {}

  async addWatch(createWatchDto: CreateWatchDto): Promise<Watch> {
    const watch = await new this.watchModel(createWatchDto).save();
    return watch as Watch;
  }

  async getWatches(): Promise<Watch[]> {
    const watches = await this.watchModel.find().exec();
    return watches;
  }

  async getWatch(id: string): Promise<Watch> {
    const watch = await this.findWatch(id);
    return watch;
  }

  async updateWatch(id: string, updateWatchDto: UpdateWatchDto) {
    const updatedWatch = await this.findWatch(id);

    if(updateWatchDto.title) updatedWatch.title = updateWatchDto.title;
    if(updateWatchDto.description) updatedWatch.description = updateWatchDto.description;
    if(updateWatchDto.price) updatedWatch.price = updateWatchDto.price;

    updatedWatch.save();

    return updatedWatch;
  }

  async deleteWatch(id: string) {
    const result = await this.watchModel.deleteOne({ id: id }).exec();
    
    if(result.deletedCount === 0) {
      throw new NotFoundException("Could not find watch.");
    }
  }

  private async findWatch(id: string): Promise<WatchDocument> {
    let watch;
    try {
      watch = await this.watchModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException("Could not find watch.");
    }

    if (!watch) {
      throw new NotFoundException("Could not find watch.");
    }
    return watch;
  }
}
