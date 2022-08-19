import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { DBService } from '../database/db.service';
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
    let response: Iresponse = null;
    // Password encryption Ref: https://docs.nestjs.com/security/encryption-and-hashing
    const salt = await bcrypt.genSalt(); // Generating Salt for encrypting Password.
    const hashedPassword = await bcrypt.hash(createAdminDto.password, salt); // Plain text password hashed.
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
      response = await this.manageResponse(
        'success',
        'Admin enrolled successfully',
        data,
      );
    } catch (error) {
      response = await this.manageResponse(
        'failed',
        'Admin enrollment was not successful!',
      );
    } finally {
      return response;
    }
  }

  async findAll() {
    let response: Iresponse = null;
    const data = await this.dbService.admin.findMany();
    if (data) {
      response = await this.manageResponse(
        'success',
        'Admin record(s) successfully found',
        data,
      );
    } else {
      response = await this.manageResponse('Empty admin record!', 'failed');
    }
    return response;
  }

  async findOne(id: number) {
    let response: Iresponse = null;
    const data = await this.dbService.admin.findFirst({
      where: {
        id: id,
      },
    });
    if (data) {
      response = await this.manageResponse(
        'success',
        "Requested admin's record successfully found",
        data,
      );
    } else {
      response = await this.manageResponse(
        'failed',
        "Requested admin's record not found",
      );
    }
    return response;
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    let data: Admin = null;
    let response: Iresponse = null;
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
      response = await this.manageResponse(
        'success',
        'Admin record updated successfully',
        data,
      );
    } catch (error) {
      response = await this.manageResponse(
        'failed',
        'Admin record cannot be updated or found!',
      );
    } finally {
      return response;
    }
  }

  async remove(id: number) {
    let data: Admin = null;
    let response: Iresponse = null;
    try {
      data = await this.dbService.admin.delete({
        where: {
          id: id,
        },
      });
      response = await this.manageResponse(
        'success',
        'Admin record successfully deleted',
        data,
      );
    } catch (error) {
      response = await this.manageResponse(
        'failed',
        'Admin record cannot be deleted or found',
      );
    } finally {
      return response;
    }
  }

  async manageResponse(status: string, message: string, data?: any) {
    // Following common standard for API response.
    let messages: string[] = [];
    let response: Iresponse = null;
    messages.push(message);
    response = {
      status: status,
      messages: messages,
    };
    return data ? { ...response, data: data } : response;
  }
}
