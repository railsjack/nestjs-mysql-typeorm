import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Between, LessThanOrEqual, MoreThanOrEqual, Repository} from 'typeorm';
import {Note} from './note.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note) private notesRepository: Repository<Note>,
  ) {
  }

  async getNotes(): Promise<Note[]> {
    return await this.notesRepository.find();
  }

  findOne(id: string): Promise<Note> {
    return this.notesRepository.findOne(id);
  }

  findOverlapped(_startDate: string, _endDate: string): Promise<Note> {
    const startDate = (!_startDate || _startDate === '-') ? new Date(0) : _startDate;
    const endDate = (!_endDate || _endDate === '-') ? new Date(100000000000000) : _endDate;
    return this.notesRepository.findOne({
      where: [
        {
          startDate: LessThanOrEqual(startDate),
          endDate: MoreThanOrEqual(startDate),
        },

        {
          startDate: LessThanOrEqual(endDate),
          endDate: MoreThanOrEqual(endDate),
        },

        {
          startDate: LessThanOrEqual(startDate),
          endDate: MoreThanOrEqual(endDate),
        },

        {
          startDate: Between(startDate, endDate),
          endDate: Between(startDate, endDate),
        },
      ]
    });
  }

  async createNote(note: Note) {
    this.notesRepository.save(note);
  }

  async remove(id: string): Promise<void> {
    await this.notesRepository.delete(id);
  }

  async editNote(id: number, note: Note): Promise<Note> {
    const editedNote = await this.notesRepository.findOne(id);
    if (!editedNote) {
      throw new NotFoundException('Note is not found');
    }
    editedNote.description = note.description;
    editedNote.title = note.title;
    await editedNote.save();
    return editedNote;
  }
}
