import QRCode from 'qrcode';
import type { QrParams } from 'src/types/qr_params';

/**
 * Generates a QR Code as a Data URL from a given string.
 * Useful for encoding Pix payloads or other payment-related data.
 *
 * @param payload - The string content to be encoded into the QR Code.
 * @returns A Promise that resolves to a base64-encoded image of the QR Code.
 *
 * @example
 * const qrCode = await generateQrCode('000201010212...A13C');
 * // => data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA...
 */
export const generateQrCode = async ({ payload, colors }: QrParams): Promise<string> => {
  try {
    return await QRCode.toDataURL(payload, {
      errorCorrectionLevel: 'H', // High error correction
      margin: 2,
      width: 300,
      color: {
        dark: colors?.foregroundColor,
        light: colors?.backgroundColor,
      },
    });
  } catch (error) {
    console.error('Error generating QR Code:', error);
    throw error;
  }
};
