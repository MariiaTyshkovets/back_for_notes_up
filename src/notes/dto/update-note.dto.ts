import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator"
import { CategoryType, NoteType } from "../interfaces/interfaces";

export class UpdateNoteDto {

    readonly noteContent: NoteType;

    @IsBoolean()
    @IsNotEmpty()
    readonly archived: boolean;

    @IsBoolean()
    @IsNotEmpty()
    readonly active: boolean;

    @IsBoolean()
    @IsNotEmpty()
    readonly deleted: boolean;
}   

export class UpdatePartialNoteDto {

    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @IsEnum(CategoryType)
    category: CategoryType;

    @IsOptional()
    @IsString()
    content: string;

    @IsOptional()
    @IsString()
    dates: string;

    @IsOptional()
    @IsBoolean()
    @IsNotEmpty()
    readonly archived: boolean;

    @IsOptional()
    @IsBoolean()
    @IsNotEmpty()
    readonly active: boolean;

    @IsOptional()
    @IsBoolean()
    @IsNotEmpty()
    readonly deleted: boolean;
}