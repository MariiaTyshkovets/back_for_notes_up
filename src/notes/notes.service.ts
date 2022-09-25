import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateNoteDto } from './dto/create-note.dto'; 
import { UpdateNoteDto } from './dto/update-note.dto';
import { Stat } from './interfaces/interfaces';
import { Note, NoteDocument } from './schemas/note.schema';

@Injectable()
export class NotesService {

    constructor(@InjectModel(Note.name) private notesModel: Model<NoteDocument>) {}

    statNames: string[] = ["Task", "Random Thought", "Idea"];
    stats: Stat[] = [];

    async getAll(): Promise<Note[]> {
        return this.notesModel.find().exec();
    }

    async getById(id: string): Promise<Note> {
        return this.notesModel.findById(id);
    }

    async getStats(): Promise<Stat[]> {
        this.stats = [];
        let activeNotes = (await this.notesModel.find()).filter((elem) => elem.active === true);
        let archivedNotes = (await this.notesModel.find()).filter((elem) => elem.archived === true);
        this.statNames.forEach((category) => {
            let activeCategory = activeNotes.filter((elem) => elem.noteContent.category === category);
            let archivedCategory = archivedNotes.filter((elem) => elem.noteContent.category === category);
            let active = activeCategory.length ? activeCategory.length : 0;
            let archived = archivedCategory.length ? archivedCategory.length : 0;
            let newStat : Stat = {
                name: category,
                state: {
                    active: active,
                    archived: archived
                }
            };
            this.stats.push(newStat);
        })
        return this.stats;
    }

    async create(noteDto: CreateNoteDto): Promise<Note> {
        const newNote = new this.notesModel({
            noteContent: {...noteDto, created: Date.now()},
            active: true,
            archived: false,
            deleted: false
        });
        return newNote.save();
    }

    async remove(id: string) {
        return this.notesModel.findByIdAndRemove(id);
    }

    async update(id: string, noteDto: UpdateNoteDto): Promise<Note> {
        return this.notesModel.findByIdAndUpdate(id, {
            noteContent: {...noteDto.noteContent, created: Date.now()},
            active: noteDto.active,
            archived: noteDto.archived,
            deleted: noteDto.deleted
        });
    }
}
