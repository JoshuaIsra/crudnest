import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeeDto } from './create-employee.dto';
import { IsNotEmpty, IsString, Length } from 'class-validator';

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
  
    position: string;
  

}
