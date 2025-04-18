/**
 * Represents the parameters needed to generate a Pix QR Code.
 * This interface defines the required fields for generating a Pix payment payload.
 *
 * @interface PixParams
 * @property {string} key - The Pix key (can be CPF, CNPJ, email, phone, or a random key).
 * @property {string} name - The name of the payee.
 * @property {string} city - The city where the payee is located.
 */
export interface PixParams {
  key: string; // The Pix key (e.g., CPF, CNPJ, email, etc.)
  name: string; // The name of the person or business receiving the payment.
  city: string; // The city where the payee is located.
}
