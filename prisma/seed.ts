import { faker } from '@faker-js/faker';
import { PrismaClient, ProgramType } from '@prisma/client';

const prisma = new PrismaClient();

async function resetDatabase() {
  await prisma.student.deleteMany();
  await prisma.program.deleteMany();
}

async function createMockPrograms() {
  await prisma.program.create({
    data: {
      id: 1,
      title: 'Science Program',
      description: 'Science Program Details',
      type: ProgramType.SCIENCE,
    },
  });
}

async function createStudents() {
  const students = [];

  for (let i = 0; i < 10; i++) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    students.push({
      name: faker.name.fullName({ firstName, lastName }),
      email: faker.internet.email(firstName, lastName),
      program_id: 1,
      phone: faker.phone.number(),
      address: faker.address.streetAddress(),
    });
  }

  await prisma.student.createMany({ data: students });
}

async function main() {
  await resetDatabase();
  await createMockPrograms();
  await createStudents();
}

main()
  .catch((e) => {
    console.log(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
