import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const stores = [
  'Downtown Flagship',
  'Airport Terminal 2',
  'Mall of America Outlet',
  'University Campus Store',
  'Suburban Retail Park',
  'Waterfront Warehouse',
  'Tech District Pop-Up',
];

const products = [
  // Peripherals (25)
  { sku: 'KB-WIRELESS-001', name: 'Wireless Keyboard', category: 'Peripherals', description: 'Compact wireless keyboard with USB receiver', price: 49.99 },
  { sku: 'KB-MECH-002', name: 'Mechanical Keyboard RGB', category: 'Peripherals', description: 'Cherry MX Blue switches, per-key RGB', price: 129.99 },
  { sku: 'KB-ERGO-003', name: 'Ergonomic Split Keyboard', category: 'Peripherals', description: 'Split layout with tenting adjustment', price: 179.99 },
  { sku: 'KB-COMPACT-004', name: '60% Compact Keyboard', category: 'Peripherals', description: 'Compact 60% layout, hot-swappable switches', price: 89.99 },
  { sku: 'MS-WIRELESS-001', name: 'Wireless Mouse', category: 'Peripherals', description: 'Ergonomic wireless mouse, 4000 DPI', price: 39.99 },
  { sku: 'MS-GAMING-002', name: 'Gaming Mouse', category: 'Peripherals', description: 'High-precision gaming mouse, 16000 DPI', price: 69.99 },
  { sku: 'MS-ERGO-003', name: 'Vertical Ergonomic Mouse', category: 'Peripherals', description: 'Vertical grip reduces wrist strain', price: 44.99 },
  { sku: 'MS-TRACKBALL-004', name: 'Trackball Mouse', category: 'Peripherals', description: 'Thumb-operated trackball, wireless', price: 54.99 },
  { sku: 'CAM-HD-1080', name: 'Webcam HD 1080p', category: 'Peripherals', description: 'Full HD webcam with built-in microphone', price: 89.99 },
  { sku: 'CAM-4K-002', name: 'Webcam 4K Pro', category: 'Peripherals', description: '4K UHD webcam with auto-framing', price: 199.99 },
  { sku: 'HS-WIRELESS-001', name: 'Wireless Headset', category: 'Peripherals', description: 'Over-ear wireless headset with ANC', price: 159.99 },
  { sku: 'HS-USB-002', name: 'USB Headset', category: 'Peripherals', description: 'USB-A headset with noise-cancelling mic', price: 49.99 },
  { sku: 'HS-BT-003', name: 'Bluetooth Earbuds', category: 'Peripherals', description: 'True wireless earbuds with charging case', price: 79.99 },
  { sku: 'MIC-USB-001', name: 'USB Condenser Microphone', category: 'Peripherals', description: 'Cardioid condenser mic for streaming', price: 119.99 },
  { sku: 'MIC-CLIP-002', name: 'Lavalier Clip Microphone', category: 'Peripherals', description: 'Clip-on omnidirectional lapel mic', price: 24.99 },
  { sku: 'HUB-USBC-007', name: 'USB-C Hub 7-in-1', category: 'Peripherals', description: 'HDMI, USB 3.0, SD card reader', price: 34.99 },
  { sku: 'HUB-USBC-012', name: 'USB-C Hub 12-in-1', category: 'Peripherals', description: 'Dual HDMI, Ethernet, USB-A/C ports', price: 64.99 },
  { sku: 'HUB-DOCK-001', name: 'Thunderbolt Dock', category: 'Peripherals', description: 'Thunderbolt 4 docking station, dual 4K', price: 249.99 },
  { sku: 'PAD-CHARGE-001', name: 'Wireless Charging Pad', category: 'Peripherals', description: '15W Qi wireless charging pad', price: 29.99 },
  { sku: 'PAD-MOUSE-001', name: 'Gaming Mouse Pad XL', category: 'Peripherals', description: 'Extended gaming mouse pad, 900x400mm', price: 19.99 },
  { sku: 'SPK-USB-001', name: 'USB Desktop Speakers', category: 'Peripherals', description: 'Compact 2.0 USB-powered speakers', price: 34.99 },
  { sku: 'SPK-BT-002', name: 'Bluetooth Speaker', category: 'Peripherals', description: 'Portable Bluetooth 5.0 speaker, IPX5', price: 59.99 },
  { sku: 'CTL-DRAWING-001', name: 'Drawing Tablet', category: 'Peripherals', description: 'Pen tablet with 8192 pressure levels', price: 79.99 },
  { sku: 'CTL-STREAM-001', name: 'Stream Deck Mini', category: 'Peripherals', description: '6-key programmable LCD macro pad', price: 69.99 },
  { sku: 'CTL-PRESENT-001', name: 'Wireless Presenter', category: 'Peripherals', description: 'Laser pointer with slide controls', price: 34.99 },

  // Electronics (20)
  { sku: 'MON-27-4K', name: '27" 4K Monitor', category: 'Electronics', description: '27-inch IPS 4K UHD, USB-C PD 65W', price: 449.99 },
  { sku: 'MON-32-CURVED', name: '32" Curved Monitor', category: 'Electronics', description: '32-inch curved VA panel, 165Hz', price: 349.99 },
  { sku: 'MON-24-FHD', name: '24" FHD Monitor', category: 'Electronics', description: '24-inch IPS Full HD, 75Hz', price: 179.99 },
  { sku: 'MON-PORTABLE-15', name: '15" Portable Monitor', category: 'Electronics', description: '15.6-inch portable USB-C display', price: 229.99 },
  { sku: 'MON-UW-34', name: '34" Ultrawide Monitor', category: 'Electronics', description: '34-inch UWQHD IPS, 100Hz', price: 599.99 },
  { sku: 'LAPTOP-STAND-HUB', name: 'Laptop Stand with Hub', category: 'Electronics', description: 'Aluminium stand with integrated USB hub', price: 89.99 },
  { sku: 'UPS-600VA', name: 'UPS 600VA', category: 'Electronics', description: 'Uninterruptible power supply, 600VA/360W', price: 79.99 },
  { sku: 'UPS-1500VA', name: 'UPS 1500VA', category: 'Electronics', description: 'Line-interactive UPS, 1500VA/900W', price: 189.99 },
  { sku: 'PWR-STRIP-SURGE', name: 'Surge Protector Strip', category: 'Electronics', description: '8-outlet surge protector, 2 USB ports', price: 29.99 },
  { sku: 'PWR-TRAVEL-001', name: 'Travel Power Adapter', category: 'Electronics', description: 'Universal adapter with 4 USB ports', price: 24.99 },
  { sku: 'LIGHT-DESK-LED', name: 'LED Desk Lamp', category: 'Electronics', description: 'Adjustable LED desk lamp, 5 colour temps', price: 44.99 },
  { sku: 'LIGHT-MONITOR', name: 'Monitor Light Bar', category: 'Electronics', description: 'Screen-mounted asymmetric light bar', price: 49.99 },
  { sku: 'LIGHT-RING-12', name: '12" Ring Light', category: 'Electronics', description: '12-inch ring light with tripod stand', price: 39.99 },
  { sku: 'LIGHT-KEY-001', name: 'Key Light Panel', category: 'Electronics', description: 'Studio-grade LED key light, 2800K-6500K', price: 149.99 },
  { sku: 'CHRG-GAN-65W', name: 'GaN Charger 65W', category: 'Electronics', description: 'GaN USB-C charger, 65W PD', price: 39.99 },
  { sku: 'CHRG-GAN-140W', name: 'GaN Charger 140W', category: 'Electronics', description: 'GaN multi-port charger, 140W total', price: 69.99 },
  { sku: 'CABLE-USBC-2M', name: 'USB-C Cable 2m', category: 'Electronics', description: 'USB-C to USB-C, 100W PD, 2 metres', price: 14.99 },
  { sku: 'CABLE-HDMI-3M', name: 'HDMI 2.1 Cable 3m', category: 'Electronics', description: '8K HDMI 2.1 cable, 3 metres', price: 19.99 },
  { sku: 'CABLE-DP-2M', name: 'DisplayPort Cable 2m', category: 'Electronics', description: 'DP 1.4 cable, 8K/60Hz, 2 metres', price: 16.99 },
  { sku: 'CABLE-ETH-CAT6A', name: 'Ethernet Cable Cat6a 5m', category: 'Electronics', description: 'Cat6a shielded patch cable, 5 metres', price: 12.99 },

  // Furniture (15)
  { sku: 'STAND-MON-AL', name: 'Aluminium Monitor Stand', category: 'Furniture', description: 'Adjustable stand with storage drawer', price: 79.99 },
  { sku: 'STAND-MON-DUAL', name: 'Dual Monitor Arm', category: 'Furniture', description: 'Gas spring dual monitor arm, 17-32"', price: 129.99 },
  { sku: 'STAND-MON-SINGLE', name: 'Single Monitor Arm', category: 'Furniture', description: 'Gas spring single monitor arm, 17-32"', price: 79.99 },
  { sku: 'STAND-LAPTOP', name: 'Laptop Riser Stand', category: 'Furniture', description: 'Adjustable aluminium laptop riser', price: 39.99 },
  { sku: 'DESK-SIT-STAND', name: 'Sit-Stand Desk Frame', category: 'Furniture', description: 'Electric height-adjustable desk frame', price: 399.99 },
  { sku: 'DESK-CONVERTER', name: 'Desk Converter', category: 'Furniture', description: 'Sit-to-stand desk converter, 36" wide', price: 249.99 },
  { sku: 'CHAIR-ERGO-001', name: 'Ergonomic Office Chair', category: 'Furniture', description: 'Mesh back, adjustable lumbar, headrest', price: 549.99 },
  { sku: 'CHAIR-BASIC-001', name: 'Basic Task Chair', category: 'Furniture', description: 'Padded seat, adjustable height', price: 149.99 },
  { sku: 'CHAIR-STOOL-001', name: 'Active Sitting Stool', category: 'Furniture', description: 'Wobble stool for active sitting', price: 89.99 },
  { sku: 'SHELF-DESK-001', name: 'Desktop Shelf Riser', category: 'Furniture', description: 'Bamboo desktop shelf with organiser', price: 49.99 },
  { sku: 'DRAWER-UNDER-001', name: 'Under-Desk Drawer', category: 'Furniture', description: 'Slide-out drawer, mounts under desk', price: 34.99 },
  { sku: 'TRAY-CABLE-001', name: 'Cable Management Tray', category: 'Furniture', description: 'Under-desk cable tray, 60cm', price: 24.99 },
  { sku: 'FOOT-REST-001', name: 'Ergonomic Footrest', category: 'Furniture', description: 'Adjustable tilt footrest', price: 39.99 },
  { sku: 'PANEL-PRIVACY', name: 'Desk Privacy Panel', category: 'Furniture', description: 'Acoustic privacy panel, 120cm', price: 69.99 },
  { sku: 'BOARD-WHITE-001', name: 'Magnetic Whiteboard', category: 'Furniture', description: 'Wall-mounted magnetic whiteboard, 90x60cm', price: 59.99 },

  // Accessories (20)
  { sku: 'MAT-DESK-LG', name: 'Desk Mat Large', category: 'Accessories', description: 'PU leather desk mat, 900x400mm', price: 24.99 },
  { sku: 'MAT-DESK-SM', name: 'Desk Mat Small', category: 'Accessories', description: 'PU leather desk mat, 600x300mm', price: 16.99 },
  { sku: 'WRIST-KB-001', name: 'Keyboard Wrist Rest', category: 'Accessories', description: 'Memory foam keyboard wrist rest', price: 14.99 },
  { sku: 'WRIST-MS-001', name: 'Mouse Wrist Rest', category: 'Accessories', description: 'Gel mouse wrist rest pad', price: 9.99 },
  { sku: 'CLEAN-KIT-001', name: 'Electronics Cleaning Kit', category: 'Accessories', description: 'Screen cleaner, microfibre cloth, brush', price: 12.99 },
  { sku: 'CLEAN-AIR-001', name: 'Compressed Air Duster', category: 'Accessories', description: 'Electric air duster, rechargeable', price: 39.99 },
  { sku: 'COVER-WEBCAM-001', name: 'Webcam Privacy Cover', category: 'Accessories', description: 'Slide webcam privacy cover, 3-pack', price: 6.99 },
  { sku: 'FILTER-SCREEN-24', name: '24" Privacy Screen Filter', category: 'Accessories', description: 'Anti-spy screen filter for 24" monitors', price: 44.99 },
  { sku: 'FILTER-SCREEN-27', name: '27" Privacy Screen Filter', category: 'Accessories', description: 'Anti-spy screen filter for 27" monitors', price: 54.99 },
  { sku: 'SLEEVE-LAPTOP-14', name: '14" Laptop Sleeve', category: 'Accessories', description: 'Neoprene laptop sleeve, 14 inch', price: 19.99 },
  { sku: 'SLEEVE-LAPTOP-16', name: '16" Laptop Sleeve', category: 'Accessories', description: 'Neoprene laptop sleeve, 16 inch', price: 22.99 },
  { sku: 'BAG-BACKPACK-001', name: 'Tech Backpack', category: 'Accessories', description: 'Laptop backpack, fits 16", USB charging port', price: 69.99 },
  { sku: 'BAG-MESSENGER-001', name: 'Messenger Bag', category: 'Accessories', description: 'Canvas messenger bag with padded laptop compartment', price: 54.99 },
  { sku: 'ORG-CABLE-001', name: 'Cable Organiser Clips', category: 'Accessories', description: 'Silicone cable clips, 10-pack', price: 8.99 },
  { sku: 'ORG-CABLE-BOX', name: 'Cable Management Box', category: 'Accessories', description: 'Cable box with lid, hides power strips', price: 19.99 },
  { sku: 'ORG-DESK-001', name: 'Desk Organiser', category: 'Accessories', description: 'Bamboo desk organiser with drawers', price: 29.99 },
  { sku: 'TAG-AIRTAG-HOLD', name: 'AirTag Holder', category: 'Accessories', description: 'Keychain AirTag holder, 4-pack', price: 14.99 },
  { sku: 'STICKER-PACK-001', name: 'Developer Sticker Pack', category: 'Accessories', description: '50 vinyl dev/tech stickers', price: 9.99 },
  { sku: 'BOTTLE-THERMAL', name: 'Thermal Water Bottle', category: 'Accessories', description: 'Insulated stainless steel, 750ml', price: 24.99 },
  { sku: 'MUG-HEATED-001', name: 'Heated Smart Mug', category: 'Accessories', description: 'Temperature-controlled smart mug', price: 99.99 },

  // Networking (10)
  { sku: 'RTR-WIFI6E-001', name: 'Wi-Fi 6E Router', category: 'Networking', description: 'Tri-band Wi-Fi 6E router, AX5400', price: 199.99 },
  { sku: 'RTR-MESH-3PK', name: 'Mesh Wi-Fi System (3-pack)', category: 'Networking', description: 'Whole-home mesh Wi-Fi 6 system', price: 299.99 },
  { sku: 'RTR-TRAVEL-001', name: 'Travel Router', category: 'Networking', description: 'Pocket-sized travel Wi-Fi router', price: 39.99 },
  { sku: 'SW-8PORT-GB', name: '8-Port Gigabit Switch', category: 'Networking', description: 'Unmanaged 8-port Gigabit Ethernet switch', price: 29.99 },
  { sku: 'SW-5PORT-25G', name: '5-Port 2.5G Switch', category: 'Networking', description: 'Unmanaged 5-port 2.5GbE switch', price: 69.99 },
  { sku: 'AP-CEILING-001', name: 'Ceiling Access Point', category: 'Networking', description: 'PoE ceiling-mount Wi-Fi 6 access point', price: 129.99 },
  { sku: 'ADAPT-USB-ETH', name: 'USB to Ethernet Adapter', category: 'Networking', description: 'USB-C to Gigabit Ethernet adapter', price: 19.99 },
  { sku: 'ADAPT-USB-WIFI', name: 'USB Wi-Fi Adapter', category: 'Networking', description: 'USB Wi-Fi 6 dual-band adapter', price: 29.99 },
  { sku: 'NAS-2BAY-001', name: '2-Bay NAS', category: 'Networking', description: '2-bay NAS enclosure, RAID 1 support', price: 249.99 },
  { sku: 'NAS-4BAY-001', name: '4-Bay NAS', category: 'Networking', description: '4-bay NAS, quad-core, 4GB RAM', price: 449.99 },

  // Storage (7)
  { sku: 'SSD-EXT-1TB', name: 'Portable SSD 1TB', category: 'Storage', description: 'USB-C portable SSD, 1050 MB/s', price: 89.99 },
  { sku: 'SSD-EXT-2TB', name: 'Portable SSD 2TB', category: 'Storage', description: 'USB-C portable SSD, 1050 MB/s', price: 149.99 },
  { sku: 'SSD-EXT-4TB', name: 'Portable SSD 4TB', category: 'Storage', description: 'USB-C portable SSD, 2000 MB/s', price: 299.99 },
  { sku: 'HDD-EXT-5TB', name: 'External HDD 5TB', category: 'Storage', description: 'USB 3.0 desktop external hard drive', price: 119.99 },
  { sku: 'USB-FLASH-128', name: 'USB Flash Drive 128GB', category: 'Storage', description: 'USB-A/C dual flash drive, 128GB', price: 14.99 },
  { sku: 'USB-FLASH-256', name: 'USB Flash Drive 256GB', category: 'Storage', description: 'USB-A/C dual flash drive, 256GB', price: 24.99 },
  { sku: 'SD-CARD-256', name: 'SD Card 256GB', category: 'Storage', description: 'SDXC UHS-II, 300 MB/s, 256GB', price: 39.99 },

  // Software (5)
  { sku: 'SW-OFFICE-365', name: 'Office 365 License (1yr)', category: 'Software', description: 'Microsoft 365 Personal, 1-year subscription', price: 69.99 },
  { sku: 'SW-ANTIVIRUS', name: 'Antivirus Suite (1yr)', category: 'Software', description: 'Premium antivirus, 3 devices, 1-year', price: 39.99 },
  { sku: 'SW-VPN-001', name: 'VPN Subscription (1yr)', category: 'Software', description: 'Premium VPN, unlimited devices, 1-year', price: 49.99 },
  { sku: 'SW-BACKUP-001', name: 'Cloud Backup 1TB (1yr)', category: 'Software', description: 'Automated cloud backup, 1TB, 1-year', price: 59.99 },
  { sku: 'SW-PASSMANAGER', name: 'Password Manager (1yr)', category: 'Software', description: 'Premium password manager, family plan', price: 35.99 },
] as const;

async function main() {
  console.log('Seeding database...');

  await prisma.inventory.deleteMany();
  await prisma.product.deleteMany();
  await prisma.store.deleteMany();

  // Create stores
  const createdStores = [];
  for (const name of stores) {
    createdStores.push(await prisma.store.create({ data: { name } }));
  }
  // Deactivate one store for test data variety
  await prisma.store.update({ where: { id: createdStores[6].id }, data: { isActive: false } });

  // Create products in batches (Prisma doesn't support createMany returning IDs)
  const createdProducts = [];
  for (const p of products) {
    createdProducts.push(
      await prisma.product.create({
        data: {
          sku: p.sku,
          name: p.name,
          category: p.category,
          description: p.description,
          price: p.price,
        },
      }),
    );
  }
  // Deactivate a few products
  for (const id of [createdProducts[98].id, createdProducts[99].id, createdProducts[100].id]) {
    await prisma.product.update({ where: { id }, data: { isActive: false } });
  }

  // Create inventory: assign ~60% of products randomly across active stores
  const activeStores = createdStores.filter((_, i) => i !== 6); // exclude deactivated
  const inventoryData: { storeId: number; productId: number; quantity: number }[] = [];

  for (const product of createdProducts) {
    // Each product appears in 2-4 stores
    const storeCount = 2 + Math.floor(Math.random() * 3);
    const shuffled = [...activeStores].sort(() => Math.random() - 0.5);
    for (let i = 0; i < Math.min(storeCount, shuffled.length); i++) {
      inventoryData.push({
        storeId: shuffled[i].id,
        productId: product.id,
        // Mix of quantities: some out of stock, some low, some well-stocked
        quantity: [0, 0, 3, 5, 8, 12, 25, 50, 75, 100][Math.floor(Math.random() * 10)],
      });
    }
  }

  await prisma.inventory.createMany({ data: inventoryData });

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
