import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ParseIntPipe } from '@nestjs/common/pipes/parse-int.pipe';
import { DefaultValuePipe } from '@nestjs/common/pipes/default-value.pipe';
import { Note } from './note.entity';
import { NotesService } from './notes.service';

@Controller('notes')
export class NotesController {
  constructor(private notesService: NotesService) {}

  @Get()
  findAll() {
    return this.notesService.getNotes();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id) {
    return this.notesService.findOne(id);
  }

  @Get(':startDate/:endDate')
  findOverlapped(
    @Param('startDate') startDate: string,
    @Param('endDate') endDate: string,
    ) {
    return this.notesService.findOverlapped(startDate, endDate);
  }

  @Post() create(@Body() note: Note) {
    return this.notesService.createNote(note);
  }

  @Patch(':id')
  async editNote(@Body() note: Note, @Param('id') id: number): Promise<Note> {
    const noteEdited = await this.notesService.editNote(id, note);
    return noteEdited;
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id) {
    this.notesService.remove(id);
  }
}
