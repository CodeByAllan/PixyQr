/**
 * Represents the parameters needed to generate a custom QR Code.
 * This interface defines the required fields for generating a QR Code with custom colors.
 *
 * @interface QrParams
 * @property {string} payload - The data to be encoded in the QR Code (e.g., a URL or text).
 * @property {QrColor} colors? - The color configuration for the QR Code.
 */
export interface QrParams {
  payload: string; // The data to encode in the QR Code (e.g., URL or plain text).
  colors?: QrColor; // An object specifying the foreground and background colors for the QR Code.
}

/**
 * Represents the color configuration for the QR Code.
 *
 * @interface QrColor
 * @property {string} foregroundColor - The color used for the dark modules of the QR Code.
 * @property {string} backgroundColor - The background color of the QR Code.
 */
interface QrColor {
  foregroundColor: string; // Example: '#000000' for black
  backgroundColor: string; // Example: '#FFFFFF' for white
}
