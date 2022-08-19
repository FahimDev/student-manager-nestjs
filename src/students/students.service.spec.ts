import { Test, TestingModule } from '@nestjs/testing';
import { StudentsService } from './students.service';
import { DBService } from '../database/db.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

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

  it('should create a new student', async () => {
    const newStudent = {
      name: 'newStudent',
      phone: '0123',
      address: '123',
      email: 'newStudent@mail.com',
      program_id: 1,
    } as CreateStudentDto;

    const response = await service.create(newStudent);
    expect(response.status).toEqual('success');
    expect(response.data).toBeDefined();
  });

  it('should find all students', async () => {
    const response = await service.findAll();
    console.log(response);
    expect(response).toBeDefined();
    expect(response.length).toBeGreaterThan(0);
  });

  it('should find one student', async () => {
    const response = await service.findOne(1);
    expect(response).toBeDefined();
    expect(response.name).toEqual('newStudent');
  });

  it('should update student', async () => {
    const updateStudent = {
      name: 'updatedStudent',
      phone: '0123',
      address: '123',
      email: 'updatedStudent@mail.com',
    } as UpdateStudentDto;
    const response = await service.update(1, updateStudent);
    expect(response.status).toEqual('success');
  });

  it('should delete student', async () => {
    const response = await service.remove(1);
    expect(response.status).toEqual('success');
  });
});
