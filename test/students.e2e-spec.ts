import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { response } from 'express';
import * as request from 'supertest';
import { DBService } from '../src/database/db.service';
import { StudentsModule } from '../src/students/students.module';
import { StudentsService } from '../src/students/students.service';

describe('StudentsController (e2e)', () => {
  let app: INestApplication;
  let server;

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
    const newStudent = {
      name: 'newStudent',
      phone: '0123',
      address: '123',
      email: 'newStudent@mail.com',
      program_id: 1,
    };

    return server
      .post('/students')
      .send(newStudent)
      .expect(201)
      .expect((res) => {
        expect(res.body.status).toEqual('success');
        expect(res.body.data).toEqual({
          id: expect.any(Number),
          ...newStudent,
        });
      });
  });

  it('/students (GET)', async () => {
    return server.get('/students').expect(200);
  });

  it('/students/:id (GET)', async () => {
    return server
      .get('/students/1')
      .expect(200)
      .expect((res) => {
        expect(res.body.name).toEqual('Student 1');
      });
  });

  it('/students/:id (PATCH)', async () => {
    const updateStudent = {
      name: 'updatedStudent',
      phone: '0123',
      address: '123',
      email: 'updatedStudent@mail.com',
    };

    return server
      .patch('/students/1')
      .send(updateStudent)
      .expect(200)
      .expect((res) => {
        expect(res.body.status).toEqual('success');
      });
  });

  it('/students/:id (DELETE)', async () => {
    return server
      .delete('/students/1')
      .expect(200)
      .expect((res) => {
        expect(res.body.status).toEqual('success');
      });
  });
});
