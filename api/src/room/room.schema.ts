import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RoomDocument = HydratedDocument<Room>;

@Schema({ timestamps: true })
export class Room {
  @Prop({ required: true, unique: true })
  title: string;

  @Prop({ required: true, unique: true })
  desc: string;

  @Prop({ required: true })
  price: number;

  @Prop()
  img: string;

  @Prop({ required: true })
  country: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true, min: 1, max: 5 })
  review: number;

  @Prop({ type: [Number], default: [] })
  unavailableDates: number[];
}

export const RoomSchema = SchemaFactory.createForClass(Room);
