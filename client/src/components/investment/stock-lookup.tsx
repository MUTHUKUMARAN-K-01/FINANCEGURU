import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { SearchIcon, TrendingUpIcon, InfoIcon, BarChart3Icon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

type StockQuote = {
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
};

type HistoricalData = {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
};

type SearchResult = {
  symbol: string;
  name: string;
};

type CompanyOverview = {
  Symbol: string;
  Name: string;
  Description: string;
  Sector: string;
  Industry: string;
  MarketCapitalization: string;
  PERatio: string;
  DividendYield: string;
  EPS: string;
  RevenueTTM: string;
  GrossProfitTTM: string;
  [key: string]: string;
};

export default function StockLookup() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedSymbol, setSelectedSymbol] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("quote");
  const { toast } = useToast();

  // Search query
  const { data: searchResults, isLoading: isSearching } = useQuery<SearchResult[]>({
    queryKey: ['/api/stocks/search', searchQuery],
    queryFn: async () => {
      if (!searchQuery || searchQuery.length < 2) return [];
      const response = await apiRequest('GET', `/api/stocks/search?keywords=${encodeURIComponent(searchQuery)}`);
      if (!response.ok) throw new Error('Failed to search stocks');
      return response.json();
    },
    enabled: searchQuery.length >= 2,
  });

  // Stock quote query
  const { data: stockQuote, isLoading: isLoadingQuote } = useQuery<StockQuote>({
    queryKey: ['/api/stocks/quote', selectedSymbol],
    queryFn: async () => {
      if (!selectedSymbol) throw new Error('No symbol selected');
      const response = await apiRequest('GET', `/api/stocks/quote/${selectedSymbol}`);
      if (!response.ok) throw new Error('Failed to fetch stock quote');
      return response.json();
    },
    enabled: !!selectedSymbol,
    retry: 1,
  });

  // Historical data query
  const { data: historicalData, isLoading: isLoadingHistory } = useQuery<HistoricalData[]>({
    queryKey: ['/api/stocks/history', selectedSymbol],
    queryFn: async () => {
      if (!selectedSymbol) throw new Error('No symbol selected');
      const response = await apiRequest('GET', `/api/stocks/history/${selectedSymbol}`);
      if (!response.ok) throw new Error('Failed to fetch historical data');
      return response.json();
    },
    enabled: !!selectedSymbol && activeTab === 'chart',
    retry: 1,
  });

  // Company overview query
  const { data: companyOverview, isLoading: isLoadingCompany } = useQuery<CompanyOverview>({
    queryKey: ['/api/stocks/company', selectedSymbol],
    queryFn: async () => {
      if (!selectedSymbol) throw new Error('No symbol selected');
      const response = await apiRequest('GET', `/api/stocks/company/${selectedSymbol}`);
      if (!response.ok) throw new Error('Failed to fetch company data');
      return response.json();
    },
    enabled: !!selectedSymbol && activeTab === 'company',
    retry: 1,
  });

  // Handle search submission
  const handleSearch = () => {
    if (!searchQuery || searchQuery.length < 2) {
      toast({
        title: "Search Error",
        description: "Please enter at least 2 characters to search",
        variant: "destructive",
      });
      return;
    }
    // The search is triggered automatically by the query
  };

  // Select a stock symbol
  const handleSelectSymbol = (symbol: string) => {
    setSelectedSymbol(symbol);
    setActiveTab("quote");
  };

  // Format historical data for chart
  const chartData = historicalData 
    ? historicalData
        .slice(0, 30) // Show last 30 days
        .map(item => ({
          ...item,
          date: new Date(item.date).toLocaleDateString(),
        }))
        .reverse()
    : [];

  return (
    <div className="w-full space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-xl">
            <SearchIcon className="mr-2 h-5 w-5" />
            Stock Lookup
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for a stock (e.g., AAPL, MSFT, GOOGL)"
              className="flex-1"
            />
            <Button onClick={handleSearch} disabled={isSearching}>
              <SearchIcon className="h-4 w-4" />
              <span className="ml-2">Search</span>
            </Button>
          </div>

          {/* Search Results */}
          {isSearching ? (
            <div className="mt-4 space-y-2">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
            </div>
          ) : searchResults && searchResults.length > 0 ? (
            <div className="mt-4 max-h-40 overflow-y-auto">
              <ul className="space-y-1">
                {searchResults.map((result) => (
                  <li key={result.symbol}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-left"
                      onClick={() => handleSelectSymbol(result.symbol)}
                    >
                      <span className="font-bold">{result.symbol}</span>
                      <span className="ml-2 text-gray-600">{result.name}</span>
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          ) : searchQuery.length >= 2 ? (
            <p className="mt-4 text-center text-gray-500">No results found</p>
          ) : null}
        </CardContent>
      </Card>

      {selectedSymbol && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div>
                <span className="text-xl">{selectedSymbol}</span>
                {stockQuote?.name && <span className="ml-2 text-gray-600">{stockQuote.name}</span>}
              </div>
              {stockQuote && (
                <div className="flex items-center">
                  <span className="text-xl font-bold">${stockQuote.price.toFixed(2)}</span>
                  <span
                    className={`ml-2 flex items-center ${
                      stockQuote.change >= 0 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {stockQuote.change >= 0 ? "+" : ""}
                    {stockQuote.change.toFixed(2)} ({stockQuote.change >= 0 ? "+" : ""}
                    {stockQuote.changePercent.toFixed(2)}%)
                  </span>
                </div>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="quote">
                  <TrendingUpIcon className="mr-2 h-4 w-4" />
                  Quote
                </TabsTrigger>
                <TabsTrigger value="chart">
                  <BarChart3Icon className="mr-2 h-4 w-4" />
                  Chart
                </TabsTrigger>
                <TabsTrigger value="company">
                  <InfoIcon className="mr-2 h-4 w-4" />
                  Company
                </TabsTrigger>
              </TabsList>

              {/* Quote Tab */}
              <TabsContent value="quote">
                {isLoadingQuote ? (
                  <div className="space-y-2">
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                  </div>
                ) : stockQuote ? (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500">Open</h3>
                      <p className="text-lg">${stockQuote.open?.toFixed(2) || 'N/A'}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500">Previous Close</h3>
                      <p className="text-lg">${stockQuote.previousClose?.toFixed(2) || 'N/A'}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500">Day's High</h3>
                      <p className="text-lg">${stockQuote.high?.toFixed(2) || 'N/A'}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500">Day's Low</h3>
                      <p className="text-lg">${stockQuote.low?.toFixed(2) || 'N/A'}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500">Volume</h3>
                      <p className="text-lg">
                        {stockQuote.volume?.toLocaleString() || 'N/A'}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500">Date</h3>
                      <p className="text-lg">{stockQuote.date}</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-center text-gray-500">No quote data available</p>
                )}
              </TabsContent>

              {/* Chart Tab */}
              <TabsContent value="chart">
                {isLoadingHistory ? (
                  <Skeleton className="h-64 w-full" />
                ) : chartData.length > 0 ? (
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={chartData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis domain={['auto', 'auto']} />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="close"
                          stroke="#8884d8"
                          name="Close Price"
                          activeDot={{ r: 8 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <p className="text-center text-gray-500">No historical data available</p>
                )}
              </TabsContent>

              {/* Company Tab */}
              <TabsContent value="company">
                {isLoadingCompany ? (
                  <div className="space-y-2">
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-32 w-full" />
                    <Skeleton className="h-8 w-full" />
                  </div>
                ) : companyOverview ? (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-md font-semibold">{companyOverview.Name}</h3>
                      <p className="text-sm text-gray-500">
                        {companyOverview.Sector} - {companyOverview.Industry}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500">Description</h3>
                      <p className="text-sm">{companyOverview.Description}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-semibold text-gray-500">Market Cap</h3>
                        <p className="text-lg">
                          ${parseFloat(companyOverview.MarketCapitalization).toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-gray-500">P/E Ratio</h3>
                        <p className="text-lg">{companyOverview.PERatio || 'N/A'}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-gray-500">Dividend Yield</h3>
                        <p className="text-lg">
                          {companyOverview.DividendYield
                            ? `${(parseFloat(companyOverview.DividendYield) * 100).toFixed(2)}%`
                            : 'N/A'}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-gray-500">EPS</h3>
                        <p className="text-lg">${companyOverview.EPS || 'N/A'}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-center text-gray-500">No company data available</p>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
}