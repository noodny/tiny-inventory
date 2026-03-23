import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Clear existing data (order matters due to foreign keys)
  await prisma.inventory.deleteMany();
  await prisma.product.deleteMany();
  await prisma.store.deleteMany();

  // Create stores
  const [downtown, airport, mall] = await prisma.$transaction([
    prisma.store.create({ data: { name: 'Downtown Store' } }),
    prisma.store.create({ data: { name: 'Airport Kiosk' } }),
    prisma.store.create({ data: { name: 'Mall Outlet' } }),
  ]);

  // Create products
  const [keyboard, hub, monitor, webcam, mat] = await prisma.$transaction([
    prisma.product.create({
      data: {
        sku: 'KB-WIRELESS-001',
        name: 'Wireless Keyboard',
        category: 'Peripherals',
        description: 'Compact wireless keyboard with USB receiver',
        price: 49.99,
      },
    }),
    prisma.product.create({
      data: {
        sku: 'HUB-USBC-007',
        name: 'USB-C Hub',
        category: 'Peripherals',
        description: '7-in-1 USB-C hub with HDMI, USB 3.0, and SD card reader',
        price: 34.99,
      },
    }),
    prisma.product.create({
      data: {
        sku: 'STAND-MON-AL',
        name: 'Monitor Stand',
        category: 'Furniture',
        description: 'Adjustable aluminium monitor stand with storage drawer',
        price: 79.99,
      },
    }),
    prisma.product.create({
      data: {
        sku: 'CAM-HD-1080',
        name: 'Webcam HD 1080p',
        category: 'Peripherals',
        description: 'Full HD webcam with built-in microphone and autofocus',
        price: 89.99,
      },
    }),
    prisma.product.create({
      data: {
        sku: 'MAT-DESK-LG',
        name: 'Desk Mat',
        category: 'Accessories',
        description: 'Large extended desk mat, 900x400mm, non-slip base',
        price: 24.99,
      },
    }),
  ] as const);

  // Create inventory assignments
  await prisma.inventory.createMany({
    data: [
      { storeId: downtown.id, productId: keyboard.id, quantity: 50 },
      { storeId: downtown.id, productId: hub.id, quantity: 30 },
      { storeId: downtown.id, productId: monitor.id, quantity: 20 },
      { storeId: airport.id, productId: keyboard.id, quantity: 15 },
      { storeId: airport.id, productId: webcam.id, quantity: 10 },
      { storeId: mall.id, productId: mat.id, quantity: 100 },
      { storeId: mall.id, productId: hub.id, quantity: 25 },
      { storeId: mall.id, productId: monitor.id, quantity: 8 },
    ],
  });

  const storeCount = await prisma.store.count();
  const productCount = await prisma.product.count();
  const inventoryCount = await prisma.inventory.count();
  console.log(
    `Seeding complete — ${storeCount} stores, ${productCount} products, ${inventoryCount} inventory records.`,
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
