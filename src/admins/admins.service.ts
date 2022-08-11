import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ApiTags } from '@nestjs/swagger';
import { DBService } from 'src/database/db.service';


@ApiTags('Students')
@Injectable()
export class AdminsService {
  constructor(private dbService: DBService){}

  create(createAdminDto: CreateAdminDto) {
    // return this.dbService.admin.create({
    //   data:{
    //     name: createAdminDto.name,
    //     email: createAdminDto.email,
    //     phone: createAdminDto.phone,
    //     user_id: {
    //       create: {
    //           username: createAdminDto.username,
    //           password: createAdminDto.password,
    //           role: createAdminDto.role,
    //       },
    //     },
    //   },
    // });
  }

  findAll() {
    return `This action returns all admins`;
  }

  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
