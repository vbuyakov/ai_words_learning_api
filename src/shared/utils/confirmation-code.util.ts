import { randomBytes } from 'crypto';

export function generateConfirmationCode(): string {
  return randomBytes(16).toString('hex'); // Example: Generates a 32-character alphanumeric string
}
