import { Injectable } from '@nestjs/common';
import { Program } from '@prisma/client';
import { DBService } from '../database/db.service';
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
      return this.manageResponse(status, messages, data);
    }
  }

  async findAll() {
    let data = await this.dbService.program.findMany();
    let status = 'success';
    let  messages: ['Program record(s) successfully found'];

    return this.manageResponse(status, messages, data);
  }

  async findOne(id: number) {
    let data: Program = null;
    const messages: string[] = [];
    let status: string = '';

    try {
      data = await this.dbService.program.findUniqueOrThrow({
        where: {
          id: id,
        },
      });

      messages.push("Requested student's record successfully found");
      status = 'success';
    } catch (error) {
      messages.push("Requested program's record cannot be found");
      status = 'failed';
    } finally {
      return this.manageResponse(status, messages, data);
    }
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
      return this.manageResponse(status, messages, data);
    }
  }

  async remove(id: number) {
    let messages: string[] = [];
    let status: string = '';

    try {
      await this.dbService.program.delete({
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
      return this.manageResponse(status, messages);
    }
  }

  async findStudents(id: number) {
    let data: any = null;
    let messages: string[] = [];
    let status: string = '';

    data = await this.dbService.program.findMany({
      where: { id: id },
      include: { student: true },
    });

    status = 'success';
    messages.push("Program's student record(s) successfully found");

    return this.manageResponse(status, messages, data);
  }

  manageResponse(status: string, messages: string[], data?: any) {
    // Following common standard for API response.
    let response: Iresponse = null;
    response = {
      status: status,
      messages: messages,
    };
    return data ? { ...response, data: data } : response;
  }
}
