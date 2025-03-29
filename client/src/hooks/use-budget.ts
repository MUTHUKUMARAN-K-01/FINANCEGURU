import { useState } from "react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

type BudgetData = {
  income: number;
  totalExpenses: number;
  remaining: number;
  recommendations: {
    emergencyFund: number;
    retirement: number;
    shortTermSavings: number;
  };
  chartData: {
    housingPercent: number;
    transportPercent: number;
    foodPercent: number;
    otherPercent: number;
    remainingPercent: number;
  };
};

export function useBudget() {
  const [monthlyIncome, setMonthlyIncome] = useState<number>(4000);
  const [housingExpense, setHousingExpense] = useState<number>(1200);
  const [transportExpense, setTransportExpense] = useState<number>(350);
  const [foodExpense, setFoodExpense] = useState<number>(600);
  const [otherExpenses, setOtherExpenses] = useState<number>(850);
  
  const [budgetData, setBudgetData] = useState<BudgetData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const { toast } = useToast();

  const calculateBudget = async () => {
    // Validate inputs
    if (!monthlyIncome || monthlyIncome <= 0) {
      toast({
        title: "Validation Error",
        description: "Monthly income must be greater than zero",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await apiRequest("POST", "/api/calculate/budget", {
        monthlyIncome,
        housingExpense,
        transportExpense,
        foodExpense,
        otherExpenses,
      });

      if (!response.ok) {
        throw new Error("Failed to calculate budget");
      }

      const data = await response.json();
      setBudgetData(data);

      // Show success message if there's a positive remaining amount
      if (data.remaining > 0) {
        toast({
          title: "Budget Calculated",
          description: `You have $${data.remaining.toFixed(2)} remaining for savings and other goals.`,
        });
      } else {
        toast({
          title: "Budget Alert",
          description: `Your expenses exceed your income by $${Math.abs(data.remaining).toFixed(2)}.`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error calculating budget:", error);
      toast({
        title: "Error",
        description: "Failed to calculate budget. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate budget on initial load if we have default values
  const calculateInitialBudget = () => {
    if (monthlyIncome > 0 && (housingExpense > 0 || transportExpense > 0 || foodExpense > 0 || otherExpenses > 0)) {
      // Only calculate if we haven't already
      if (!budgetData && !isLoading) {
        calculateBudget();
      }
    }
  };

  return {
    monthlyIncome,
    setMonthlyIncome,
    housingExpense,
    setHousingExpense,
    transportExpense,
    setTransportExpense,
    foodExpense,
    setFoodExpense,
    otherExpenses,
    setOtherExpenses,
    budgetData,
    isLoading,
    calculateBudget,
    calculateInitialBudget,
  };
}
