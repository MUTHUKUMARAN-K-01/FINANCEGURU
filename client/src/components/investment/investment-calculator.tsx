import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useInvestment } from "@/hooks/use-investment";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

export default function InvestmentCalculator() {
  const {
    investmentData,
    isLoading,
    calculateInvestment,
    initialInvestment,
    setInitialInvestment,
    monthlyContribution,
    setMonthlyContribution,
    years,
    setYears,
    annualReturn,
    setAnnualReturn,
  } = useInvestment();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculateInvestment();
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value}%`;
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-green-50 border-b border-gray-200">
        <CardTitle className="flex items-center">
          <span className="material-icons mr-2">show_chart</span>
          Investment Growth Calculator
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-medium mb-4">Calculate Your Investment Growth</h4>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="initial-investment">Initial Investment</Label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <Input
                    id="initial-investment"
                    type="number"
                    min="0"
                    step="100"
                    placeholder="1000"
                    className="pl-7"
                    value={initialInvestment}
                    onChange={(e) => setInitialInvestment(parseFloat(e.target.value) || 0)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="monthly-contribution">Monthly Contribution</Label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <Input
                    id="monthly-contribution"
                    type="number"
                    min="0"
                    step="50"
                    placeholder="200"
                    className="pl-7"
                    value={monthlyContribution}
                    onChange={(e) => setMonthlyContribution(parseFloat(e.target.value) || 0)}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between">
                  <Label htmlFor="time-period">Time Period (years)</Label>
                  <span className="text-sm text-gray-600 font-medium">{years} years</span>
                </div>
                <div className="mt-2">
                  <Slider
                    id="time-period"
                    min={1}
                    max={40}
                    step={1}
                    value={[years]}
                    onValueChange={(value) => setYears(value[0])}
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1 year</span>
                    <span>20 years</span>
                    <span>40 years</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between">
                  <Label htmlFor="interest-rate">Estimated Annual Return (%)</Label>
                  <span className="text-sm text-gray-600 font-medium">{annualReturn}%</span>
                </div>
                <div className="mt-2">
                  <Slider
                    id="interest-rate"
                    min={1}
                    max={12}
                    step={0.5}
                    value={[annualReturn]}
                    onValueChange={(value) => setAnnualReturn(value[0])}
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1%</span>
                    <span>7%</span>
                    <span>12%</span>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                disabled={isLoading}
              >
                {isLoading ? "Calculating..." : "Calculate Growth"}
              </Button>
            </form>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-4">Investment Results</h4>
            <div className="bg-gray-50 p-6 rounded-lg h-full">
              {investmentData ? (
                <>
                  {/* Investment Summary */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700">Initial Investment:</span>
                      <span className="font-medium font-mono">
                        {formatCurrency(investmentData.initialInvestment)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700">Total Contributions:</span>
                      <span className="font-medium font-mono">
                        {formatCurrency(investmentData.totalContributions)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700">Interest Earned:</span>
                      <span className="font-medium font-mono text-green-600">
                        {formatCurrency(investmentData.interestEarned)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                      <span className="text-gray-700 font-medium">Final Balance:</span>
                      <span className="font-bold text-lg text-green-600 font-mono">
                        {formatCurrency(investmentData.finalBalance)}
                      </span>
                    </div>
                  </div>

                  {/* Growth Chart */}
                  <div className="h-56 mb-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={investmentData.yearlyData}
                        margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="year"
                          label={{ value: "Years", position: "insideBottomRight", offset: -5 }}
                        />
                        <YAxis
                          tickFormatter={(value) => `$${Math.round(value / 1000)}k`}
                        />
                        <Tooltip 
                          formatter={(value) => formatCurrency(Number(value))}
                          labelFormatter={(value) => `Year ${value}`}
                        />
                        <ReferenceLine
                          y={investmentData.totalContributions}
                          stroke="#888"
                          strokeDasharray="3 3"
                          label={{ value: "Total Contributions", position: "right" }}
                        />
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="#4caf50"
                          activeDot={{ r: 8 }}
                          name="Balance"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Investment Insights */}
                  <div className="border-t border-gray-200 pt-4">
                    <h5 className="font-medium text-gray-700 mb-2">Insights:</h5>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <span className="material-icons text-green-600 mr-2 text-sm">lightbulb</span>
                        <span>
                          Compound interest accounts for{" "}
                          {formatPercentage(Math.round(investmentData.insights.interestPercentage))} of
                          your final balance
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="material-icons text-green-600 mr-2 text-sm">lightbulb</span>
                        <span>
                          Increasing your monthly contribution by $50 would add approximately{" "}
                          {formatCurrency(investmentData.insights.contributionImpact)} to your final
                          balance
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="material-icons text-orange-500 mr-2 text-sm">info</span>
                        <span>
                          Consider low-cost index funds to achieve similar returns with minimal fees
                        </span>
                      </li>
                    </ul>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <span className="material-icons text-4xl mb-2">show_chart</span>
                  <p>Enter your investment details to calculate potential growth.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
