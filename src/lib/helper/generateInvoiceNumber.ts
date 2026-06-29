import { v4 as uuidv4 } from 'uuid';
export function generateInvoiceNumber() {
  const now = new Date();

  const date = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;

  const shortId = uuidv4().split('-')[0];

  return `KIP-${date}-${shortId}`;
}
