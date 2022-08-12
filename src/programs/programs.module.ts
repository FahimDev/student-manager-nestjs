import { Module } from '@nestjs/common';
import { ProgramsService } from './programs.service';
import { ProgramsController } from './programs.controller';
import { DBService } from 'src/database/db.service';

@Module({
  controllers: [ProgramsController],
  providers: [ProgramsService, DBService]
})
export class ProgramsModule {}
