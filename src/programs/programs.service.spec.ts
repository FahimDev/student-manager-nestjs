import { Test, TestingModule } from '@nestjs/testing';
import { DBService } from '../database/db.service';
import { ProgramsService } from './programs.service';

describe('ProgramsService', () => {
  let service: ProgramsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProgramsService, { provide: DBService, useClass: DBService }],
    }).compile();

    service = module.get<ProgramsService>(ProgramsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
