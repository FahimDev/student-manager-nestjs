import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { DBService } from 'src/database/db.service';
import { Admin } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminsService {
  constructor(private dbService: DBService) {}
  // Creating new admin as user
  async create(createAdminDto: CreateAdminDto) {
    /* 
      As the Admin model has dependency on User Model,
      this insert operation will follow the Atomic Transaction Property.
      Ref: https://www.prisma.io/docs/guides/performance-and-optimization/prisma-client-transactions-guide
    */
    let data: Admin = null;
    let messages: string[] = [];
    let status: string = '';
    // Password encryption Ref: https://docs.nestjs.com/security/encryption-and-hashing
    const salt = await bcrypt.genSalt();    // Generating Salt for encrypting Password.
    const hashedPassword = await bcrypt.hash(createAdminDto.password, salt);    // Plain text password hashed.
    try {
      data = await this.dbService.admin.create({
        data: {
          name: createAdminDto.name,
          phone: createAdminDto.phone,
          designation: createAdminDto.designation,
          user: {
            // Ensuring atomic transaction
            create: {
              username: createAdminDto.username,
              password: hashedPassword,
              email: createAdminDto.email,
              role: createAdminDto.role,
            },
          },
        },
      });
      messages.push(`Admin enrolled successfully.`);
      status = 'success';
    } catch (error) {
      messages.push('Admin enrollment was not successful!');
      status = 'failed';
    } finally {
      // Following common standard for API response.
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
      return this.dbService.admin.findFirst({
        where: {
          id: id,
        },
      });
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    let data: Admin = null;
    let messages: string[] = [];
    let status: string = '';
    /*
    Though Admin has dependency on User Model,
    during the update operation this controller will only 
    allow the Update request of Admin data.
    */
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
      messages.push('Admin record cannot be updated or found!');
      status = 'failed';
    } finally {
      // Following common standard for API response.
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
    let status: string = '';
    try {
      data = await this.dbService.admin.delete({
        where: {
          id: id,
        },
      });
      messages.push('Admin record successfully deleted');
      status = 'success';
    } catch (error) {
      messages.push(`Admin record cannot be deleted or found. #${error}`);
      status = 'failed';
    } finally {
      // Following common standard for API response.
      let response: Iresponse = {
        status: status,
        messages: messages,
      };
      return response;
    }
  }
}
