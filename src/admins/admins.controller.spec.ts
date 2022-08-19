import { Test, TestingModule } from '@nestjs/testing';
import { AdminsController } from './admins.controller';
import { AdminsService } from './admins.service';
import { DBService } from '../database/db.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { faker } from '@faker-js/faker';
import { UpdateAdminDto } from './dto/update-admin.dto';

describe('AdminsController', () => {
  let controller: AdminsController;
  let adminId:number;
  let adminInfo: CreateAdminDto;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminsController],
      providers: [AdminsService, { provide: DBService, useClass: DBService }],
    }).compile();

    controller = module.get<AdminsController>(AdminsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  //https://fakerjs.dev/guide/
    it('should create new admin', async () => {
      const newAdmin = {
        name: faker.name.fullName(),
        email: faker.internet.email(),
        phone: faker.random.numeric(11),
        username: String(faker.internet.userName()),
        password: faker.internet.password(),
        role: 'ADMIN',
        designation: faker.name.jobArea(),
      } as CreateAdminDto;
      const response = await controller.create(newAdmin);
      expect(response.status).toEqual('success');
      expect(response.data).toBeDefined();
      adminId = response.data['id'];
      adminInfo = newAdmin;
    });

    it('should find all admins', async () => {
      const response = await controller.findAll();
      expect(response).toBeDefined();
      expect(response.length).toBeGreaterThan(0);
    });

    it('should find the recently created admin', async () => {
      const response = await controller.findOne(String(adminId));
      expect(response).toBeDefined();
    });

    
  it('should update the recently created admin info', async () => {
    const updateStudent = {
      name: faker.name.fullName(),
      phone: faker.random.numeric(11),
      designation: faker.name.jobArea(),
    } as UpdateAdminDto;
    const response = await controller.update(String(adminId), updateStudent);
    expect(response.status).toEqual('success');
    console.log(`
    ---------Current Admin information---------
    ${adminInfo.name}
    ---------Updated Admin information---------
    ${updateStudent.name}
    --------------------END--------------------
    `);
    adminInfo.name = updateStudent.name;
    adminInfo.phone = updateStudent.phone;
    adminInfo.designation = updateStudent.designation;

  });

  it('should delete recently updated admin', async () => {
    const response = await controller.remove(String(adminId));
    expect(response.status).toEqual('success');
    console.log(`
    ---------Admin removed successfully---------
    ${adminInfo.name}
    --------------------END---------------------
    `);
  });

});
