import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/auth/role/role.enum';
import { Roles } from 'src/auth/role/roles.decorator';
import { CreateRoomDto } from './dtos/create-room.dto';
import { UpdateRoomDto } from './dtos/update-room.dto';
import { saveImageToStorage } from './helpers/image-storage';
import { RoomDocument } from './room.schema';
import { RoomService } from './room.service';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  @UseGuards(JwtGuard)
  create(@Body() createRoomDto: CreateRoomDto): Promise<RoomDocument> {
    return this.roomService.create(createRoomDto);
  }

  @Get()
  find(@Query('type') type?: string): Promise<RoomDocument[]> {
    return this.roomService.find(type);
  }
  @Get('types')
  async findTypes(@Res() res: Response): Promise<{}> {
    const types = await this.roomService.findTypes();
    return res.send({ ...types });
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<RoomDocument> {
    return this.roomService.findOne(id);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtGuard, RolesGuard)
  @Delete(':id')
  async delete(@Param('id') id: string, @Res() res: Response) {
    await this.roomService.delete(id);
    return res.send('Room has been deleted!');
  }

  @Roles(Role.Admin)
  @UseGuards(JwtGuard, RolesGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRoomDto: Partial<UpdateRoomDto>,
  ): Promise<RoomDocument> {
    return this.roomService.update(id, updateRoomDto);
  }

  @UseGuards(JwtGuard)
  @Put('/bookroom/:id')
  bookRoom(
    @Param('id') id: string,
    @Body('unavailableDates') unavailableDates: number[],
  ): Promise<RoomDocument> {
    return this.roomService.bookRoom(id, unavailableDates);
  }

  @UseGuards(JwtGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', saveImageToStorage))
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    const filename = file?.filename;
    if (!filename)
      return res.status(400).json({ msg: 'File must be a png, jpg or jpeg!' });

    return res
      .status(200)
      .json({ msg: 'File uploaded successfully!', filename });
  }
}
