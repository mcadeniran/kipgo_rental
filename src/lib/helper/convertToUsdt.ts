export async function convertToUsdt(
  amount: number,
  currency: string,
  networkFee: number,
) {
  const currencyUpper = currency.toUpperCase();

  const response = await fetch(
    `https://v6.exchangerate-api.com/v6/91a000317b66194ac515ccdc/pair/USD/${currencyUpper}`,
    {
      cache: 'no-store',
    },
  );

  if (!response.ok) {
    throw new Error('Failed to fetch USDT rate');
  }

  const data = await response.json();

  const rate = Number(data.conversion_rate);

  if (!rate) {
    throw new Error('Invalid exchange rate.');
  }

  const usdtAmount = amount / rate;

  return Number((usdtAmount + networkFee).toFixed(2));
}
