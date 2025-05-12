import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

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

    @IsString()
    @IsNotEmpty()
    position: string;
    
}
