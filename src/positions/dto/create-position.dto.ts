import { IsNotEmpty, IsNumber, IsString, Length, MinLength } from "class-validator";

export class CreatePositionDto {
    @IsString()
    @Length(3,20)
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description : string;

    @IsNumber()
    @IsNotEmpty()
    salary: number;

}
