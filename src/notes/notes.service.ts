import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateNoteDto } from './dto/create-note.dto'; 
import { UpdateNoteDto, UpdatePartialNoteDto } from './dto/update-note.dto';
import { CategoryType, Stat } from './interfaces/interfaces';
import { Note, NoteDocument } from './schemas/note.schema';

@Injectable()
export class NotesService {

    constructor(@InjectModel(Note.name) private notesModel: Model<NoteDocument>) {}

    statNames: string[] = [CategoryType.TASK, CategoryType.RANDOMTHOUGHT, CategoryType.IDEA];
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

    async updateOne(id: string, noteDto: UpdatePartialNoteDto): Promise<Note> {
        let note = this.notesModel.findById(id).exec();
        let active = (await note).active;
        let archived = (await note).archived;
        let deleted = (await note).deleted;
        let name = (await note).noteContent.name;
        let category = (await note).noteContent.category;
        let content = (await note).noteContent.content;
        let dates = (await note).noteContent.dates;
        if (noteDto.active === false || noteDto.active) {
            active = noteDto.active;
        }
        if (noteDto.archived === false || noteDto.archived) {
            archived = noteDto.archived;
        }
        if (noteDto.deleted === false || noteDto.archived) {
            deleted = noteDto.deleted;
        }
        if (noteDto.name) {
            name = noteDto.name;
        }
        if (noteDto.category) {
            category = noteDto.category;
        }
        if (noteDto.content) {
            content = noteDto.content;
        }
        if (noteDto.dates) {
            dates = noteDto.dates;
        }
        return this.notesModel.findByIdAndUpdate( id, {
            noteContent: {name: name, category: category, content: content, dates: dates, created: Date.now()},
            active: active,
            archived: archived,
            deleted: deleted
        })
    }
}   
