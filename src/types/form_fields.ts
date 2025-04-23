/**
 * Represents the fields needed to customize the visual identity of a Pix key.
 * This interface defines the data used to configure the visual style and identification of the key.
 *
 * @interface FormFileds
 * @property {string} key - The Pix key (can be CPF, CNPJ, email, phone, or a random key).
 * @property {string} name - The name of the payee.
 * @property {string} city - The city where the payee is located.
 * @property {string} keyType - The type of the Pix key.
 * @property {string} foregroundColor - The text color (in hexadecimal format or color name).
 * @property {string} backgroundColor - The background color (in hexadecimal format or color name).
 * @property {File | undefined} logo - The logo to be used, as an image file (can be undefined).
 */
export interface FormFileds {
  key: string;
  name: string;
  city: string;
  keyType: string;
  foregroundColor: string;
  backgroundColor: string;
  logo: File | undefined;
}
