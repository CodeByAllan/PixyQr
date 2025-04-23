import type { Image } from 'canvas';
import { createCanvas, loadImage } from 'canvas';

/**
 * Draws a QR Code on a canvas and optionally adds a logo to the center of the QR Code.
 *
 * @param {string} qrcode - The URL or path of the QR Code image.
 * @param {string} [logo] - The optional URL or path of the logo image to be placed in the center of the QR Code.
 * @returns {Promise<string>} - A promise that resolves to a base64-encoded data URL of the final image.
 */
export async function drawCanvas(qrcode: string, logo?: string): Promise<string> {
  try {
    // Create a 200x200 canvas
    const canvas = createCanvas(200, 200);
    const ctx = canvas.getContext('2d');

    // Load the QR code image
    const QrCode = await loadImage(qrcode);

    // Load the logo image if provided
    let Logo: Image | undefined;
    if (logo) {
      Logo = await loadImage(logo);
    }

    // Draw the QR code on the canvas
    ctx.drawImage(QrCode, 0, 0, 200, 200);

    // Add the logo if provided
    if (Logo) {
      const logoSize = 60; // Logo size
      const centerX = (200 - logoSize) / 2;
      const centerY = (200 - logoSize) / 2;

      // Draw a white background for the logo area
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(centerX, centerY, logoSize, logoSize);

      // Draw the logo in the center of the QR code
      ctx.drawImage(Logo, centerX, centerY, logoSize, logoSize);
    }

    // Return the canvas as a base64-encoded string
    return canvas.toDataURL();
  } catch (error) {
    console.error('Error while drawing canvas:', error);
    throw new Error('Failed to generate the image.');
  }
}
