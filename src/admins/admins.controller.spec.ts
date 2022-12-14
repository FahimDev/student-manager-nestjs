import { Test, TestingModule } from '@nestjs/testing';
import { AdminsController } from './admins.controller';
import { AdminsService } from './admins.service';
import { DBService } from '../database/db.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { faker } from '@faker-js/faker';
import { UpdateAdminDto } from './dto/update-admin.dto';

describe('AdminsController', () => {
  let controller: AdminsController;
  let adminInfo: CreateAdminDto;
  let adminId: number;
  let updatedAdminName: string;

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

  // https://fakerjs.dev/guide/
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
    expect(response.status).toEqual('success');
    expect(response.data).toBeDefined();
  });

  it("should find the recently created admin's information", async () => {
    const response = await controller.findOne(String(adminId));
    expect(response.status).toEqual('success');
    expect(response.data).toBeDefined();
    expect(response.data['name']).toEqual(adminInfo.name);
  });

  it("should update the recently created admin's information", async () => {
    updatedAdminName = faker.name.fullName();
    const updateStudent = {
      name: updatedAdminName,
      phone: faker.random.numeric(11),
      designation: faker.name.jobArea(),
    } as UpdateAdminDto;
    const response = await controller.update(String(adminId), updateStudent);
    expect(response.status).toEqual('success');
  });

  it('should delete recently created and updated admin', async () => {
    const response = await controller.remove(String(adminId));
    expect(response.status).toEqual('success');
    expect(response.data['name']).toEqual(updatedAdminName);
  });
});
