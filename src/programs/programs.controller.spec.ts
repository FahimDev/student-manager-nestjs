import { Test } from '@nestjs/testing';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import { ProgramsController } from './programs.controller';
import { ProgramsService } from './programs.service';

import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';

const moduleMocker = new ModuleMocker(global);

const createResult = {
  status: 'success',
  messages: ['Program record successfully created'],
  data: {
    id: 2,
    title: 'Commerce',
    description: 'text',
    type: 'COMMERCE',
  },
};

const findAllResult = {
  status: 'success',
  messages: ['Program record(s) successfully found'],
  data: [
    {
      id: 1,
      title: 'Science',
      description: 'text',
      type: 'SCIENCE',
    },
  ],
};

const findOneResult = {
  status: 'success',
  messages: ['Requested student\'s record successfully found'],
  data: {
    id: 2,
    title: 'Commerce',
    description: 'text',
    type: 'COMMERCE',
  },
};

const findStudentsResults = {
  status: 'success',
  messages: ['Program\'s student record(s) successfully found'],
  data: [
    {
      id: 1,
      name: 'Antonin',
      email: 'antonin@gmail.com',
      phone: '016',
      address: 'Dhaka',
      programId: 1
    },
  ],
}

const updateResult = {
  status: 'success',
  messages: ['Program record successfully updated'],
  data: {
    id: 2,
    title: 'Commerce',
    description: 'Modified description',
    type: 'COMMERCE',
  },
}

const deleteResult = {
  status: 'success',
  messages: ['Program record successfully deleted'],
}

describe('ProgramsController', () => {
  let controller: ProgramsController;
  let programID: any;
  let programTitle: string;

  beforeEach(async () => {
    
    const moduleRef = await Test.createTestingModule({
      controllers: [ProgramsController],
    })
      .useMocker((token) => { // token are the classes called in controller
        if (token === ProgramsService) {
          
          return {
            create: jest.fn().mockResolvedValue(createResult),
            findAll: jest.fn().mockResolvedValue(findAllResult),
            findOne: jest.fn().mockResolvedValue(findOneResult),
            findStudents: jest.fn().mockResolvedValue(findStudentsResults),
            update: jest.fn().mockResolvedValue(updateResult),
            remove: jest.fn().mockResolvedValue(deleteResult),
          };
        }
        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(
            token,
          ) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }
      })
      .compile();

    controller = moduleRef.get(ProgramsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create new program', async () => {
    const newProgram = {
      title: 'Commerce',
      description: 'text',
      type: 'COMMERCE',
    } as CreateProgramDto;

    const response: any = await controller.create(newProgram);
    programID = response.data.id;
    programTitle = response.data.title

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
    expect(response.data.title).toEqual(programTitle);
  });

  it('should find all the students of the program', async () => {
    const response: any = await controller.findStudents(programID);
    expect(response.status).toEqual('success');
  });

  it('should update program', async () => {
    const updateProgram = {
      description: 'Modified description',
    } as UpdateProgramDto;
    const response = await controller.update(programID, updateProgram);
    expect(response.status).toEqual('success');
  });

  it('should delete program', async () => {
    const response = await controller.remove(programID);
    expect(response.status).toEqual('success');
  });
});
