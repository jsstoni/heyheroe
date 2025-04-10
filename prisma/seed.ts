import fs from 'fs/promises';
import { PrismaClient } from '../src/lib/prisma/generated/client';

const prisma = new PrismaClient();

async function main() {
  const services = JSON.parse(
    await fs.readFile('./data/services.json', 'utf-8')
  );
  const subservices = JSON.parse(
    await fs.readFile('./data/sub-services.json', 'utf-8')
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
