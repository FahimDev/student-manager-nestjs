import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { faker } from '@faker-js/faker';
import { DBService } from '../src/database/db.service';
import { AdminsModule } from '../src/admins/admins.module';
import { AdminsService } from '../src/admins/admins.service';
import { CreateAdminDto } from '../src/admins/dto/create-admin.dto';
import { UpdateAdminDto } from '../src/admins/dto/update-admin.dto';
import { Admin } from '@prisma/client';

describe('AdminsController (e2e)', () => {
    let app: INestApplication;
    let server;

    let mockAdminId: number;
    const mockAdmin = {
        name: faker.name.fullName(),
        email: faker.internet.email(),
        phone: faker.random.numeric(11),
        username: String(faker.internet.userName()),
        password: faker.internet.password(),
        role: 'ADMIN',
        designation: faker.name.jobArea(),
      } as CreateAdminDto;

      beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
          imports: [AdminsModule],
          providers: [AdminsService, { provide: DBService, useClass: DBService }],
        }).compile();
    
        app = module.createNestApplication();
        server = request(app.getHttpServer());
        await app.init();
      });

      it('/admins (POST)', async () => {
        return server
          .post('/admins')
          .send(mockAdmin)
          .expect(HttpStatus.CREATED)
          .expect(({ body: { status, data } }) => {
            expect(status).toEqual('success');
            expect(data).toEqual({
              id: expect.any(Number),
              ...mockAdmin,
            });
    
            mockAdminId = data.id;
          });
      });

      it('/admins (GET)', async () => {
        return server
          .get('/admins')
          .expect(HttpStatus.OK)
          .expect(({ body: { status, data } }) => {
            expect(status).toEqual('success');
            expect(Array.isArray(data)).toBe(true);
            expect((data as Admin[]).length).toBeGreaterThan(0);
          });
      });
    
      it('/admins/:id (GET)', async () => {
        return server
          .get(`/admins/${mockAdminId}`)
          .expect(HttpStatus.OK)
          .expect((res) => {
            expect(res).toBeDefined();
            expect((res.body.data as Admin).name).toEqual(mockAdmin.name);
          });
      });
});