import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RoomDocument } from './room.schema';
import { Model } from 'mongoose';
import { CreateRoomDto } from './dtos/create-room.dto';
import { UpdateRoomDto } from './dtos/update-room.dto';
import { Types } from './types.enum';

@Injectable()
export class RoomService {
  constructor(
    @InjectModel('Room') private readonly roomModel: Model<RoomDocument>,
  ) {}

  async create(createRoomDto: CreateRoomDto): Promise<RoomDocument> {
    const room = await this.roomModel.find({ title: createRoomDto.title });
    if (room.length) throw new BadRequestException('title has been used');

    const newRoom = new this.roomModel(createRoomDto);
    return newRoom.save();
  }

  async find(type?: string): Promise<RoomDocument[]> {
    let rooms = this.roomModel.find({}).limit(15);
    if (!rooms) throw new NotFoundException('Rooms not found!');

    if (!type) return rooms;

    rooms = this.roomModel.find({ type }).limit(15);
    if (!rooms) throw new NotFoundException('Rooms not found!');

    return rooms;
  }

  async findOne(id: string): Promise<RoomDocument> {
    const room = await this.roomModel.findById(id);

    if (!room) throw new NotFoundException('Room not found!');

    return room;
  }

  async findTypes(): Promise<{
    apartment: number;
    villa: number;
    penthouse: number;
    bungalow: number;
  }> {
    const apartment = await this.roomModel
      .find({ type: Types.Apartment })
      .countDocuments();
    const villa = await this.roomModel
      .find({ type: Types.Villa })
      .countDocuments();
    const penthouse = await this.roomModel
      .find({ type: Types.Penthouse })
      .countDocuments();
    const bungalow = await this.roomModel
      .find({ type: Types.Bungalow })
      .countDocuments();

    return { apartment, villa, penthouse, bungalow };
  }

  async delete(id: string) {
    const room = await this.roomModel.findById(id);

    if (!room) return null;

    return await this.roomModel.findByIdAndDelete(id);
  }

  async update(id: string, updateRoomDto: Partial<UpdateRoomDto>) {
    const room = await this.findOne(id);
    if (!room) throw new NotFoundException('Room not found!');

    const updatedRoom = await this.roomModel.findByIdAndUpdate(
      id,
      { $set: updateRoomDto },
      { new: true },
    );

    await updatedRoom.save();
    return updatedRoom;
  }

  async bookRoom(
    id: string,
    unavailableDates: number[],
  ): Promise<RoomDocument> {
    const room = await this.findOne(id);
    if (!room) throw new NotFoundException('Room not found!');

    room.unavailableDates = room.unavailableDates.concat(unavailableDates);
    await room.save();
    return room;
  }
}
