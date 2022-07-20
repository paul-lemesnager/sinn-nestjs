import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WatchDocument = Watch & Document;

@Schema()
export class Watch {
  @Prop({required: true})
  title: string;

  @Prop({required: true})
  price: number;

  @Prop()
  description: string;
}

export const WatchSchema = SchemaFactory.createForClass(Watch);
