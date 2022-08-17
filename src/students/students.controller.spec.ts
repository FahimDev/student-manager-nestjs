import { Test, TestingModule } from '@nestjs/testing';
import { DBService } from '../database/db.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';

describe('StudentsController', () => {
  let controller: StudentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentsController],
      providers: [StudentsService, { provide: DBService, useClass: DBService }],
    }).compile();

    controller = module.get<StudentsController>(StudentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create new student', async () => {
    const newStudent = {
      name: 'newStudent',
      phone: '0123',
      address: '123',
      email: 'newStudent@mail.com',
      program_id: 1,
    } as CreateStudentDto;

    const response = await controller.create(newStudent);
    expect(response.status).toEqual('success');
    expect(response.data).toBeDefined();
    expect(response.data).toEqual({ id: expect.any(Number), ...newStudent });
  });

  it('should find all students', async () => {
    const response = await controller.findAll();
    expect(response).toBeDefined();
    expect(response.length).toBeGreaterThan(0);
  });

  it('should find one student', async () => {
    const response = await controller.findOne('1');
    expect(response).toBeDefined();
    expect(response.name).toEqual('Student 1');
  });

  it('should update student', async () => {
    const updateStudent = {
      name: 'updatedStudent',
      phone: '0123',
      address: '123',
      email: 'updatedStudent@mail.com',
    } as UpdateStudentDto;
    const response = await controller.update('1', updateStudent);
    expect(response.status).toEqual('success');
  });

  it('should delete student', async () => {
    const response = await controller.remove('1');
    expect(response.status).toEqual('success');
  });
});
