import { Test, TestingModule } from '@nestjs/testing';
import { AdminsController } from './admins.controller';
import { AdminsService } from './admins.service';
import { DBService } from '../database/db.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { faker } from '@faker-js/faker';

describe('AdminsController', () => {
  let controller: AdminsController;

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
  describe('create', () => {
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
      console.log(newAdmin)
      const response = await controller.create(newAdmin);
      expect(response.status).toEqual('success');
      expect(response.data).toBeDefined();
    });
  });

  describe('findAll', () => {
    it('should find all admins', async () => {
      const response = await controller.findAll();
      expect(response).toBeDefined();
      expect(response.length).toBeGreaterThan(0);
    });
  });

});
