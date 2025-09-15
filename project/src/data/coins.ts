export interface CoinOption {
  name: string;
  symbol: string;
}

export const popularCoins: CoinOption[] = [
  { name: 'Bitcoin', symbol: 'BTC' },
  { name: 'Ethereum', symbol: 'ETH' },
  { name: 'Binance Coin', symbol: 'BNB' },
  { name: 'Solana', symbol: 'SOL' },
  { name: 'XRP', symbol: 'XRP' },
  { name: 'Cardano', symbol: 'ADA' },
  { name: 'Avalanche', symbol: 'AVAX' },
  { name: 'Dogecoin', symbol: 'DOGE' },
  { name: 'Polygon', symbol: 'MATIC' },
  { name: 'Chainlink', symbol: 'LINK' },
  { name: 'Polkadot', symbol: 'DOT' },
  { name: 'Litecoin', symbol: 'LTC' },
  { name: 'Uniswap', symbol: 'UNI' },
  { name: 'TRON', symbol: 'TRX' },
  { name: 'Shiba Inu', symbol: 'SHIB' }
];