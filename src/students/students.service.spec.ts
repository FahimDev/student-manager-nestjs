import { Test, TestingModule } from '@nestjs/testing';
import { StudentsService } from './students.service';
import { DBService } from '../database/db.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { faker } from '@faker-js/faker';
import { Student } from '@prisma/client';

describe('StudentsService', () => {
  let service: StudentsService;

  let mockStudentDB = [];
  const mockDBService = {
    student: {},
  };
  mockDBService.student = {
    findMany: jest.fn(() => mockStudentDB),
    findFirst: jest.fn(({ where: { id } }) =>
      mockStudentDB.find((student) => student.id === id),
    ),
    create: jest.fn(({ data: student }) => {
      const newStudent = {
        id: mockStudentDB.length + 1,
        ...student,
      };
      mockStudentDB.push(newStudent);
      return newStudent;
    }),
    update: jest.fn(({ where: { id }, data: student }) => {
      const updatedStudent = {
        id: id,
        ...student,
      };
      const index = mockStudentDB.findIndex((s) => s.id === id);
      mockStudentDB[index] = updatedStudent;
      return updatedStudent;
    }),
    delete: jest.fn(
      ({ where: { id } }) =>
        (mockStudentDB = mockStudentDB.filter((s) => s.id !== id)),
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentsService,
        { provide: DBService, useValue: mockDBService },
      ],
    }).compile();

    service = module.get<StudentsService>(StudentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  let mockStudentId: number;
  const mockStudent = {
    name: faker.name.fullName(),
    phone: faker.phone.number(),
    address: faker.address.streetAddress(),
    email: faker.internet.email(),
    program_id: 1,
  } as CreateStudentDto;

  it('should create a new student', async () => {
    const response = await service.create(mockStudent);
    expect(response.status).toEqual('success');
    expect(response.data).toBeDefined();
    expect(response.data).toEqual({ id: expect.any(Number), ...mockStudent });

    mockStudentId = (response.data as Student).id;
  });

  it('should find all students', async () => {
    const response = await service.findAll();
    expect(response).toBeDefined();
    expect(Array.isArray(response.data)).toBe(true);
    expect((response.data as Student[]).length).toBeGreaterThan(0);
  });

  it('should find one student', async () => {
    const response = await service.findOne(mockStudentId);
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
    const response = await service.update(mockStudentId, updateStudent);
    expect(response.status).toEqual('success');
    expect((response.data as Student).name).toEqual(updateStudent.name);
  });

  it('should delete student', async () => {
    const response = await service.remove(mockStudentId);
    expect(response.status).toEqual('success');
  });
});
