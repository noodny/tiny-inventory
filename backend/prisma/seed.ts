import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Clear existing data
  await prisma.item.deleteMany();

  await prisma.item.createMany({
    data: [
      {
        name: 'Wireless Keyboard',
        description: 'Compact wireless keyboard with USB receiver',
        quantity: 50,
        price: 49.99,
        sku: 'KB-WIRELESS-001',
      },
      {
        name: 'USB-C Hub',
        description: '7-in-1 USB-C hub with HDMI, USB 3.0, and SD card reader',
        quantity: 30,
        price: 34.99,
        sku: 'HUB-USBC-007',
      },
      {
        name: 'Monitor Stand',
        description: 'Adjustable aluminium monitor stand with storage drawer',
        quantity: 20,
        price: 79.99,
        sku: 'STAND-MON-AL',
      },
      {
        name: 'Webcam HD 1080p',
        description: 'Full HD webcam with built-in microphone and autofocus',
        quantity: 15,
        price: 89.99,
        sku: 'CAM-HD-1080',
      },
      {
        name: 'Desk Mat',
        description: 'Large extended desk mat, 900×400mm, non-slip base',
        quantity: 100,
        price: 24.99,
        sku: 'MAT-DESK-LG',
      },
    ],
  });

  const count = await prisma.item.count();
  console.log(`Seeding complete — ${count} items in database.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
