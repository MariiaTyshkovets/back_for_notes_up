import { IsBoolean } from "class-validator"
import { NoteType } from "../interfaces/interfaces";

export class UpdateNoteDto {

    readonly noteContent: NoteType;

    @IsBoolean()
    readonly archived: boolean;

    @IsBoolean()
    readonly active: boolean;

    @IsBoolean()
    readonly deleted: boolean;
}   