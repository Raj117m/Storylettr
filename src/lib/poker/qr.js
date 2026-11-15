import QRCode from 'qrcode';

export async function generateQrSvg(text) {
  try {
    const svg = await QRCode.toString(text, {
      type: 'svg',
      margin: 1,
      color: {
        dark: '#F5EFE6', // Light bone/gold
        light: '#0b1320', // Dark obsidian
      },
    });
    return svg;
  } catch (err) {
    console.error('Failed to generate QR Code:', err);
    return null;
  }
}
