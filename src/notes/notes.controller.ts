import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Stat } from './interfaces/interfaces';
import { NotesService } from './notes.service';
import { Note } from './schemas/note.schema';

@Controller('notes')
export class NotesController {

    constructor (private readonly notesService: NotesService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    getAll(): Promise<Note[]> {
        return this.notesService.getAll();
    }

    @Get("stats")
    getStats(): Promise<Stat[]> {
        return this.notesService.getStats();
    }

    @Get(":id")
    getOne(@Param("id") id: string): Promise<Note> {
        return this.notesService.getById(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UsePipes(new ValidationPipe({ transform: true }))
    create(@Body() createNoteDto: CreateNoteDto): Promise<Note> {
        return this.notesService.create(createNoteDto);
    }

    @Delete(":id")
    removeOne(@Param("id") id: string): Promise<Note> {
        return this.notesService.remove(id);
    }

    @Patch(":id")
    @UsePipes(new ValidationPipe({ transform: true }))
    update(@Body() updateNoteDto: UpdateNoteDto, @Param("id") id: string): Promise<Note> {
        return this.notesService.update(id, updateNoteDto);
    }
}