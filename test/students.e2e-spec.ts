import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { DBService } from '../src/database/db.service';
import { StudentsModule } from '../src/students/students.module';
import { StudentsService } from '../src/students/students.service';
import { CreateStudentDto } from '../src/students/dto/create-student.dto';
import { UpdateStudentDto } from '../src/students/dto/update-student.dto';
import { faker } from '@faker-js/faker';
import { Student } from '@prisma/client';

describe('StudentsController (e2e)', () => {
  let app: INestApplication;
  let server;

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
      imports: [StudentsModule],
      providers: [StudentsService, { provide: DBService, useClass: DBService }],
    }).compile();

    app = module.createNestApplication();
    server = request(app.getHttpServer());
    await app.init();
  });

  it('/students (POST)', async () => {
    return server
      .post('/students')
      .send(mockStudent)
      .expect(HttpStatus.CREATED)
      .expect(({ body: { status, data } }) => {
        expect(status).toEqual('success');
        expect(data).toEqual({
          id: expect.any(Number),
          ...mockStudent,
        });

        mockStudentId = data.id;
      });
  });

  it('/students (GET)', async () => {
    return server
      .get('/students')
      .expect(HttpStatus.OK)
      .expect(({ body: { status, data } }) => {
        expect(status).toEqual('success');
        expect(Array.isArray(data)).toBe(true);
        expect((data as Student[]).length).toBeGreaterThan(0);
      });
  });

  it('/students/:id (GET)', async () => {
    return server
      .get(`/students/${mockStudentId}`)
      .expect(HttpStatus.OK)
      .expect((res) => {
        expect(res).toBeDefined();
        expect((res.body.data as Student).name).toEqual(mockStudent.name);
      });
  });

  it('/students/:id (PATCH)', async () => {
    const updatedStudent = {
      name: faker.name.fullName(),
      phone: faker.phone.number(),
      address: faker.address.city(),
      email: faker.internet.email(),
    } as UpdateStudentDto;

    return server
      .patch(`/students/${mockStudentId}`)
      .send(updatedStudent)
      .expect(HttpStatus.OK)
      .expect(({ body: { status, data } }) => {
        expect(status).toEqual('success');
        expect((data as Student).name).toEqual(updatedStudent.name);
      });
  });

  it('/students/:id (DELETE)', async () => {
    return server
      .delete(`/students/${mockStudentId}`)
      .expect(HttpStatus.OK)
      .expect(({ body: { status } }) => {
        expect(status).toEqual('success');
      });
  });
});
