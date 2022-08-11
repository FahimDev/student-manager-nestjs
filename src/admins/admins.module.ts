import { Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import { DBService } from 'src/database/db.service';

@Module({
  controllers: [AdminsController],
  providers: [AdminsService, DBService]
})
export class AdminsModule {}
