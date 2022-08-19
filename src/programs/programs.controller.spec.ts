import { Test, TestingModule } from '@nestjs/testing';
import { DBService } from '../database/db.service';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import { ProgramsController } from './programs.controller';
import { ProgramsService } from './programs.service';

describe('ProgramsController', () => {
  let controller: ProgramsController;
  let programID: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProgramsController],
      providers: [ProgramsService, { provide: DBService, useClass: DBService }],
    }).compile();

    controller = module.get<ProgramsController>(ProgramsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create new program', async () => {
    const newProgram = {
      title: 'Arts',
      description: 'text',
      type: 'ARTS',
    } as CreateProgramDto;

    const response: any = await controller.create(newProgram);
    programID = response.data.id;

    expect(response.status).toEqual('success');
    expect(response.data).toBeDefined();
    expect(response.data).toEqual({ id: expect.any(Number), ...newProgram });
  });

  it('should find all programs', async () => {
    const response: any = await controller.findAll();
    expect(response.status).toEqual('success');
    expect(response.data.length).toBeGreaterThan(0);
  });

  it('should find one program', async () => {
    const response: any = await controller.findOne(programID);
    expect(response.status).toEqual('success');
    expect(response.data.title).toEqual('Arts');
  });

  it('should find all the students of the program', async () => {
    const response: any = await controller.findStudents(programID);
    expect(response.status).toEqual('success');
  });

  it('should update program', async () => {
    const updateProgram = {
      description: 'new text',
    } as UpdateProgramDto;
    const response = await controller.update(programID, updateProgram);
    expect(response.status).toEqual('success');
  });

  it('should delete program', async () => {
    const response = await controller.remove(programID);
    expect(response.status).toEqual('success');
  });
});
