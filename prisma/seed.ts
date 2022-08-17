import { PrismaClient, ProgramType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.student.deleteMany();
  await prisma.program.deleteMany();

  // Create a new program
  await prisma.program.create({
    data: {
      id: 1,
      title: 'Program 1',
      description: 'Program 1 description',
      type: ProgramType.SCIENCE,
    },
  });

  // Create a new student
  await prisma.student.create({
    data: {
      id: 1,
      name: 'Student 1',
      email: 'student1@gmail.com',
      program_id: 1,
      phone: '1234567890',
      address: '123 Main St',
    },
  });
}

main()
  .catch((e) => {
    console.log(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
