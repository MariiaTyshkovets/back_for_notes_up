import { IsBoolean, IsNotEmpty } from "class-validator"
import { NoteType } from "../interfaces/interfaces";

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