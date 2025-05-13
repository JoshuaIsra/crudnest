import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";
import { Position } from "src/positions/entities/position.entity";

export class CreateEmployeeDto {
    @IsString()
    @Length(3,20)
    @IsNotEmpty()
    name: string;

    @IsString()
    @Length(3,20)
    @IsNotEmpty()
    lastName: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    position: Position;
    
}
