import { faker } from '@faker-js/faker';
import { PrismaClient, ProgramType, Role } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.student.deleteMany();
  await prisma.program.deleteMany();

  // Create a new program
  await prisma.program.create({
    data: {
      id: 1,
      title: 'Science Program',
      description: 'Science Program Details',
      type: ProgramType.SCIENCE,
    },
  });

  // Create some new students
  for (let i = 0; i < 10; i++) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    await prisma.student.create({
      data: {
        name: faker.name.fullName({ firstName, lastName }),
        email: faker.internet.email(firstName, lastName),
        program_id: 1,
        phone: faker.phone.number(),
        address: faker.address.streetAddress(),
      },
    });
  }
}

main()
  .catch((e) => {
    console.log(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
