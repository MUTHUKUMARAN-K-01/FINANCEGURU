import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InvestmentCalculator from "@/components/investment/investment-calculator";
import StockLookup from "@/components/investment/stock-lookup";
import { SearchIcon, CalculatorIcon, BookOpenIcon, BrainIcon } from "lucide-react";

export default function Investing() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-800 mb-2">Investment Planning</h1>
        <p className="text-neutral-600">Learn how to grow your wealth through smart investing strategies</p>
      </div>

      <Tabs defaultValue="calculator" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="calculator" className="flex items-center">
            <CalculatorIcon className="mr-2 h-4 w-4" />
            Investment Calculator
          </TabsTrigger>
          <TabsTrigger value="stocks" className="flex items-center">
            <SearchIcon className="mr-2 h-4 w-4" />
            Stock Lookup
          </TabsTrigger>
          <TabsTrigger value="basics" className="flex items-center">
            <BookOpenIcon className="mr-2 h-4 w-4" />
            Investment Basics
          </TabsTrigger>
          <TabsTrigger value="strategies" className="flex items-center">
            <BrainIcon className="mr-2 h-4 w-4" />
            Investment Strategies
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="calculator">
          <InvestmentCalculator />
        </TabsContent>
        
        <TabsContent value="stocks">
          <StockLookup />
        </TabsContent>
        
        <TabsContent value="basics">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <span className="material-icons mr-2">school</span>
                Investment Fundamentals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Types of Investments</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="font-medium text-neutral-800 mb-1">Stocks</h4>
                    <p className="text-neutral-600 text-sm">
                      Represent ownership in a company. Potential for high returns but also higher risk due to market volatility.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="font-medium text-neutral-800 mb-1">Bonds</h4>
                    <p className="text-neutral-600 text-sm">
                      Loans to companies or governments. Generally lower risk than stocks with more predictable returns.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="font-medium text-neutral-800 mb-1">Mutual Funds</h4>
                    <p className="text-neutral-600 text-sm">
                      Pooled investments managed by professionals. Offer diversification and convenience.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="font-medium text-neutral-800 mb-1">ETFs</h4>
                    <p className="text-neutral-600 text-sm">
                      Similar to mutual funds but trade like stocks. Typically have lower fees and more tax efficiency.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="font-medium text-neutral-800 mb-1">Real Estate</h4>
                    <p className="text-neutral-600 text-sm">
                      Property investments. Can generate income through rental payments and appreciation over time.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="font-medium text-neutral-800 mb-1">Retirement Accounts</h4>
                    <p className="text-neutral-600 text-sm">
                      Tax-advantaged accounts like 401(k)s and IRAs designed for long-term retirement savings.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Key Investment Concepts</h3>
                <ul className="space-y-3">
                  <li className="flex">
                    <span className="material-icons text-green-600 mr-2">check_circle</span>
                    <div>
                      <span className="font-medium">Compound Interest:</span>
                      <p className="text-neutral-600">Interest earned on both the initial principal and accumulated interest over time.</p>
                    </div>
                  </li>
                  <li className="flex">
                    <span className="material-icons text-green-600 mr-2">check_circle</span>
                    <div>
                      <span className="font-medium">Diversification:</span>
                      <p className="text-neutral-600">Spreading investments across different asset classes to reduce risk.</p>
                    </div>
                  </li>
                  <li className="flex">
                    <span className="material-icons text-green-600 mr-2">check_circle</span>
                    <div>
                      <span className="font-medium">Risk vs. Return:</span>
                      <p className="text-neutral-600">Higher potential returns typically come with higher risk of losses.</p>
                    </div>
                  </li>
                  <li className="flex">
                    <span className="material-icons text-green-600 mr-2">check_circle</span>
                    <div>
                      <span className="font-medium">Dollar-Cost Averaging:</span>
                      <p className="text-neutral-600">Investing fixed amounts at regular intervals regardless of market conditions.</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
                <h3 className="text-lg font-medium text-blue-800 mb-2 flex items-center">
                  <span className="material-icons mr-1 text-blue-600">tips_and_updates</span>
                  Getting Started
                </h3>
                <ol className="list-decimal pl-5 space-y-1 text-blue-700">
                  <li>Set clear investment goals and time horizon</li>
                  <li>Establish an emergency fund before investing</li>
                  <li>Pay off high-interest debt first</li>
                  <li>Start with retirement accounts for tax advantages</li>
                  <li>Consider low-cost index funds for beginners</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="strategies">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <span className="material-icons mr-2">psychology</span>
                Investment Strategies
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Common Investment Approaches</h3>
                <div className="space-y-4">
                  <div className="border rounded-md p-4">
                    <h4 className="font-medium text-neutral-800 mb-1">Buy and Hold</h4>
                    <p className="text-neutral-600">
                      Purchasing investments and holding them for the long term regardless of market fluctuations.
                      Best for: Long-term investors who want to minimize transaction costs and taxes.
                    </p>
                  </div>
                  <div className="border rounded-md p-4">
                    <h4 className="font-medium text-neutral-800 mb-1">Value Investing</h4>
                    <p className="text-neutral-600">
                      Seeking stocks that appear undervalued relative to their intrinsic value.
                      Best for: Patient investors who can identify undervalued opportunities.
                    </p>
                  </div>
                  <div className="border rounded-md p-4">
                    <h4 className="font-medium text-neutral-800 mb-1">Growth Investing</h4>
                    <p className="text-neutral-600">
                      Focusing on companies with high growth potential, often at higher valuations.
                      Best for: Investors comfortable with volatility and seeking higher returns.
                    </p>
                  </div>
                  <div className="border rounded-md p-4">
                    <h4 className="font-medium text-neutral-800 mb-1">Passive Investing</h4>
                    <p className="text-neutral-600">
                      Using index funds or ETFs to match market returns rather than trying to beat the market.
                      Best for: Most individual investors seeking low-cost, diversified exposure.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Asset Allocation Models</h3>
                <p className="text-neutral-600 mb-4">
                  Your asset allocation should reflect your risk tolerance and time horizon. Here are some common models:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="font-medium text-neutral-800 mb-1">Conservative</h4>
                    <div className="h-32 flex items-end space-x-1 mt-3">
                      <div className="bg-blue-300 w-2/3 h-4/5 rounded-t" title="Bonds: 60-70%"></div>
                      <div className="bg-green-500 w-1/4 h-1/4 rounded-t" title="Stocks: 20-30%"></div>
                      <div className="bg-gray-400 w-1/6 h-1/5 rounded-t" title="Cash: 10%"></div>
                    </div>
                    <p className="text-neutral-600 text-sm mt-2">
                      Low risk, stable returns. Good for short time horizons or risk-averse investors.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="font-medium text-neutral-800 mb-1">Moderate</h4>
                    <div className="h-32 flex items-end space-x-1 mt-3">
                      <div className="bg-blue-300 w-1/2 h-1/2 rounded-t" title="Bonds: 40-50%"></div>
                      <div className="bg-green-500 w-5/12 h-4/5 rounded-t" title="Stocks: 40-50%"></div>
                      <div className="bg-gray-400 w-1/12 h-1/6 rounded-t" title="Cash: 5-10%"></div>
                    </div>
                    <p className="text-neutral-600 text-sm mt-2">
                      Balanced approach with moderate risk and growth. Good for medium time horizons.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="font-medium text-neutral-800 mb-1">Aggressive</h4>
                    <div className="h-32 flex items-end space-x-1 mt-3">
                      <div className="bg-blue-300 w-1/4 h-1/4 rounded-t" title="Bonds: 20-30%"></div>
                      <div className="bg-green-500 w-2/3 h-4/5 rounded-t" title="Stocks: 70-80%"></div>
                      <div className="bg-gray-400 w-1/12 h-1/12 rounded-t" title="Cash: 0-5%"></div>
                    </div>
                    <p className="text-neutral-600 text-sm mt-2">
                      Higher potential returns with higher risk. Best for long time horizons.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 p-4 rounded-md border border-amber-100">
                <h3 className="text-lg font-medium text-amber-800 mb-2 flex items-center">
                  <span className="material-icons mr-1 text-amber-600">warning</span>
                  Important Considerations
                </h3>
                <ul className="list-disc pl-5 space-y-1 text-amber-700">
                  <li>Fees and expenses can significantly impact long-term returns</li>
                  <li>Tax implications vary by investment type and account</li>
                  <li>Your asset allocation should become more conservative as you approach your goal</li>
                  <li>Regular rebalancing helps maintain your desired risk level</li>
                  <li>Past performance does not guarantee future results</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
