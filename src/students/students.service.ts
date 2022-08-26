import { Injectable } from '@nestjs/common';
import { Student } from '@prisma/client';
import { DBService } from '../database/db.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentsService {
  constructor(private dbService: DBService) {}

  async create(createStudentDto: CreateStudentDto) {
    let response: Iresponse;
    let data: Student = null;

    try {
      data = await this.dbService.student.create({
        data: createStudentDto,
      });
      response = this.manageResponse(
        'success',
        'Student record successfully created',
        data,
      );
    } catch (error) {
      response = this.manageResponse(
        'failed',
        'Student record cannot be created',
      );
    } finally {
      return response;
    }
  }

  async findAll() {
    let response: Iresponse;
    const data = await this.dbService.student.findMany();

    if (data) {
      response = await this.manageResponse(
        'success',
        'Student record(s) successfully found',
        data,
      );
    } else {
      response = await this.manageResponse('failed', 'Empty student record!');
    }

    return response;
  }

  async findOne(id: number) {
    let response: Iresponse;
    const data = await this.dbService.student.findFirst({
      where: {
        id: id,
      },
    });

    if (data) {
      response = await this.manageResponse(
        'success',
        "Requested student's record successfully found",
        data,
      );
    } else {
      response = await this.manageResponse(
        'failed',
        "Requested student's record not found",
      );
    }

    return response;
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    let response: Iresponse;
    let data: Student = null;

    try {
      data = await this.dbService.student.update({
        where: {
          id: id,
        },
        data: updateStudentDto,
      });
      response = this.manageResponse(
        'success',
        'Student record successfully updated',
        data,
      );
    } catch (error) {
      response = this.manageResponse(
        'failed',
        'Student record cannot be updated or found',
      );
    } finally {
      return response;
    }
  }

  async remove(id: number) {
    let response: Iresponse;
    let data: Student = null;

    try {
      data = await this.dbService.student.delete({
        where: {
          id: id,
        },
      });
      response = this.manageResponse(
        'success',
        'Student record successfully deleted',
        data,
      );
    } catch (error) {
      response = this.manageResponse(
        'failed',
        'Student record cannot be deleted',
      );
    } finally {
      return response;
    }
  }

  manageResponse(status: string, message: string, data?: any): Iresponse {
    // Following common standard for API response.
    const messages: string[] = [];
    let response: Iresponse = null;
    messages.push(message);
    response = {
      status: status,
      messages: messages,
    };

    return data ? { ...response, data: data } : response;
  }
}
