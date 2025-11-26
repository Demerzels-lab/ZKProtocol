/**
 * Jupiter Aggregator API Integration
 * Provides token prices and swap quotes
 */

const JUPITER_API_BASE = 'https://api.jup.ag';
const JUPITER_PRICE_API = 'https://api.jup.ag/price/v2';

interface JupiterPrice {
  id: string;
  mintSymbol: string;
  vsToken: string;
  vsTokenSymbol: string;
  price: number;
}

interface JupiterPriceResponse {
  data: {
    [key: string]: JupiterPrice;
  };
  timeTaken: number;
}

/**
 * Get token prices from Jupiter
 */
export const getTokenPrices = async (tokenIds: string[]): Promise<Record<string, number>> => {
  try {
    const idsParam = tokenIds.join(',');
    const response = await fetch(`${JUPITER_PRICE_API}?ids=${idsParam}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch token prices');
    }

    const data: JupiterPriceResponse = await response.json();
    
    // Convert to simple key-value map
    const prices: Record<string, number> = {};
    Object.entries(data.data).forEach(([key, value]) => {
      prices[key] = value.price;
    });
    
    return prices;
  } catch (error) {
    console.error('Error fetching Jupiter prices:', error);
    return {};
  }
};

/**
 * Get SOL price in USD
 */
export const getSolPrice = async (): Promise<number> => {
  try {
    const prices = await getTokenPrices(['So11111111111111111111111111111111111111112']); // SOL mint address
    return prices['So11111111111111111111111111111111111111112'] || 0;
  } catch (error) {
    console.error('Error fetching SOL price:', error);
    return 0;
  }
};

/**
 * Get swap quote from Jupiter
 */
export const getSwapQuote = async (
  inputMint: string,
  outputMint: string,
  amount: number,
  slippageBps: number = 50 // 0.5% default slippage
) => {
  try {
    const response = await fetch(
      `${JUPITER_API_BASE}/v6/quote?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amount}&slippageBps=${slippageBps}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch swap quote');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching swap quote:', error);
    return null;
  }
};

/**
 * Get list of tokens supported by Jupiter
 */
export const getJupiterTokens = async () => {
  try {
    const response = await fetch(`${JUPITER_API_BASE}/v6/tokens`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch Jupiter tokens');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching Jupiter tokens:', error);
    return [];
  }
};
