import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsInt,
  Min,
  Max,
} from 'class-validator';

export class CreateRoomDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  desc: string;

  @IsNumber()
  price: number;

  @IsString()
  img: string;

  country: string;

  type: string;

  @IsInt()
  @Max(5)
  @Min(1)
  review: number;

  unavailableDates: [number];
}
