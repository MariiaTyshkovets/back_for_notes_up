import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { CategoryType } from "../interfaces/interfaces";

export class CreateNoteDto {

    @IsString()            
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    @IsEnum(CategoryType)
    readonly category: CategoryType;

    @IsString()
    readonly content: string;

    @IsString()
    readonly dates: string;
}