import { Injectable } from '@nestjs/common';
import { Program } from '@prisma/client';
import { DBService } from 'src/database/db.service';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';

@Injectable()
export class ProgramsService {
  constructor(private dbService: DBService) {}

  async create(createProgramDto: CreateProgramDto) {
    let data: Program = null;
    const messages: string[] = [];
    let status: string = '';

    try {
      data = await this.dbService.program.create({
        data: createProgramDto,
      });
      messages.push('Program record successfully created');
      status = 'success';
    } catch (error) {
      messages.push('Program record cannot be created');
      status = 'failed';
    } finally {
      let response: Iresponse = {
        status: status,
        messages: messages,
      };

      response = data ? { ...response, data: data } : response;

      return response;
    }
  }

  findAll() {
    return this.dbService.program.findMany();
  }

  findOne(id: number) {
    return this.dbService.student.findFirst({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateProgramDto: UpdateProgramDto) {
    let data: Program = null;
    let messages: string[] = [];
    let status: string = '';

    try {
      data = await this.dbService.program.update({
        where: {
          id: id,
        },
        data: updateProgramDto,
      });
      messages.push('Program record successfully updated');
      status = 'success';
    } catch (error) {
      messages.push('Program record cannot be updated or found');
      status = 'failed';
    } finally {
      let response: Iresponse = {
        status: status,
        messages: messages,
      };

      response = data ? { ...response, data: data } : response;

      return response;
    }
  }

  async remove(id: number) {
    let data: Program = null;
    let messages: string[] = [];
    let status: string = '';

    try {
      data = await this.dbService.program.delete({
        where: {
          id: id,
        },
      });
      messages.push('Program record successfully deleted');
      status = 'success';
    } catch (error) {
      messages.push('Program record cannot be deleted or found');
      status = 'failed';
    } finally {
      let response: Iresponse = {
        status: status,
        messages: messages,
      };

      return response;
    }
  }

  findStudents(id: number) {
    return this.dbService.program.findMany({
      where: { id: id },
      include: { student: true },
    });
  }
}
