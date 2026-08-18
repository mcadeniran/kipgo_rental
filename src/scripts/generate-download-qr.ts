import QRCode from 'qrcode';
import fs from 'fs';
import path from 'path';

const downloadUrl = 'https://www.kipgoo.com/download/app';

const outputDirectory = path.join(process.cwd(), 'public/images/app');

const outputPath = path.join(outputDirectory, 'kipgo-download-qr.png');

async function generateQr() {
  fs.mkdirSync(outputDirectory, {
    recursive: true,
  });

  await QRCode.toFile(outputPath, downloadUrl, {
    width: 800,
    margin: 2,
    errorCorrectionLevel: 'H',
  });

  console.log(`QR code generated: ${outputPath}`);
}

generateQr();
