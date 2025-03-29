import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useBudget } from "@/hooks/use-budget";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

export default function BudgetCalculator() {
  const { 
    budgetData, 
    isLoading, 
    calculateBudget, 
    monthlyIncome, 
    setMonthlyIncome,
    housingExpense, 
    setHousingExpense,
    transportExpense, 
    setTransportExpense,
    foodExpense, 
    setFoodExpense,
    otherExpenses, 
    setOtherExpenses 
  } = useBudget();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculateBudget();
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  const COLORS = ['#42a5f5', '#4caf50', '#ffb74d', '#f44336', '#9c27b0'];

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-blue-50 border-b border-gray-200">
        <CardTitle className="flex items-center">
          <span className="material-icons mr-2">calculate</span>
          Budget Calculator
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-medium mb-4">Monthly Income & Expenses</h4>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="monthly-income">Monthly Income (after tax)</Label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <Input
                    id="monthly-income"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    className="pl-7"
                    value={monthlyIncome}
                    onChange={(e) => setMonthlyIncome(parseFloat(e.target.value) || 0)}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="housing-expenses">Housing (rent/mortgage, utilities, etc.)</Label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <Input
                    id="housing-expenses"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    className="pl-7"
                    value={housingExpense}
                    onChange={(e) => setHousingExpense(parseFloat(e.target.value) || 0)}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="transport-expenses">Transportation</Label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <Input
                    id="transport-expenses"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    className="pl-7"
                    value={transportExpense}
                    onChange={(e) => setTransportExpense(parseFloat(e.target.value) || 0)}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="food-expenses">Food & Groceries</Label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <Input
                    id="food-expenses"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    className="pl-7"
                    value={foodExpense}
                    onChange={(e) => setFoodExpense(parseFloat(e.target.value) || 0)}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="other-expenses">Other Expenses</Label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <Input
                    id="other-expenses"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    className="pl-7"
                    value={otherExpenses}
                    onChange={(e) => setOtherExpenses(parseFloat(e.target.value) || 0)}
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                disabled={isLoading}
              >
                {isLoading ? "Calculating..." : "Calculate Budget"}
              </Button>
            </form>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Budget Breakdown</h4>
            <div className="bg-gray-50 p-6 rounded-lg h-full">
              {budgetData ? (
                <>
                  {/* Budget Summary */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700">Total Income:</span>
                      <span className="font-medium font-mono">{formatCurrency(budgetData.income)}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700">Total Expenses:</span>
                      <span className="font-medium font-mono">{formatCurrency(budgetData.totalExpenses)}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                      <span className="text-gray-700 font-medium">Remaining:</span>
                      <span className={`font-medium font-mono ${budgetData.remaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatCurrency(budgetData.remaining)}
                      </span>
                    </div>
                  </div>
                  
                  {/* Budget Chart */}
                  <div className="h-56 mb-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: 'Housing', value: housingExpense },
                            { name: 'Transport', value: transportExpense },
                            { name: 'Food', value: foodExpense },
                            { name: 'Other', value: otherExpenses },
                            { name: 'Remaining', value: Math.max(0, budgetData.remaining) },
                          ]}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {[
                            { name: 'Housing', value: housingExpense },
                            { name: 'Transport', value: transportExpense },
                            { name: 'Food', value: foodExpense },
                            { name: 'Other', value: otherExpenses },
                            { name: 'Remaining', value: Math.max(0, budgetData.remaining) },
                          ].map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => formatCurrency(value as number)} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  {/* Budget Recommendations */}
                  {budgetData.remaining > 0 && (
                    <div className="border-t border-gray-200 pt-4">
                      <h5 className="font-medium text-gray-700 mb-2">Recommendations:</h5>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <span className="material-icons text-green-600 mr-2 text-sm">check_circle</span>
                          <span>Consider saving {formatCurrency(budgetData.recommendations.emergencyFund)} in an emergency fund</span>
                        </li>
                        <li className="flex items-start">
                          <span className="material-icons text-green-600 mr-2 text-sm">check_circle</span>
                          <span>Allocate {formatCurrency(budgetData.recommendations.retirement)} toward retirement accounts</span>
                        </li>
                        <li className="flex items-start">
                          <span className="material-icons text-green-600 mr-2 text-sm">check_circle</span>
                          <span>Use {formatCurrency(budgetData.recommendations.shortTermSavings)} for short-term goals or debt payments</span>
                        </li>
                      </ul>
                    </div>
                  )}
                  
                  {budgetData.remaining < 0 && (
                    <div className="border-t border-gray-200 pt-4">
                      <h5 className="font-medium text-red-600 mb-2">Warning:</h5>
                      <p className="text-sm text-gray-600">
                        Your expenses exceed your income by {formatCurrency(Math.abs(budgetData.remaining))}.
                        Consider reducing expenses or finding additional income sources.
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <span className="material-icons text-4xl mb-2">calculate</span>
                  <p>Enter your income and expenses to calculate your budget.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
