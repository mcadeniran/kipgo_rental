export function formatDobForInput(dob?: string) {
  if (!dob) return '';

  // already yyyy-MM-dd
  if (dob.includes('-')) {
    return dob;
  }

  const parts = dob.split('/');

  if (parts.length !== 3) {
    return '';
  }

  const [day, month, year] = parts;

  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}
