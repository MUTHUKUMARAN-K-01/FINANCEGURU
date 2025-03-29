import axios from 'axios';
import { config } from 'dotenv';

// Load environment variables
config();

const ALPHA_VANTAGE_API_KEY = process.env.ALPHA_VANTAGE_API_KEY;
const API_BASE_URL = 'https://www.alphavantage.co/query';

/**
 * Interface for stock quote data
 */
export interface StockQuote {
  symbol: string;
  name?: string;
  price: number;
  change: number;
  changePercent: number;
  previousClose?: number;
  open?: number;
  high?: number;
  low?: number;
  volume?: number;
  date: string;
}

/**
 * Interface for historical stock data
 */
export interface HistoricalData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

/**
 * Get real-time quote for a stock symbol
 * @param symbol Stock symbol (e.g., AAPL, MSFT, GOOGL)
 * @returns Stock quote data
 */
export async function getStockQuote(symbol: string): Promise<StockQuote> {
  try {
    if (!ALPHA_VANTAGE_API_KEY) {
      throw new Error('Alpha Vantage API key is not configured');
    }

    // Get the global quote data
    const response = await axios.get(API_BASE_URL, {
      params: {
        function: 'GLOBAL_QUOTE',
        symbol,
        apikey: ALPHA_VANTAGE_API_KEY
      }
    });

    const data = response.data;
    
    if (data['Error Message']) {
      throw new Error(data['Error Message']);
    }
    
    if (!data['Global Quote'] || Object.keys(data['Global Quote']).length === 0) {
      throw new Error('No data found for the specified symbol');
    }

    const quote = data['Global Quote'];
    
    // Also get company overview for the name
    let companyName = '';
    try {
      const overviewResponse = await axios.get(API_BASE_URL, {
        params: {
          function: 'OVERVIEW',
          symbol,
          apikey: ALPHA_VANTAGE_API_KEY
        }
      });
      
      if (overviewResponse.data && overviewResponse.data.Name) {
        companyName = overviewResponse.data.Name;
      }
    } catch (error) {
      console.error('Error fetching company name:', error);
      // Continue without name if there's an error
    }

    const stockQuote: StockQuote = {
      symbol: quote['01. symbol'],
      name: companyName,
      price: parseFloat(quote['05. price']),
      change: parseFloat(quote['09. change']),
      changePercent: parseFloat(quote['10. change percent'].replace('%', '')),
      previousClose: parseFloat(quote['08. previous close']),
      open: parseFloat(quote['02. open']),
      high: parseFloat(quote['03. high']),
      low: parseFloat(quote['04. low']),
      volume: parseInt(quote['06. volume']),
      date: new Date().toLocaleDateString()
    };

    return stockQuote;
  } catch (error) {
    console.error('Error fetching stock quote:', error);
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error('An error occurred while fetching the stock quote');
    }
  }
}

/**
 * Get daily historical data for a stock symbol
 * @param symbol Stock symbol (e.g., AAPL, MSFT, GOOGL)
 * @param outputSize 'compact' for last 100 data points, 'full' for up to 20 years of data
 * @returns Array of historical data points
 */
export async function getHistoricalData(
  symbol: string,
  outputSize: 'compact' | 'full' = 'compact'
): Promise<HistoricalData[]> {
  try {
    if (!ALPHA_VANTAGE_API_KEY) {
      throw new Error('Alpha Vantage API key is not configured');
    }

    const response = await axios.get(API_BASE_URL, {
      params: {
        function: 'TIME_SERIES_DAILY',
        symbol,
        outputsize: outputSize,
        apikey: ALPHA_VANTAGE_API_KEY
      }
    });

    const data = response.data;
    
    if (data['Error Message']) {
      throw new Error(data['Error Message']);
    }
    
    if (!data['Time Series (Daily)']) {
      throw new Error('No historical data found for the specified symbol');
    }

    const timeSeriesData = data['Time Series (Daily)'];
    const historicalData: HistoricalData[] = [];

    for (const date in timeSeriesData) {
      const dailyData = timeSeriesData[date];
      historicalData.push({
        date,
        open: parseFloat(dailyData['1. open']),
        high: parseFloat(dailyData['2. high']),
        low: parseFloat(dailyData['3. low']),
        close: parseFloat(dailyData['4. close']),
        volume: parseInt(dailyData['5. volume'])
      });
    }

    return historicalData;
  } catch (error) {
    console.error('Error fetching historical data:', error);
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error('An error occurred while fetching historical data');
    }
  }
}

/**
 * Search for stocks by keywords/company name
 * @param keywords Search keywords (e.g., "apple", "microsoft", "tech")
 * @returns Array of matching symbols with company names
 */
export async function searchStocks(keywords: string): Promise<{ symbol: string; name: string }[]> {
  try {
    if (!ALPHA_VANTAGE_API_KEY) {
      throw new Error('Alpha Vantage API key is not configured');
    }

    const response = await axios.get(API_BASE_URL, {
      params: {
        function: 'SYMBOL_SEARCH',
        keywords,
        apikey: ALPHA_VANTAGE_API_KEY
      }
    });

    const data = response.data;
    
    if (data['Error Message']) {
      throw new Error(data['Error Message']);
    }
    
    if (!data.bestMatches || data.bestMatches.length === 0) {
      return [];
    }

    return data.bestMatches.map((match: any) => ({
      symbol: match['1. symbol'],
      name: match['2. name']
    }));
  } catch (error) {
    console.error('Error searching stocks:', error);
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error('An error occurred while searching for stocks');
    }
  }
}

/**
 * Get company overview information (name, description, sector, etc.)
 * @param symbol Stock symbol (e.g., AAPL, MSFT, GOOGL)
 * @returns Company information
 */
export async function getCompanyOverview(symbol: string): Promise<any> {
  try {
    if (!ALPHA_VANTAGE_API_KEY) {
      throw new Error('Alpha Vantage API key is not configured');
    }

    const response = await axios.get(API_BASE_URL, {
      params: {
        function: 'OVERVIEW',
        symbol,
        apikey: ALPHA_VANTAGE_API_KEY
      }
    });

    const data = response.data;
    
    if (data['Error Message']) {
      throw new Error(data['Error Message']);
    }
    
    if (!data || Object.keys(data).length === 0) {
      throw new Error('No company overview found for the specified symbol');
    }

    return data;
  } catch (error) {
    console.error('Error fetching company overview:', error);
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error('An error occurred while fetching company overview');
    }
  }
}