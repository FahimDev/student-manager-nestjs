import { Injectable } from '@nestjs/common';
import { Program, Student } from '@prisma/client';
import { response } from 'express';
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
      let response: Iresponse = {
        status: status,
        messages: messages,
      };

      response = data ? { ...response, data: data } : response;

      return response;
    }
  }

  async findAll() {
    let programs = await this.dbService.program.findMany();
    let response: Iresponse = {
      status: 'success',
      messages: ['Program record(s) successfully found'],
      data: programs,
    };
    return response;
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

      let response: Iresponse = {
        status: status,
        messages: messages,
      };

      response = data ? { ...response, data: data } : response;
      return response;
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
      let response: Iresponse = {
        status: status,
        messages: messages,
      };

      response = data ? { ...response, data: data } : response;

      return response;
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
      let response: Iresponse = {
        status: status,
        messages: messages,
      };

      return response;
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
    messages.push('Program\'s student record(s) successfully found')

    let response: Iresponse = {
      status: status,
      messages: messages,
      data: data
    };

    return response;
  }
}
