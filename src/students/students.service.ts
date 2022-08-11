import { Injectable } from '@nestjs/common';
import { Prisma, Student } from '@prisma/client';
import { DBService } from 'src/database/db.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentsService {
  constructor(private dbService: DBService) {}

  create(createStudentDto: CreateStudentDto) {
    return this.dbService.student.create({
      data: createStudentDto,
    });
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

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return this.dbService.student.update({
      where: {
        id: id,
      },
      data: updateStudentDto,
    });
  }

  remove(id: number) {
    return this.dbService.student.delete({
      where: {
        id: id,
      },
    });
  }
}
