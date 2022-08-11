import { Injectable } from '@nestjs/common';
import { Prisma, Student } from '@prisma/client';
import { DBService } from 'src/database/db.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

interface Iresponse {
  status: string;
  messages: string[];
  data?: Student;
}

@Injectable()
export class StudentsService {
  constructor(private dbService: DBService) {}

  async create(createStudentDto: CreateStudentDto) {
    let data: Student = null;
    let messages: string[] = [];
    let status: string = "";

    try {
      data = await this.dbService.student.create({
        data: createStudentDto,
      });
      messages.push('Student record successfully created');
      status = 'success';
    } catch (error) {
      messages.push('Student record cannot be created');
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
    return this.dbService.student.findMany();
  }

  findOne(id: number) {
    return this.dbService.student.findFirst({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    let data: Student = null;
    let messages: string[] = [];
    let status: string = "";

    try {
      data = await this.dbService.student.update({
        where: {
          id: id,
        },
        data: updateStudentDto,
      });
      messages.push('Student record successfully updated');
      status = 'success';
    } catch (error) {
      messages.push('Student record cannot be updated or found');
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
    let data: Student = null;
    let messages: string[] = [];
    let status: string = "";

    try {
      data = await this.dbService.student.delete({
        where: {
          id: id,
        },
      });
      messages.push('Student record successfully deleted');
      status = 'success';
    } catch (error) {
      messages.push('Student record cannot be deleted or found');
      status = 'failed';
    } finally {
      let response: Iresponse = {
        status: status,
        messages: messages,
      };

      return response;
    }
  }
}
