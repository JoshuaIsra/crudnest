import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeeDto } from './create-employee.dto';
import { IsNotEmpty, IsString, Length } from 'class-validator';
import { Position } from 'src/positions/entities/position.entity';

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {
    @IsString()

    @Length(3, 20)
  
    @IsNotEmpty()
  
    name: string;
  
  
  
    @IsString()
  
    @Length(3, 20)
  
    @IsNotEmpty()
  
    lastName: string;
  
  
  
    @IsString()
  
    @IsNotEmpty()
  
    position: Position;
  

}
