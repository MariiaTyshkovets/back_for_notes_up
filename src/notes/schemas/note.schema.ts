import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type NoteDocument = Note & Document;

@Schema()
export class Note {

    @Prop(raw({
        name: { type: String, required: true },
        category: { type: String, required: true },
        content: { type: String, required: true },
        created: { type: Number, required: true },
        dates: { type: String }
    }))
    noteContent: Record<string, any>

    @Prop({ type: Boolean, required: true },)
    archived: boolean;

    @Prop({ type: Boolean, required: true })
    active: boolean;

    @Prop({ type: Boolean, required: true })
    deleted: boolean;
}

export const NoteSchema = SchemaFactory.createForClass(Note);