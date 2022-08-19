import { Test, TestingModule } from '@nestjs/testing';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { DBService } from '../database/db.service';
import { Request, Response } from 'express';

describe('StudentsController', () => {
  let controller: StudentsController;
  const requestMock = {
    query: {},
  } as unknown as Request;

  const statusResponse = {
    status: jest.fn((x) => x),
    send: jest.fn((x) => x),
  } as unknown as Response;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentsController],
      providers: [StudentsService, { provide: DBService, useClass: DBService }],
    }).compile();

    controller = module.get<StudentsController>(StudentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    controller.findAll(requestMock, statusResponse);
    expect(statusResponse.status).toHaveBeenCalledWith(200);
  });
});
