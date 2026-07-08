export function formatPhoneNumber(phone: string) {
  let value = phone.trim();

  if (value.startsWith('0')) {
    value = '+90' + value.substring(1);
  }

  return value;
}
