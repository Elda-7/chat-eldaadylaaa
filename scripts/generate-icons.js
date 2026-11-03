// scripts/generate-icons.js
// Jalankan: node scripts/generate-icons.js

import sharp from 'sharp';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SOURCE_IMAGE = join(__dirname, '../public/venus-ai-icon.svg');
const OUTPUT_DIR = join(__dirname, '../public/icons');
const APP_ICON = join(__dirname, '../src/app/icon.png');
const FAVICON = join(__dirname, '../src/app/favicon.ico');
const SIZES = [72, 96, 128, 144, 152, 180, 192, 384, 512];

async function generateIcons() {
  // Pastikan folder output ada
  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log(`✅ Folder dibuat: ${OUTPUT_DIR}`);
  }

  // Cek apakah file sumber ada
  if (!existsSync(SOURCE_IMAGE)) {
    console.error(`❌ File sumber tidak ditemukan: ${SOURCE_IMAGE}`);
    process.exit(1);
  }

  console.log(`🔧 Membaca sumber icon dari: ${SOURCE_IMAGE}`);
  console.log(`📁 Output ke: ${OUTPUT_DIR}`);
  console.log('');

  for (const size of SIZES) {
    const outputFile = join(OUTPUT_DIR, `icon-${size}x${size}.png`);
    await sharp(SOURCE_IMAGE).resize(size, size).png().toFile(outputFile);
    console.log(`✅ Generated: icon-${size}x${size}.png`);
  }

  await sharp(SOURCE_IMAGE).resize(512, 512).png().toFile(APP_ICON);

  const faviconSizes = [16, 32, 48];
  const faviconImages = await Promise.all(
    faviconSizes.map((size) => sharp(SOURCE_IMAGE).resize(size, size).png().toBuffer())
  );
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(faviconImages.length, 4);
  const entries = Buffer.alloc(faviconImages.length * 16);
  let imageOffset = header.length + entries.length;

  faviconImages.forEach((image, index) => {
    const entryOffset = index * 16;
    const size = faviconSizes[index];
    entries.writeUInt8(size, entryOffset);
    entries.writeUInt8(size, entryOffset + 1);
    entries.writeUInt8(0, entryOffset + 2);
    entries.writeUInt8(0, entryOffset + 3);
    entries.writeUInt16LE(1, entryOffset + 4);
    entries.writeUInt16LE(32, entryOffset + 6);
    entries.writeUInt32LE(image.length, entryOffset + 8);
    entries.writeUInt32LE(imageOffset, entryOffset + 12);
    imageOffset += image.length;
  });
  writeFileSync(FAVICON, Buffer.concat([header, entries, ...faviconImages]));

  console.log('\n🎉 Selesai! Ikon aplikasi dan PWA berhasil dibuat.');
}

generateIcons();
