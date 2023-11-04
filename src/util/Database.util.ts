import { PrismaClient } from "@prisma/client";

async function clearDatabase() {
  const prisma = new PrismaClient();

  try {
    await prisma.$connect;
    await prisma.user.deleteMany();
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export default clearDatabase;
