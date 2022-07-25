import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WatchDocument = Watch & Document;

@Schema()
export class Watch {
  @Prop({required: true})
  title: string;

  @Prop({required: true})
  price: number;

  @Prop({required: true})
  description: string;

  @Prop()
  shortDescription: string;

  @Prop()
  images: string[];

  @Prop()
  warranty: number;

  @Prop()
  dimension: number[];

  @Prop()
  video: string;

  @Prop()
  docs: string;

  @Prop()
  movement: string;

  @Prop()
  specs: string[];
}

export const WatchSchema = SchemaFactory.createForClass(Watch);
