import { Test, TestingModule } from '@nestjs/testing';
import { DBService } from '../database/db.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { faker } from '@faker-js/faker';
import { Student } from '@prisma/client';

describe('StudentsController', () => {
  let controller: StudentsController;
  let mockStudentId: number;
  const mockStudent = {
    name: faker.name.fullName(),
    phone: faker.phone.number(),
    address: faker.address.streetAddress(),
    email: faker.internet.email(),
    program_id: 1,
  } as CreateStudentDto;

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
    const response = await controller.create(mockStudent);
    expect(response.status).toEqual('success');
    expect(response.data).toBeDefined();
    expect(response.data).toEqual({ id: expect.any(Number), ...mockStudent });

    mockStudentId = (response.data as Student).id;
  });

  it('should find all students', async () => {
    const response = await controller.findAll();
    expect(response).toBeDefined();
    expect(Array.isArray(response.data)).toBe(true);
    expect((response.data as Student[]).length).toBeGreaterThan(0);
  });

  it('should find one student', async () => {
    const response = await controller.findOne(mockStudentId.toString());
    expect(response).toBeDefined();
    expect((response.data as Student).name).toEqual(mockStudent.name);
  });

  it('should update student', async () => {
    const updateStudent = {
      name: faker.name.fullName(),
      phone: faker.phone.number(),
      address: faker.address.city(),
      email: faker.internet.email(),
    } as UpdateStudentDto;
    const response = await controller.update(
      mockStudentId.toString(),
      updateStudent,
    );
    expect(response.status).toEqual('success');
    expect((response.data as Student).name).toEqual(updateStudent.name);
  });

  it('should delete student', async () => {
    const response = await controller.remove(mockStudentId.toString());
    expect(response.status).toEqual('success');
  });
});
