import { PrismaClient } from '@/lib/prisma/generated/client';
import fs from 'node:fs/promises';

const prisma = new PrismaClient();

async function main() {
  const services = JSON.parse(
    await fs.readFile('./constants/services.json', 'utf-8')
  );
  const subservices = JSON.parse(
    await fs.readFile('./constants/sub-services.json', 'utf-8')
  );

  await prisma.services.createMany({
    data: services,
  });

  await prisma.subServices.createMany({
    data: subservices,
  });

  console.log('Seeding completed successfully!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('Error during seeding:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
