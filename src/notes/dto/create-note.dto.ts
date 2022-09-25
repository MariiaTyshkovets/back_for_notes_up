import { IsString } from "class-validator";

export class CreateNoteDto {

    @IsString()            
    readonly name: string;

    @IsString()
    readonly category: string;

    @IsString()
    readonly content: string;

    @IsString()
    readonly dates: string;
}