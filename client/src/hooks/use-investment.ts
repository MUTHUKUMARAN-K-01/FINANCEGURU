import { useState } from "react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

type YearlyData = {
  year: number;
  value: string;
};

type InvestmentData = {
  initialInvestment: number;
  totalContributions: number;
  interestEarned: number;
  finalBalance: number;
  yearlyData: YearlyData[];
  insights: {
    contributionImpact: number;
    interestPercentage: number;
  };
};

export function useInvestment() {
  const [initialInvestment, setInitialInvestment] = useState<number>(1000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(200);
  const [years, setYears] = useState<number>(30);
  const [annualReturn, setAnnualReturn] = useState<number>(7);
  
  const [investmentData, setInvestmentData] = useState<InvestmentData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const { toast } = useToast();

  const calculateInvestment = async () => {
    // Validate inputs
    if (!initialInvestment || initialInvestment < 0) {
      toast({
        title: "Validation Error",
        description: "Initial investment must be a positive number",
        variant: "destructive",
      });
      return;
    }

    if (!monthlyContribution || monthlyContribution < 0) {
      toast({
        title: "Validation Error",
        description: "Monthly contribution must be a positive number",
        variant: "destructive",
      });
      return;
    }

    if (!years || years <= 0) {
      toast({
        title: "Validation Error",
        description: "Time period must be greater than zero",
        variant: "destructive",
      });
      return;
    }

    if (!annualReturn || annualReturn <= 0) {
      toast({
        title: "Validation Error",
        description: "Annual return must be greater than zero",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await apiRequest("POST", "/api/calculate/investment", {
        initialInvestment,
        monthlyContribution,
        years,
        annualReturn,
      });

      if (!response.ok) {
        throw new Error("Failed to calculate investment growth");
      }

      const data = await response.json();
      setInvestmentData(data);

      // Show success message
      toast({
        title: "Investment Growth Calculated",
        description: `Your investment could grow to ${new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          maximumFractionDigits: 0,
        }).format(data.finalBalance)} in ${years} years.`,
      });
    } catch (error) {
      console.error("Error calculating investment growth:", error);
      toast({
        title: "Error",
        description: "Failed to calculate investment growth. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate investment on initial load if we have default values
  const calculateInitialInvestment = () => {
    if (initialInvestment > 0 && monthlyContribution > 0 && years > 0 && annualReturn > 0) {
      // Only calculate if we haven't already
      if (!investmentData && !isLoading) {
        calculateInvestment();
      }
    }
  };

  return {
    initialInvestment,
    setInitialInvestment,
    monthlyContribution,
    setMonthlyContribution,
    years,
    setYears,
    annualReturn,
    setAnnualReturn,
    investmentData,
    isLoading,
    calculateInvestment,
    calculateInitialInvestment,
  };
}
