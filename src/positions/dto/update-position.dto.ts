import { PartialType } from '@nestjs/mapped-types';
import { CreatePositionDto } from './create-position.dto';
import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class UpdatePositionDto extends PartialType(CreatePositionDto) {
    @IsString()
    @Length(3, 20)
    @IsNotEmpty()
    name: string; 

    @IsString()
    @IsNotEmpty()
    description : string;

    @IsNumber()
    @IsNotEmpty()
    salary: number;
}
