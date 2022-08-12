import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { DBService } from 'src/database/db.service';
import { Admin } from '@prisma/client';

@Injectable()
export class AdminsService {
  constructor(private dbService: DBService){}

  async create(createAdminDto: CreateAdminDto) {
    let data: Admin = null;
    let messages: string[] = [];
    let status: string = "";
    try {
      data = await this.dbService.admin.create({
        data:{
          name: createAdminDto.name,
          phone: createAdminDto.phone,
          designation: createAdminDto.designation,
          user: {
            create: {
                username: createAdminDto.username,
                password: createAdminDto.password,
                email: createAdminDto.email,
                role: createAdminDto.role,
            },
          },
        },
      });
      messages.push('Admin enrolled successfully');
      status = 'success';
    } catch (error) {
      messages.push('Admin enrollment was not successful!');
      status = 'failed';
    } finally {
      let response: Iresponse = {
        status: status,
        messages: messages,
      };
      response = data ? { ...response, data: data } : response;
      return response;
    }
  
  }

  findAll() {
    return this.dbService.admin.findMany();
  }

  async findOne(id: number) {
    let data: Admin = null;
    let messages: string[] = [];
    let status: string = "";
    try {
      data = await this.dbService.admin.findFirst({
        where: {
          id: id,
        },
      });
      messages.push('Admin record by ID found successfully');
      status = 'success';
    } catch (error) {
      messages.push('Admin record cannot be found by its ID');
      status = 'failed';
    } finally {
      let response: Iresponse = {
        status: status,
        messages: messages,
      };
      response = data ? { ...response, data: data } : response;
      return response;
    }
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    let data: Admin = null;
    let messages: string[] = [];
    let status: string = "";
    try {
      data = await this.dbService.admin.update({
        where: {
          id: id,
        },
        data: updateAdminDto,
      });
      messages.push('Admin record updated successfully');
      status = 'success';
    } catch (error) {
      messages.push('Admin record cannot be updated or found');
      status = 'failed';
    } finally {
      let response: Iresponse = {
        status: status,
        messages: messages,
      };
      response = data ? { ...response, data: data } : response;
      return response;
    }
  }

  async remove(id: number) {
    let data: Admin = null;
    let messages: string[] = [];
    let status: string = "";
    try {
      data = await this.dbService.admin.delete({
        where: {
          id: id,
        },
      });
      messages.push('Admin record successfully deleted');
      status = 'success';
    } catch (error) {
      messages.push('Admin record cannot be deleted or found.');
      status = 'failed';
    } finally {
      let response: Iresponse = {
      status: status,
      messages: messages,
      };
      return response;
    }
  }
}
