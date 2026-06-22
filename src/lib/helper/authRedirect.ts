// utils/authRedirect.ts

export function handleAuthRedirect(role: string, callbackUrl?: string) {
  if (role === 'rental') {
    window.location.href = 'https://kipgotaxi.com/rentals';
    return;
  }

  window.location.href = callbackUrl || '/';
}
