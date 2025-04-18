import type { PixParams } from 'src/types/pix_params';

/**
 * Generates a valid Pix payload string according to the EMV QR Code specification.
 * The generated string can be used to create a Pix-compatible QR code.
 *
 * @param key - The Pix key (e.g., CPF, CNPJ, email, phone, or random key).
 * @param name - The name of the receiver (merchant).
 * @param city - The city where the merchant is located.
 * @returns A complete EMV-formatted Pix payload including the CRC16 checksum.
 */
export function generatePix({ key, name, city }: PixParams): string {
  key = key.replaceAll(' ', '').toUpperCase();
  name = name.replaceAll(' ', '').toUpperCase();
  city = city.replaceAll(' ', '').toUpperCase();
  const txid = ('tx' + Date.now()).replaceAll(' ', '');

  /**
   * Formats a field according to the EMV (Europay, MasterCard, Visa) standard.
   * Returns a string in the format: ID + length of value (2 digits) + value.
   *
   * @param id - The identifier of the EMV field.
   * @param value - The content of the field to be formatted.
   * @returns A formatted EMV-compliant string.
   */
  function emv(id: string, value: string): string {
    return `${id}${value.length.toString().padStart(2, '0')}${value}`;
  }

  /**
   * Calculates the CRC16 checksum of a given string using the CCITT-FALSE standard.
   * This is used to validate the integrity of the Pix QR Code payload.
   *
   * @param str - The input string to calculate the CRC16 checksum for.
   * @returns A 4-character uppercase hexadecimal string representing the checksum.
   */
  function crc16(str: string): string {
    let crc = 0xffff;
    for (let i = 0; i < str.length; i++) {
      crc ^= str.charCodeAt(i) << 8;
      for (let j = 0; j < 8; j++) {
        crc = crc & 0x8000 ? (crc << 1) ^ 0x1021 : crc << 1;
      }
    }
    return (crc & 0xffff).toString(16).toUpperCase().padStart(4, '0');
  }

  const PIX_PREFIX = 'BR.GOV.BCB.PIX';
  const CURRENCY_CODE = '986'; // Brazilian Real
  const COUNTRY_CODE = 'BR';

  const payload =
    emv('00', '01') + // Payload format indicator
    emv('26', emv('00', PIX_PREFIX) + emv('01', key)) + // Merchant account info
    emv('52', '0000') + // Merchant category code (default)
    emv('53', CURRENCY_CODE) + // Transaction currency (BRL)
    emv('58', COUNTRY_CODE) + // Country code
    emv('59', name) + // Merchant name
    emv('60', city) + // Merchant city
    emv('62', emv('05', txid)) + // Additional data field (TxID)
    '6304'; // CRC16 checksum field ID

  return payload + crc16(payload);
}

/**
 * Validates a Pix key based on its type.
 * Supports CPF, CNPJ, email, phone, and random key (UUID).
 *
 * @param key - The Pix key to be validated.
 * @param type - The type of Pix key: 'cpf', 'cnpj', 'email', 'phone', or 'rand'.
 * @returns A boolean indicating whether the Pix key is valid for the given type.
 *
 * @example
 * isValidPixKey('12345678909', 'cpf'); // true
 * isValidPixKey('+5599999999999', 'phone'); // true
 * isValidPixKey('invalid_key', 'email'); // false
 */
export function isValidPixKey(key: string, type: string): boolean {
  key = key.trim();

  const validators: Record<string, RegExp> = {
    cpfcnpj: /^\d{11}$|^\d{14}$/, // 11 or 14 digits
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // simple email regex
    phone: /^\+55\d{11}$/, // E.164 format for Brazil
    rand: /^[a-f0-9-]{32,36}$/i, // UUID format (random Pix key)
  };

  const regex = validators[type];
  return regex ? regex.test(key) : false;
}
