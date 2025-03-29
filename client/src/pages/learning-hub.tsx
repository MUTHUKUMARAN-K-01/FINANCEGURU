import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";

import { 
  BookOpenIcon, 
  GraduationCapIcon,
  BarChart4Icon,
  LineChartIcon,
  ArrowUpRightIcon,
  PlayCircleIcon,
  SearchIcon,
  BookmarkIcon,
  CheckCircle2Icon,
  FileTextIcon,
  VideoIcon,
  UsersIcon,
  ArrowRight,
  BookIcon,
  DownloadIcon,
  PlusIcon,
  TrendingUpIcon,
  PiggyBankIcon,
  CreditCardIcon,
  HomeIcon,
  ShieldIcon,
  PercentIcon,
  BarChartIcon,
  ClipboardListIcon,
  LucideIcon,
  FileIcon,
  MessageSquareIcon,
  TrophyIcon,
  ChevronRight
} from "lucide-react";

const StepCard = ({ 
  step, 
  title, 
  description
}: { 
  step: number; 
  title: string; 
  description: string 
}) => (
  <div className="flex items-start space-x-4 p-4 border rounded-lg bg-card">
    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
      {step}
    </div>
    <div>
      <h4 className="font-medium mb-1">{title}</h4>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  </div>
);

const TutorialContent = ({ 
  tutorial 
}: { 
  tutorial: { 
    id: number;
    title: string;
    overview: string;
    steps: Array<{title: string; description: string}>;
  }
}) => (
  <div>
    <h3 className="text-xl font-semibold mb-3">{tutorial.title}</h3>
    <div className="bg-muted/30 p-4 rounded-lg mb-6">
      <h4 className="font-medium mb-2">Overview</h4>
      <p className="text-muted-foreground">{tutorial.overview}</p>
    </div>
    
    <h4 className="font-medium mb-3">Step-by-Step Guide</h4>
    <div className="space-y-3 mb-6">
      {tutorial.steps.map((step, idx) => (
        <StepCard 
          key={idx} 
          step={idx + 1} 
          title={step.title} 
          description={step.description} 
        />
      ))}
    </div>
  </div>
);

const CategoryIcon = ({ category }: { category: string }): JSX.Element => {
  const getIcon = (): LucideIcon => {
    switch (category.toLowerCase()) {
      case 'budgeting':
        return ClipboardListIcon;
      case 'investing':
        return TrendingUpIcon;
      case 'saving':
        return PiggyBankIcon;
      case 'debt':
        return CreditCardIcon;
      case 'retirement':
        return ShieldIcon;
      case 'taxes':
        return PercentIcon;
      case 'housing':
        return HomeIcon;
      case 'basics':
        return BookIcon;
      default:
        return BookOpenIcon;
    }
  };
  
  const IconComponent = getIcon();
  return <IconComponent className="h-5 w-5" />;
};

export default function LearningHub() {
  // Investment Simulator
  const [initialInvestment, setInitialInvestment] = useState(1000);
  const [monthlyContribution, setMonthlyContribution] = useState(100);
  const [years, setYears] = useState(20);
  const [rate, setRate] = useState(7);
  const [simulationResults, setSimulationResults] = useState<{
    finalBalance: number;
    totalContributions: number;
    interestEarned: number;
    yearlyData: Array<{year: number; balance: number}>;
  } | null>(null);

  // Budget Simulator
  const [monthlyIncome, setMonthlyIncome] = useState(4000);
  const [housingExpense, setHousingExpense] = useState(1200);
  const [transportExpense, setTransportExpense] = useState(400);
  const [foodExpense, setFoodExpense] = useState(500);
  const [entertainmentExpense, setEntertainmentExpense] = useState(300);
  const [otherExpense, setOtherExpense] = useState(600);
  const [budgetResults, setBudgetResults] = useState<{
    totalExpenses: number;
    savings: number;
    savingsRate: number;
    recommendations: Array<{category: string; amount: number}>;
  } | null>(null);

  // Selected tutorial
  const [selectedTutorial, setSelectedTutorial] = useState<number | null>(null);
  const [openTutorialDialog, setOpenTutorialDialog] = useState(false);
  
  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  
  // Glossary search state
  const [glossarySearchQuery, setGlossarySearchQuery] = useState("");
  
  // All tutorials data
  const tutorialsData = [
    {
      id: 1,
      title: "Introduction to Budgeting",
      overview: "Learn the fundamentals of budgeting, including the importance of tracking your income and expenses.",
      category: "Budgeting",
      duration: "15 min",
      level: "Beginner",
      progress: 0,
      popularityScore: 98,
      steps: [
        {
          title: "Assess Your Income",
          description: "Identify all sources of income including salary, side hustles, investments, etc. Calculate your total monthly income after taxes."
        },
        {
          title: "List Your Expenses",
          description: "Categorize expenses into fixed (rent, loan payments) and variable (groceries, entertainment). Track your spending for 30 days to get an accurate picture."
        },
        {
          title: "Set Spending Limits",
          description: "Create a realistic spending plan using the 50/30/20 rule: 50% for needs, 30% for wants, and 20% for savings and debt repayment."
        },
        {
          title: "Monitor and Adjust",
          description: "Review your budget monthly and adjust based on actual spending. Use tools like expense trackers or budgeting apps to stay on track."
        }
      ]
    },
    {
      id: 2,
      title: "Saving and Investment Basics",
      overview: "Discover how saving and investing can help secure your future and build wealth over time.",
      category: "Investing",
      duration: "20 min",
      level: "Beginner",
      progress: 35,
      popularityScore: 95,
      steps: [
        {
          title: "Emergency Fund",
          description: "Start by building an emergency fund that covers 3-6 months of essential expenses. Keep this in a high-yield savings account for easy access."
        },
        {
          title: "Short-Term vs. Long-Term Goals",
          description: "Define your financial goals based on timeline: short-term (< 3 years), medium-term (3-10 years), and long-term (10+ years)."
        },
        {
          title: "Introduction to Investments",
          description: "Learn the basics of stocks (ownership in companies), bonds (loans to companies/governments), ETFs (baskets of securities), and mutual funds (professionally managed investment portfolios)."
        },
        {
          title: "Risk Management",
          description: "Understand your risk tolerance based on age, financial goals, and comfort level. Learn how diversification spreads risk across different types of investments."
        }
      ]
    },
    {
      id: 3,
      title: "Debt Management and Credit Health",
      overview: "Explore effective strategies for managing debt and improving your credit score.",
      category: "Debt",
      duration: "25 min",
      level: "Intermediate",
      progress: 0,
      popularityScore: 89,
      steps: [
        {
          title: "Understanding Debt",
          description: "Differentiate between good debt (mortgages, student loans that increase earning potential) and bad debt (high-interest credit cards, payday loans)."
        },
        {
          title: "Debt Reduction Techniques",
          description: "Compare the avalanche method (paying highest interest debt first) and snowball method (paying smallest balance first) to find which works best for your situation."
        },
        {
          title: "Improving Credit Scores",
          description: "Learn the five factors affecting your credit score: payment history (35%), credit utilization (30%), length of credit history (15%), credit mix (10%), and new credit (10%)."
        },
        {
          title: "Debt Consolidation Options",
          description: "Explore options like balance transfers, personal loans, and debt management plans that can simplify payments and potentially lower interest rates."
        }
      ]
    },
    {
      id: 4,
      title: "Retirement Planning 101",
      overview: "Learn essential strategies for planning your retirement and ensuring financial security in your later years.",
      category: "Retirement",
      duration: "30 min",
      level: "Beginner",
      progress: 20,
      popularityScore: 92,
      steps: [
        {
          title: "Setting Retirement Goals",
          description: "Determine your retirement age, lifestyle expectations, and estimated longevity to calculate how much you'll need to save."
        },
        {
          title: "Retirement Account Types",
          description: "Compare traditional 401(k), Roth 401(k), traditional IRA, and Roth IRA accounts, understanding tax implications and contribution limits."
        },
        {
          title: "Calculating Retirement Needs",
          description: "Use the 4% rule and other methods to estimate how much you need to save to maintain your lifestyle in retirement."
        },
        {
          title: "Social Security Planning",
          description: "Understand how Social Security benefits work, when to claim, and how to maximize your benefits based on your situation."
        }
      ]
    },
    {
      id: 5,
      title: "Advanced Tax Strategies",
      overview: "Discover legal ways to minimize your tax burden and optimize your finances through strategic planning.",
      category: "Taxes",
      duration: "35 min",
      level: "Advanced",
      progress: 0,
      popularityScore: 80,
      steps: [
        {
          title: "Tax-Advantaged Accounts",
          description: "Maximize contributions to 401(k)s, IRAs, HSAs, and 529 plans to reduce taxable income and grow investments tax-free or tax-deferred."
        },
        {
          title: "Tax Loss Harvesting",
          description: "Learn how to offset capital gains by selling investments at a loss, following wash sale rules and other IRS guidelines."
        },
        {
          title: "Deduction Optimization",
          description: "Understand standard vs. itemized deductions, bunching strategies, and common deductions often overlooked by taxpayers."
        },
        {
          title: "Tax-Efficient Investment Strategies",
          description: "Learn asset location strategies - placing tax-inefficient investments in tax-advantaged accounts and tax-efficient investments in taxable accounts."
        }
      ]
    },
    {
      id: 6,
      title: "Home Buying Process",
      overview: "Navigate the complex process of purchasing a home, from preparation to closing.",
      category: "Housing",
      duration: "40 min",
      level: "Intermediate",
      progress: 0,
      popularityScore: 87,
      steps: [
        {
          title: "Financial Preparation",
          description: "Save for a down payment (ideally 20%), improve your credit score, get pre-approved for a mortgage, and calculate how much home you can afford."
        },
        {
          title: "Home Search Process",
          description: "Find a real estate agent, identify your needs vs. wants, understand different property types, and conduct neighborhood research."
        },
        {
          title: "Making an Offer",
          description: "Learn how to evaluate comparable properties, prepare a competitive offer, negotiate effectively, and include appropriate contingencies."
        },
        {
          title: "Closing Process",
          description: "Complete a home inspection, secure financing, conduct a final walkthrough, and understand closing costs and documentation."
        }
      ]
    },
    {
      id: 7,
      title: "Understanding Compound Interest",
      overview: "Learn how compound interest works and why it's often called the eighth wonder of the world in investing.",
      category: "Basics",
      duration: "15 min",
      level: "Beginner",
      progress: 50,
      popularityScore: 94,
      steps: [
        {
          title: "Simple vs. Compound Interest",
          description: "Understand the difference between simple interest (calculated only on principal) and compound interest (calculated on principal plus accumulated interest)."
        },
        {
          title: "The Rule of 72",
          description: "Learn how to quickly estimate how long it will take for your money to double using the Rule of 72 (72 ÷ annual interest rate = years to double)."
        },
        {
          title: "Frequency of Compounding",
          description: "Explore how different compounding frequencies (daily, monthly, quarterly, annually) affect investment growth over time."
        },
        {
          title: "Power of Time",
          description: "Discover why starting early is crucial when leveraging compound interest, with examples demonstrating the dramatic difference even a few years can make."
        }
      ]
    },
    {
      id: 8,
      title: "Insurance Basics",
      overview: "Learn about different types of insurance and how they can protect your financial well-being.",
      category: "Basics",
      duration: "25 min",
      level: "Beginner",
      progress: 0,
      popularityScore: 85,
      steps: [
        {
          title: "Health Insurance",
          description: "Understand premiums, deductibles, copays, coinsurance, out-of-pocket maximums, and how to choose a plan that fits your healthcare needs."
        },
        {
          title: "Life Insurance",
          description: "Compare term vs. permanent life insurance, determine how much coverage you need, and learn when each type is appropriate."
        },
        {
          title: "Auto Insurance",
          description: "Explore liability, collision, comprehensive coverage, and factors that affect your premiums, including ways to save."
        },
        {
          title: "Homeowners/Renters Insurance",
          description: "Learn what's covered, what's excluded, and how to ensure you have adequate protection for your property and belongings."
        }
      ]
    }
  ];
  
  // Filter tutorials based on search query
  const filteredTutorials = tutorialsData.filter(tutorial => 
    tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tutorial.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tutorial.overview.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Case studies data
  const caseStudies = [
    {
      id: 1,
      title: "The Early Investor",
      category: "Investing",
      scenario: "Alex starts investing $200 monthly at age 25 vs. Jordan who waits until 35.",
      keyInsight: "Starting 10 years earlier results in nearly double the retirement savings at age 65.",
      fullDescription: "This case study follows two individuals with identical incomes and investment strategies, except for their starting age. Alex begins investing $200 monthly at age 25, while Jordan waits until age 35. Assuming a 7% average annual return, by age 65, Alex accumulates approximately $622,000, while Jordan's portfolio only reaches $315,000. The difference—$307,000—stems primarily from compound interest on Alex's first 10 years of contributions, which had more time to grow."
    },
    {
      id: 2,
      title: "Debt Snowball vs. Avalanche",
      category: "Debt",
      scenario: "Compare two popular debt repayment strategies across different debt profiles.",
      keyInsight: "Avalanche saves more money, but the snowball method provides psychological wins.",
      fullDescription: "This study analyzes two individuals with identical debt ($30,000 across 5 accounts with varying interest rates) but different repayment strategies. Sarah uses the debt avalanche method (targeting highest interest first), while Michael uses the debt snowball method (paying smallest balances first). Sarah becomes debt-free 4 months earlier and saves $1,800 in interest. However, Michael experiences early wins by eliminating two small debts within 6 months, providing psychological momentum. The study demonstrates that the mathematically optimal choice isn't always the most effective for everyone."
    },
    {
      id: 3,
      title: "Housing: Buy vs. Rent",
      category: "Housing",
      scenario: "Evaluate the financial implications of buying a home versus renting long-term.",
      keyInsight: "The decision depends on location, time horizon, and opportunity cost of invested down payment.",
      fullDescription: "This analysis compares two professionals in different housing markets: Boston and Austin. In Boston's expensive market with moderate appreciation, renting and investing the down payment difference in the stock market outperformed buying over a 5-year period. However, in Austin's growing market with stronger appreciation, buying exceeded renting returns after just 3 years. The study highlights the importance of the price-to-rent ratio, expected length of stay, local market conditions, and the opportunity cost of capital when making the rent vs. buy decision."
    },
    {
      id: 4,
      title: "Traditional vs. Roth Retirement",
      category: "Retirement",
      scenario: "Compare tax-deferred and post-tax retirement contributions under different income trajectories.",
      keyInsight: "Tax rate in retirement versus working years is the critical decision factor.",
      fullDescription: "This case study examines identical twins with different career paths. Emma, anticipating significant income growth, opted for Roth contributions (paying taxes now). Mark, expecting stable income throughout his career, chose traditional pre-tax contributions. After 30 years with identical investment performance, Emma's approach yielded 15% more after-tax retirement income due to paying taxes at lower rates during her early career. The study demonstrates that expected future tax rates relative to current rates should drive the traditional vs. Roth decision more than total years to retirement."
    },
    {
      id: 5,
      title: "Impact of Fees on Long-Term Investments",
      category: "Investing",
      scenario: "Compare investment returns between low-cost index funds and actively managed funds with higher expense ratios.",
      keyInsight: "Even small differences in fees compound dramatically over decades.",
      fullDescription: "This analysis tracks $10,000 invested in two different S&P 500 funds: a low-cost index fund charging 0.04% annually and an actively managed fund charging 1.0% annually. Assuming identical pre-fee returns of 8% annually, after 30 years, the low-cost fund grows to approximately $99,000, while the higher-fee fund reaches only $76,000. The 0.96% fee difference translated to a 23% reduction in ending portfolio value, despite identical market performance. This demonstrates how seemingly small fee differences can significantly impact long-term investment outcomes."
    },
    {
      id: 6,
      title: "Emergency Fund: Size vs. Investment Opportunity",
      category: "Saving",
      scenario: "Balance the security of a large emergency fund against the opportunity cost of not investing those funds.",
      keyInsight: "Optimal emergency fund size varies based on income stability, insurance coverage, and risk tolerance.",
      fullDescription: "This case study compares three approaches to emergency savings: minimal (2 months' expenses), standard (6 months), and conservative (12 months). For a freelancer with variable income and limited benefits, the 12-month fund proved optimal despite lower long-term returns, as it prevented high-interest debt during income gaps. For a government employee with stable income and comprehensive benefits, the 2-month fund plus income insurance was most efficient, allowing more capital to be productively invested. The study demonstrates that emergency fund recommendations should be personalized based on income stability, insurance coverage, and access to other liquidity sources."
    }
  ];

  // Glossary terms data
  const glossaryTerms = [
    { 
      term: "401(k)", 
      definition: "A tax-advantaged retirement account sponsored by an employer, allowing employees to save and invest a portion of their paycheck before taxes are taken out.", 
      category: "Retirement"
    },
    { 
      term: "APR", 
      definition: "Annual Percentage Rate - The yearly interest rate charged for borrowing or earned through an investment, expressed as a percentage.", 
      category: "Credit" 
    },
    { 
      term: "APY", 
      definition: "Annual Percentage Yield - The annual rate of return on an investment, taking into account compound interest.", 
      category: "Investing" 
    },
    { 
      term: "Asset Allocation", 
      definition: "The strategy of dividing investments among different asset categories (such as stocks, bonds, and cash) to balance risk and reward according to an investor's goals, risk tolerance, and time horizon.", 
      category: "Investing" 
    },
    { 
      term: "Bear Market", 
      definition: "A market condition in which prices are falling or expected to fall, typically by 20% or more from recent highs.", 
      category: "Investing" 
    },
    { 
      term: "Bond", 
      definition: "A fixed-income security that represents a loan made by an investor to a borrower, typically corporate or governmental. The borrower promises to pay back the loan with interest by a specified date.", 
      category: "Investing" 
    },
    { 
      term: "Bull Market", 
      definition: "A market condition in which prices are rising or expected to rise continuously.", 
      category: "Investing" 
    },
    { 
      term: "Capital Gain", 
      definition: "The profit from selling an asset (such as stocks, bonds, or real estate) for more than its purchase price.", 
      category: "Taxes" 
    },
    { 
      term: "Compound Interest", 
      definition: "Interest calculated on the initial principal and also on the accumulated interest from previous periods, allowing your money to grow at an accelerating rate.", 
      category: "Investing" 
    },
    { 
      term: "Credit Score", 
      definition: "A numerical expression based on a level analysis of a person's credit files, representing the creditworthiness of an individual. FICO scores range from 300 to 850.", 
      category: "Credit" 
    },
    { 
      term: "Diversification", 
      definition: "The practice of spreading investments across various financial instruments, industries, and asset classes to reduce risk and exposure to any single source of loss.", 
      category: "Investing" 
    },
    { 
      term: "Emergency Fund", 
      definition: "Money set aside for unexpected expenses or financial emergencies, typically recommended to cover 3-6 months of living expenses.", 
      category: "Budgeting" 
    },
    { 
      term: "ETF", 
      definition: "Exchange-Traded Fund - A type of investment fund that tracks an index, sector, commodity, or other asset, but can be purchased or sold on a stock exchange the same way as a regular stock.", 
      category: "Investing" 
    },
    { 
      term: "FICO Score", 
      definition: "A credit score created by the Fair Isaac Corporation, ranging from 300 to 850, that lenders use to assess a borrower's creditworthiness.", 
      category: "Credit" 
    },
    { 
      term: "Inflation", 
      definition: "The rate at which the general level of prices for goods and services rises, causing purchasing power to fall over time.", 
      category: "Economics" 
    },
    { 
      term: "IRA", 
      definition: "Individual Retirement Account - A tax-advantaged investment account designed to help individuals save for retirement.", 
      category: "Retirement" 
    },
    { 
      term: "Liquidity", 
      definition: "The ease with which an asset can be converted to cash without affecting its market price. Cash is the most liquid asset.", 
      category: "Investing" 
    },
    { 
      term: "Market Capitalization", 
      definition: "The total dollar value of a company's outstanding shares, calculated by multiplying the current share price by the total number of shares.", 
      category: "Investing" 
    },
    { 
      term: "Mortgage", 
      definition: "A loan used to purchase real estate, where the property serves as collateral for the loan.", 
      category: "Housing" 
    },
    { 
      term: "Mutual Fund", 
      definition: "An investment vehicle that pools money from many investors to purchase securities like stocks, bonds, or other assets.", 
      category: "Investing" 
    },
    { 
      term: "Net Worth", 
      definition: "The value of all assets owned minus the total of all liabilities or debts owed.", 
      category: "Budgeting" 
    },
    { 
      term: "P/E Ratio", 
      definition: "Price-to-Earnings Ratio - A company's current share price divided by its earnings per share, used to evaluate if a stock is overvalued or undervalued.", 
      category: "Investing" 
    },
    { 
      term: "Portfolio", 
      definition: "A collection of financial investments like stocks, bonds, cash, and other assets held by an individual or entity.", 
      category: "Investing" 
    },
    { 
      term: "Roth IRA", 
      definition: "A retirement account where contributions are made with after-tax dollars, but qualified withdrawals are tax-free.", 
      category: "Retirement" 
    },
    { 
      term: "Volatility", 
      definition: "The degree of variation in trading prices over time, often measured by standard deviation. Higher volatility indicates higher risk.", 
      category: "Investing" 
    }
  ];

  // Filter glossary terms based on search query
  const filteredGlossaryTerms = glossaryTerms.filter(item =>
    item.term.toLowerCase().includes(glossarySearchQuery.toLowerCase()) ||
    item.definition.toLowerCase().includes(glossarySearchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(glossarySearchQuery.toLowerCase())
  );

  // Recommended resources data
  const recommendedResources = [
    {
      type: "book",
      title: "The Psychology of Money",
      author: "Morgan Housel",
      description: "Timeless lessons on wealth, greed, and happiness, exploring how money moves through our lives and how our relationship with it impacts our decisions.",
      rating: 4.8
    },
    {
      type: "book",
      title: "The Intelligent Investor",
      author: "Benjamin Graham",
      description: "The definitive book on value investing, providing strategies and wisdom that have made it the stock market bible since its original publication in 1949.",
      rating: 4.7
    },
    {
      type: "website",
      title: "Investopedia",
      url: "https://www.investopedia.com",
      description: "Comprehensive financial dictionary, tutorials, and educational content covering all aspects of finance and investing.",
      rating: 4.9
    },
    {
      type: "course",
      title: "Financial Markets",
      provider: "Yale University (Coursera)",
      description: "An introduction to the fundamentals of financial markets, including risk management, behavioral finance, and financial regulations.",
      duration: "7 weeks",
      rating: 4.8
    },
    {
      type: "video",
      title: "How The Economic Machine Works",
      creator: "Ray Dalio",
      description: "A 30-minute animated video explaining how the economy works in a simple, practical way that's accessible to everyone.",
      duration: "31 minutes",
      rating: 4.9
    },
    {
      type: "podcast",
      title: "Planet Money",
      creator: "NPR",
      description: "The economy explained through entertaining stories and clever analogies that make complex economic concepts accessible.",
      rating: 4.7
    }
  ];

  const runInvestmentSimulation = () => {
    let yearlyData = [];
    let total = initialInvestment;
    const monthlyRate = rate / 100 / 12;
    const totalMonths = years * 12;
    const totalContributions = initialInvestment + (monthlyContribution * totalMonths);
    
    // Calculate first year separately to get starting point
    let yearTotal = total;
    for (let i = 0; i < 12; i++) {
      yearTotal = yearTotal * (1 + monthlyRate) + monthlyContribution;
    }
    yearlyData.push({ year: 1, balance: Math.round(yearTotal) });
    
    // Calculate remaining years
    for (let year = 2; year <= years; year++) {
      let yearStart = yearlyData[yearlyData.length - 1].balance;
      let yearEnd = yearStart;
      
      for (let i = 0; i < 12; i++) {
        yearEnd = yearEnd * (1 + monthlyRate) + monthlyContribution;
      }
      
      yearlyData.push({ year, balance: Math.round(yearEnd) });
    }
    
    const finalBalance = yearlyData[yearlyData.length - 1].balance;
    const interestEarned = finalBalance - totalContributions;
    
    setSimulationResults({
      finalBalance,
      totalContributions,
      interestEarned,
      yearlyData
    });
  };

  const runBudgetSimulation = () => {
    const totalExpenses = housingExpense + transportExpense + foodExpense + entertainmentExpense + otherExpense;
    const savings = monthlyIncome - totalExpenses;
    const savingsRate = (savings / monthlyIncome) * 100;
    
    // Generate recommendations based on common budgeting guidelines
    const recommendedHousing = monthlyIncome * 0.3; // 30% of income
    const recommendedTransport = monthlyIncome * 0.15; // 15% of income
    const recommendedFood = monthlyIncome * 0.15; // 15% of income
    const recommendedEntertainment = monthlyIncome * 0.10; // 10% of income
    const recommendedSavings = monthlyIncome * 0.20; // 20% of income
    
    const recommendations = [
      { category: "Housing", amount: recommendedHousing, current: housingExpense },
      { category: "Transportation", amount: recommendedTransport, current: transportExpense },
      { category: "Food", amount: recommendedFood, current: foodExpense },
      { category: "Entertainment", amount: recommendedEntertainment, current: entertainmentExpense },
      { category: "Savings", amount: recommendedSavings, current: savings }
    ];
    
    setBudgetResults({
      totalExpenses,
      savings,
      savingsRate,
      recommendations
    });
  };

  const openTutorial = (id: number) => {
    setSelectedTutorial(id);
    setOpenTutorialDialog(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-3">
          Integrated Educational Hub
        </h1>
        <p className="text-neutral-600 max-w-3xl">
          Expand your financial knowledge with interactive learning tools, step-by-step tutorials, real-world case studies, and personalized financial simulations.
        </p>
      </div>

      <Tabs defaultValue="tutorials" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="tutorials" className="flex items-center gap-2">
            <BookOpenIcon className="h-4 w-4" />
            <span>Learning Resources</span>
          </TabsTrigger>
          <TabsTrigger value="case-studies" className="flex items-center gap-2">
            <GraduationCapIcon className="h-4 w-4" />
            <span>Case Studies</span>
          </TabsTrigger>
          <TabsTrigger value="tools" className="flex items-center gap-2">
            <LineChartIcon className="h-4 w-4" />
            <span>Interactive Tools</span>
          </TabsTrigger>
          <TabsTrigger value="resources" className="flex items-center gap-2">
            <BookIcon className="h-4 w-4" />
            <span>Additional Resources</span>
          </TabsTrigger>
        </TabsList>

        {/* TUTORIALS TAB */}
        <TabsContent value="tutorials">
          <div className="flex flex-col space-y-8">
            {/* Search and filters */}
            <div className="relative">
              <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-6">
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="md:w-2/3 space-y-4">
                    <h2 className="text-2xl font-bold">Step-by-Step Financial Education</h2>
                    <p className="text-muted-foreground">
                      Master essential financial concepts through our comprehensive tutorials, built to take you from beginner to expert at your own pace.
                    </p>
                    <div className="relative">
                      <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search tutorials by title, category, or keyword..."
                        className="pl-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="cursor-pointer hover:bg-muted" onClick={() => setSearchQuery("")}>All</Badge>
                      <Badge variant="outline" className="cursor-pointer hover:bg-muted" onClick={() => setSearchQuery("Budgeting")}>Budgeting</Badge>
                      <Badge variant="outline" className="cursor-pointer hover:bg-muted" onClick={() => setSearchQuery("Investing")}>Investing</Badge>
                      <Badge variant="outline" className="cursor-pointer hover:bg-muted" onClick={() => setSearchQuery("Debt")}>Debt</Badge>
                      <Badge variant="outline" className="cursor-pointer hover:bg-muted" onClick={() => setSearchQuery("Retirement")}>Retirement</Badge>
                      <Badge variant="outline" className="cursor-pointer hover:bg-muted" onClick={() => setSearchQuery("Beginner")}>Beginner</Badge>
                    </div>
                  </div>
                  <div className="md:w-1/3 flex justify-center">
                    <div className="p-4 bg-primary/20 rounded-full">
                      <FileTextIcon className="h-16 w-16 text-primary" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Popular tutorials */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">Featured Tutorials</h3>
                <Button variant="ghost" size="sm" className="gap-1">
                  View all <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {filteredTutorials
                  .sort((a, b) => b.popularityScore - a.popularityScore)
                  .slice(0, 3)
                  .map(tutorial => (
                    <Card key={tutorial.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-center mb-2">
                          <Badge variant={tutorial.level === "Beginner" ? "default" : 
                                tutorial.level === "Intermediate" ? "secondary" : "destructive"}>
                            {tutorial.level}
                          </Badge>
                          <span className="text-sm text-muted-foreground">{tutorial.duration}</span>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="p-1.5 rounded-full bg-primary/10">
                            <CategoryIcon category={tutorial.category} />
                          </div>
                          <span className="text-sm font-medium">{tutorial.category}</span>
                        </div>
                        <CardTitle className="text-xl">{tutorial.title}</CardTitle>
                        <CardDescription className="line-clamp-2">{tutorial.overview}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-between items-center mb-2 text-sm">
                          <span className="flex items-center gap-1">
                            <TrophyIcon className="h-4 w-4 text-amber-500" />
                            Top rated
                          </span>
                          <span>{tutorial.progress > 0 ? `${tutorial.progress}% complete` : "Not started"}</span>
                        </div>
                        <Progress value={tutorial.progress} className="h-2" />
                      </CardContent>
                      <CardFooter className="bg-muted/50 pt-3">
                        <Button variant="default" className="w-full flex items-center gap-2" onClick={() => openTutorial(tutorial.id)}>
                          {tutorial.progress > 0 ? "Continue" : "Start Tutorial"} <PlayCircleIcon className="h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </div>

            {/* All tutorials */}
            <div>
              <h3 className="text-xl font-semibold mb-4">All Tutorials</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredTutorials.map(tutorial => (
                  <Card key={tutorial.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-center mb-2">
                        <Badge variant={tutorial.level === "Beginner" ? "default" : 
                              tutorial.level === "Intermediate" ? "secondary" : "destructive"}>
                          {tutorial.level}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{tutorial.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="p-1.5 rounded-full bg-primary/10">
                          <CategoryIcon category={tutorial.category} />
                        </div>
                        <span className="text-sm font-medium">{tutorial.category}</span>
                      </div>
                      <CardTitle className="text-xl">{tutorial.title}</CardTitle>
                      <CardDescription className="line-clamp-2">{tutorial.overview}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center mb-2 text-sm">
                        <span className="text-muted-foreground">{tutorial.steps.length} steps</span>
                        <span>{tutorial.progress > 0 ? `${tutorial.progress}% complete` : "Not started"}</span>
                      </div>
                      <Progress value={tutorial.progress} className="h-2" />
                    </CardContent>
                    <CardFooter className="bg-muted/50 pt-3">
                      <Button variant="default" className="w-full flex items-center gap-2" onClick={() => openTutorial(tutorial.id)}>
                        {tutorial.progress > 0 ? "Continue" : "Start Tutorial"} <PlayCircleIcon className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}

                <Card className="border-dashed border-2 hover:border-primary/50 transition-colors">
                  <CardContent className="flex flex-col items-center justify-center h-full py-8">
                    <div className="p-3 rounded-full bg-muted mb-4">
                      <PlusIcon className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <CardTitle className="text-xl mb-2">Request a Tutorial</CardTitle>
                    <CardDescription className="text-center mb-4">
                      Don't see what you're looking for? Let us know what financial topics you'd like to learn about.
                    </CardDescription>
                    <Button variant="outline">Submit Request</Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Financial glossary section */}
            <div className="mt-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Financial Glossary</h2>
                <div className="relative w-80">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search financial terms..."
                    className="pl-10"
                    value={glossarySearchQuery}
                    onChange={(e) => setGlossarySearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredGlossaryTerms.slice(0, 9).map((item, idx) => (
                  <Dialog key={idx}>
                    <DialogTrigger asChild>
                      <div className="p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold">{item.term}</h3>
                          <Badge variant="outline">{item.category}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                          {item.definition}
                        </p>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>{item.term}</DialogTitle>
                        <DialogDescription>
                          {item.definition}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="mt-4">
                        <h4 className="font-medium mb-2">Usage Example:</h4>
                        <p className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
                          "Understanding {item.term} is important because it directly affects your financial decisions when {
                            item.category === "Investing" ? "building a portfolio" : 
                            item.category === "Credit" ? "applying for loans" :
                            item.category === "Retirement" ? "planning for the future" :
                            item.category === "Taxes" ? "filing tax returns" :
                            item.category === "Housing" ? "purchasing a home" :
                            "making financial decisions"
                          }."
                        </p>
                        <div className="flex justify-between mt-4">
                          <Badge variant="outline">{item.category}</Badge>
                          <Button variant="outline" size="sm" className="flex items-center gap-1">
                            <BookmarkIcon className="h-4 w-4" /> Save to My Terms
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>

              {filteredGlossaryTerms.length > 9 && (
                <div className="text-center mt-6">
                  <Button variant="outline">View All {filteredGlossaryTerms.length} Terms</Button>
                </div>
              )}
            </div>
          </div>

          {/* Tutorial Dialog */}
          <Dialog open={openTutorialDialog} onOpenChange={setOpenTutorialDialog}>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {selectedTutorial !== null && tutorialsData.find(t => t.id === selectedTutorial)?.title}
                </DialogTitle>
                <DialogDescription>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline">
                      {selectedTutorial !== null && tutorialsData.find(t => t.id === selectedTutorial)?.category}
                    </Badge>
                    <Badge variant="outline">
                      {selectedTutorial !== null && tutorialsData.find(t => t.id === selectedTutorial)?.level}
                    </Badge>
                    <Badge variant="outline">
                      {selectedTutorial !== null && tutorialsData.find(t => t.id === selectedTutorial)?.duration}
                    </Badge>
                  </div>
                </DialogDescription>
              </DialogHeader>

              <ScrollArea className="p-4 h-[500px]">
                {selectedTutorial !== null && (
                  <TutorialContent 
                    tutorial={tutorialsData.find(t => t.id === selectedTutorial) as any} 
                  />
                )}
              </ScrollArea>

              <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:justify-between mt-4">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <DownloadIcon className="h-4 w-4 mr-2" /> Save as PDF
                  </Button>
                  <Button variant="outline" size="sm">
                    <BookmarkIcon className="h-4 w-4 mr-2" /> Save for Later
                  </Button>
                </div>
                <div>
                  <Button>
                    Mark as Completed <CheckCircle2Icon className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TabsContent>

        {/* CASE STUDIES TAB */}
        <TabsContent value="case-studies">
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="md:w-2/3 space-y-4">
                <h2 className="text-2xl font-bold">Interactive Case Studies</h2>
                <p className="text-muted-foreground">
                  Explore real-world financial scenarios and understand the practical implications of different financial decisions through our detailed case studies.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="cursor-pointer hover:bg-muted">All</Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-muted">Investing</Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-muted">Debt</Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-muted">Housing</Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-muted">Retirement</Badge>
                </div>
              </div>
              <div className="md:w-1/3 flex justify-center">
                <div className="p-4 bg-primary/20 rounded-full">
                  <GraduationCapIcon className="h-16 w-16 text-primary" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {caseStudies.map(study => (
              <Card key={study.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardHeader className="bg-primary/5 border-b">
                  <div className="flex items-center justify-between mb-1">
                    <Badge variant="outline">{study.category}</Badge>
                    <Button variant="ghost" size="icon">
                      <BookmarkIcon className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardTitle className="text-xl">{study.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">SCENARIO</h3>
                    <p>{study.scenario}</p>
                  </div>
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">KEY INSIGHT</h3>
                    <p className="text-sm bg-muted p-3 rounded-md">{study.keyInsight}</p>
                  </div>
                  <Accordion type="single" collapsible className="mt-4">
                    <AccordionItem value="details">
                      <AccordionTrigger>Full Analysis</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground text-sm">
                          {study.fullDescription}
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
                <CardFooter className="bg-muted/50 pt-3 flex justify-between">
                  <Button variant="default" className="flex items-center gap-2">
                    Interactive Simulation <ArrowUpRightIcon className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-12 bg-muted/30 rounded-lg p-6">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="md:w-2/3">
                <h2 className="text-2xl font-bold mb-2">Create Your Own Case Study</h2>
                <p className="text-muted-foreground mb-4">
                  Apply what you've learned to your personal financial situation. Our tools help you create custom scenarios based on your specific goals and circumstances.
                </p>
                <div className="flex gap-3">
                  <Button>Get Started</Button>
                  <Button variant="outline">View Examples</Button>
                </div>
              </div>
              <div className="md:w-1/3 flex justify-center">
                <div className="p-4 bg-primary/10 rounded-full">
                  <BarChart4Icon className="h-16 w-16 text-primary" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">User Success Stories</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between">
                    <Badge>Debt Reduction</Badge>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-4 h-4 text-yellow-500"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="italic text-muted-foreground">
                    "After following the Debt Snowball vs. Avalanche case study, I was able to pay off $27,000 in credit card debt in just 18 months. The simulation helped me visualize my progress and stay motivated."
                  </p>
                  <div className="mt-4 flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                      JD
                    </div>
                    <div>
                      <p className="font-medium">Jamie D.</p>
                      <p className="text-xs text-muted-foreground">Debt-free since 2024</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="flex justify-between">
                    <Badge>Early Investing</Badge>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-4 h-4 text-yellow-500"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="italic text-muted-foreground">
                    "The 'Early Investor' case study motivated me to start contributing to my 401(k) at 22 instead of waiting. The compound interest calculator really opened my eyes to how much more I'll have at retirement."
                  </p>
                  <div className="mt-4 flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                      TS
                    </div>
                    <div>
                      <p className="font-medium">Taylor S.</p>
                      <p className="text-xs text-muted-foreground">Started investing at 22</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* INTERACTIVE TOOLS TAB */}
        <TabsContent value="tools">
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="md:w-2/3 space-y-4">
                <h2 className="text-2xl font-bold">Interactive Financial Tools</h2>
                <p className="text-muted-foreground">
                  Experiment with your financial variables using our suite of interactive calculators and simulators to visualize potential outcomes of different financial decisions.
                </p>
              </div>
              <div className="md:w-1/3 flex justify-center">
                <div className="p-4 bg-primary/20 rounded-full">
                  <BarChartIcon className="h-16 w-16 text-primary" />
                </div>
              </div>
            </div>
          </div>

          <Tabs defaultValue="investment">
            <TabsList className="mb-6">
              <TabsTrigger value="investment">Investment Simulator</TabsTrigger>
              <TabsTrigger value="budget">Budget Optimizer</TabsTrigger>
              <TabsTrigger value="debt">Debt Repayment</TabsTrigger>
              <TabsTrigger value="retirement">Retirement Calculator</TabsTrigger>
            </TabsList>
            
            <TabsContent value="investment">
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Investment Growth Simulator</CardTitle>
                  <CardDescription>
                    See how your investments could grow over time with regular contributions and the power of compound interest.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="initialInvestment">Initial Investment: ${initialInvestment.toLocaleString()}</Label>
                        <Slider
                          id="initialInvestment"
                          min={0}
                          max={100000}
                          step={1000}
                          value={[initialInvestment]}
                          onValueChange={(values) => setInitialInvestment(values[0])}
                          className="my-2"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>$0</span>
                          <span>$100,000</span>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="monthlyContribution">Monthly Contribution: ${monthlyContribution.toLocaleString()}</Label>
                        <Slider
                          id="monthlyContribution"
                          min={0}
                          max={2000}
                          step={50}
                          value={[monthlyContribution]}
                          onValueChange={(values) => setMonthlyContribution(values[0])}
                          className="my-2"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>$0</span>
                          <span>$2,000</span>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="investmentYears">Time Period: {years} years</Label>
                        <Slider
                          id="investmentYears"
                          min={1}
                          max={50}
                          step={1}
                          value={[years]}
                          onValueChange={(values) => setYears(values[0])}
                          className="my-2"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>1 year</span>
                          <span>50 years</span>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="investmentRate">Annual Return Rate: {rate}%</Label>
                        <Slider
                          id="investmentRate"
                          min={1}
                          max={15}
                          step={0.5}
                          value={[rate]}
                          onValueChange={(values) => setRate(values[0])}
                          className="my-2"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>1%</span>
                          <span>15%</span>
                        </div>
                      </div>

                      <Button onClick={runInvestmentSimulation} className="w-full mt-4">
                        Calculate Results
                      </Button>
                    </div>

                    {simulationResults && (
                      <div className="space-y-4">
                        <div className="bg-muted p-6 rounded-lg space-y-4">
                          <div className="text-center">
                            <h3 className="font-medium text-lg mb-1">Final Investment Value</h3>
                            <p className="text-4xl font-bold text-primary">
                              ${simulationResults.finalBalance.toLocaleString()}
                            </p>
                          </div>
                          
                          <Separator />
                          
                          <div className="grid grid-cols-2 gap-4 text-center">
                            <div>
                              <h4 className="text-sm text-muted-foreground mb-1">Total Contributions</h4>
                              <p className="font-medium">${simulationResults.totalContributions.toLocaleString()}</p>
                            </div>
                            <div>
                              <h4 className="text-sm text-muted-foreground mb-1">Interest Earned</h4>
                              <p className="font-medium">${simulationResults.interestEarned.toLocaleString()}</p>
                            </div>
                          </div>
                          
                          <div className="mt-4">
                            <h4 className="text-sm font-medium mb-2">Growth Over Time</h4>
                            <div className="h-[150px] w-full bg-white/50 rounded-md p-2">
                              {/* SVG line chart would go here in a real implementation */}
                              <div className="h-full w-full relative">
                                <div className="absolute inset-0 flex items-end">
                                  {simulationResults.yearlyData.map((year, idx) => {
                                    const percentage = Math.min(100, (year.balance / simulationResults.finalBalance) * 100);
                                    return (
                                      <div 
                                        key={idx}
                                        className="flex-1 mx-0.5"
                                        style={{height: `${percentage}%`}}
                                      >
                                        <div 
                                          className="h-full rounded-t-sm bg-gradient-to-t from-primary/50 to-primary" 
                                          title={`Year ${year.year}: $${year.balance.toLocaleString()}`}
                                        />
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                            <div className="flex justify-between text-xs text-muted-foreground mt-1">
                              <span>Year 1</span>
                              <span>Year {years}</span>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 border border-primary/20 rounded-lg bg-primary/5">
                          <h4 className="font-medium mb-2">Key Insights</h4>
                          <p className="text-sm text-muted-foreground mb-3">
                            Your investment will grow to <strong>${simulationResults.finalBalance.toLocaleString()}</strong> after {years} years, with {((simulationResults.interestEarned / simulationResults.finalBalance) * 100).toFixed(1)}% of that coming from compound interest.
                          </p>
                          <p className="text-sm text-muted-foreground">
                            If you increased your monthly contribution by just $50, you could have an additional <strong>${Math.round(simulationResults.finalBalance * 0.12).toLocaleString()}</strong> at the end of your investment period.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between flex-wrap gap-2">
                  <Button variant="outline" size="sm">
                    <DownloadIcon className="h-4 w-4 mr-2" /> Download Report
                  </Button>
                  <Button variant="outline" size="sm">
                    <BookmarkIcon className="h-4 w-4 mr-2" /> Save Scenario
                  </Button>
                </CardFooter>
              </Card>

              <div className="bg-muted/30 p-6 rounded-lg">
                <h3 className="text-xl font-medium mb-4">Did You Know?</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-4 bg-white rounded-lg shadow-sm">
                    <div className="p-2 rounded-full bg-primary/10 w-fit mb-3">
                      <TrendingUpIcon className="h-5 w-5 text-primary" />
                    </div>
                    <h4 className="font-medium mb-1">The Rule of 72</h4>
                    <p className="text-sm text-muted-foreground">
                      Divide 72 by your expected annual return to estimate how many years it will take for your investment to double.
                    </p>
                  </div>
                  <div className="p-4 bg-white rounded-lg shadow-sm">
                    <div className="p-2 rounded-full bg-primary/10 w-fit mb-3">
                      <ClipboardListIcon className="h-5 w-5 text-primary" />
                    </div>
                    <h4 className="font-medium mb-1">Start Early</h4>
                    <p className="text-sm text-muted-foreground">
                      Starting to invest just 5 years earlier can increase your retirement savings by 50% or more due to compound interest.
                    </p>
                  </div>
                  <div className="p-4 bg-white rounded-lg shadow-sm">
                    <div className="p-2 rounded-full bg-primary/10 w-fit mb-3">
                      <PiggyBankIcon className="h-5 w-5 text-primary" />
                    </div>
                    <h4 className="font-medium mb-1">Consistency Matters</h4>
                    <p className="text-sm text-muted-foreground">
                      Regular contributions, even small ones, often outperform larger lump sums invested inconsistently.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="budget">
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Budget Optimization Tool</CardTitle>
                  <CardDescription>
                    Analyze your spending patterns and receive personalized recommendations for optimizing your budget.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="monthlyIncome">Monthly Income: ${monthlyIncome.toLocaleString()}</Label>
                        <Slider
                          id="monthlyIncome"
                          min={1000}
                          max={15000}
                          step={100}
                          value={[monthlyIncome]}
                          onValueChange={(values) => setMonthlyIncome(values[0])}
                          className="my-2"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>$1,000</span>
                          <span>$15,000</span>
                        </div>
                      </div>

                      <h4 className="text-lg font-medium mt-4">Monthly Expenses</h4>

                      <div>
                        <Label htmlFor="housingExpense">Housing: ${housingExpense.toLocaleString()}</Label>
                        <Slider
                          id="housingExpense"
                          min={0}
                          max={5000}
                          step={50}
                          value={[housingExpense]}
                          onValueChange={(values) => setHousingExpense(values[0])}
                          className="my-2"
                        />
                      </div>

                      <div>
                        <Label htmlFor="transportExpense">Transportation: ${transportExpense.toLocaleString()}</Label>
                        <Slider
                          id="transportExpense"
                          min={0}
                          max={2000}
                          step={25}
                          value={[transportExpense]}
                          onValueChange={(values) => setTransportExpense(values[0])}
                          className="my-2"
                        />
                      </div>

                      <div>
                        <Label htmlFor="foodExpense">Food: ${foodExpense.toLocaleString()}</Label>
                        <Slider
                          id="foodExpense"
                          min={0}
                          max={2000}
                          step={25}
                          value={[foodExpense]}
                          onValueChange={(values) => setFoodExpense(values[0])}
                          className="my-2"
                        />
                      </div>

                      <div>
                        <Label htmlFor="entertainmentExpense">Entertainment: ${entertainmentExpense.toLocaleString()}</Label>
                        <Slider
                          id="entertainmentExpense"
                          min={0}
                          max={1000}
                          step={25}
                          value={[entertainmentExpense]}
                          onValueChange={(values) => setEntertainmentExpense(values[0])}
                          className="my-2"
                        />
                      </div>

                      <div>
                        <Label htmlFor="otherExpense">Other: ${otherExpense.toLocaleString()}</Label>
                        <Slider
                          id="otherExpense"
                          min={0}
                          max={3000}
                          step={50}
                          value={[otherExpense]}
                          onValueChange={(values) => setOtherExpense(values[0])}
                          className="my-2"
                        />
                      </div>

                      <Button onClick={runBudgetSimulation} className="w-full mt-4">
                        Analyze Budget
                      </Button>
                    </div>

                    {budgetResults && (
                      <div className="space-y-4">
                        <div className="bg-muted p-6 rounded-lg">
                          <div className="grid grid-cols-2 gap-4 text-center mb-4">
                            <div>
                              <h4 className="text-sm text-muted-foreground mb-1">Total Expenses</h4>
                              <p className="text-2xl font-bold">${budgetResults.totalExpenses.toLocaleString()}</p>
                            </div>
                            <div>
                              <h4 className="text-sm text-muted-foreground mb-1">Monthly Savings</h4>
                              <p className={`text-2xl font-bold ${budgetResults.savings >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                ${budgetResults.savings.toLocaleString()}
                              </p>
                            </div>
                          </div>
                          
                          <div className="text-center mb-4">
                            <h4 className="text-sm text-muted-foreground mb-1">Savings Rate</h4>
                            <div className="relative pt-1">
                              <div className="flex mb-2 items-center justify-between">
                                <div>
                                  <span className={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full ${
                                    budgetResults.savingsRate >= 20 ? 'bg-green-200 text-green-800' :
                                    budgetResults.savingsRate >= 10 ? 'bg-yellow-200 text-yellow-800' :
                                    'bg-red-200 text-red-800'
                                  }`}>
                                    {budgetResults.savingsRate.toFixed(1)}%
                                  </span>
                                </div>
                                <div className="text-right">
                                  <span className="text-xs font-semibold inline-block text-muted-foreground">
                                    Target: 20%
                                  </span>
                                </div>
                              </div>
                              <div className="relative w-full h-2 bg-muted rounded-full">
                                <div 
                                  style={{ width: `${Math.min(100, budgetResults.savingsRate)}%` }}
                                  className={`absolute h-full rounded-full ${
                                    budgetResults.savingsRate >= 20 ? 'bg-green-500' :
                                    budgetResults.savingsRate >= 10 ? 'bg-yellow-500' :
                                    'bg-red-500'
                                  }`}
                                ></div>
                              </div>
                            </div>
                          </div>
                          
                          <Separator className="my-4" />
                          
                          <h4 className="font-medium mb-3">Budget Recommendations</h4>
                          <div className="space-y-3">
                            {budgetResults.recommendations.map((rec, idx) => {
                              const difference = rec.current - rec.amount;
                              const percentDiff = Math.abs((difference / rec.amount) * 100).toFixed(1);
                              return (
                                <div key={idx} className="bg-white/70 p-3 rounded-md">
                                  <div className="flex justify-between mb-1">
                                    <span className="font-medium">{rec.category}</span>
                                    <span className={difference > 0 ? 'text-red-600' : difference < 0 ? 'text-green-600' : 'text-muted-foreground'}>
                                      {difference > 0 ? `${percentDiff}% over` : difference < 0 ? `${percentDiff}% under` : 'On target'}
                                    </span>
                                  </div>
                                  <div className="flex justify-between text-xs text-muted-foreground">
                                    <span>Current: ${rec.current.toLocaleString()}</span>
                                    <span>Target: ${rec.amount.toLocaleString()}</span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        <div className="p-4 border border-primary/20 rounded-lg bg-primary/5">
                          <h4 className="font-medium mb-2">Insights & Tips</h4>
                          {budgetResults.savingsRate < 10 && (
                            <p className="text-sm text-muted-foreground mb-2">
                              Your savings rate is below 10%, which puts you at risk for financial emergencies. Consider cutting back on entertainment and food expenses to boost your savings.
                            </p>
                          )}
                          {budgetResults.savingsRate >= 10 && budgetResults.savingsRate < 20 && (
                            <p className="text-sm text-muted-foreground mb-2">
                              You're saving between 10-20% of your income, which is a good start. For long-term financial security, aim to increase to 20% through gradual expense reduction.
                            </p>
                          )}
                          {budgetResults.savingsRate >= 20 && (
                            <p className="text-sm text-muted-foreground mb-2">
                              Excellent job saving over 20% of your income! Consider allocating these savings strategically between emergency funds, retirement, and other financial goals.
                            </p>
                          )}
                          {budgetResults.recommendations[0].current > budgetResults.recommendations[0].amount && (
                            <p className="text-sm text-muted-foreground">
                              Your housing costs exceed 30% of your income. Consider roommates, downsizing, or refinancing to reduce this major expense and improve your overall financial health.
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="debt">
              <Card>
                <CardHeader>
                  <CardTitle>Debt Repayment Strategies</CardTitle>
                  <CardDescription>
                    Compare different debt repayment methods and find the best strategy for your situation.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="bg-muted p-6 rounded-lg">
                      <h3 className="text-lg font-medium mb-4">Add Your Debts</h3>
                      <div className="grid grid-cols-4 gap-4 mb-3">
                        <div className="font-medium">Debt Name</div>
                        <div className="font-medium">Balance</div>
                        <div className="font-medium">Interest Rate</div>
                        <div className="font-medium">Min. Payment</div>
                      </div>
                      <div className="grid grid-cols-4 gap-4 mb-3">
                        <div>
                          <Input placeholder="Credit Card 1" />
                        </div>
                        <div>
                          <div className="flex items-center">
                            <span className="bg-muted px-2 py-2 rounded-l-md border-y border-l">$</span>
                            <Input placeholder="5000" className="rounded-l-none" />
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center">
                            <Input placeholder="18.99" className="rounded-r-none" />
                            <span className="bg-muted px-2 py-2 rounded-r-md border-y border-r">%</span>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center">
                            <span className="bg-muted px-2 py-2 rounded-l-md border-y border-l">$</span>
                            <Input placeholder="150" className="rounded-l-none" />
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-4 gap-4 mb-3">
                        <div>
                          <Input placeholder="Car Loan" />
                        </div>
                        <div>
                          <div className="flex items-center">
                            <span className="bg-muted px-2 py-2 rounded-l-md border-y border-l">$</span>
                            <Input placeholder="12000" className="rounded-l-none" />
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center">
                            <Input placeholder="4.5" className="rounded-r-none" />
                            <span className="bg-muted px-2 py-2 rounded-r-md border-y border-r">%</span>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center">
                            <span className="bg-muted px-2 py-2 rounded-l-md border-y border-l">$</span>
                            <Input placeholder="275" className="rounded-l-none" />
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-center mt-4">
                        <Button variant="outline" className="mr-2">+ Add Debt</Button>
                        <Button>Compare Strategies</Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader className="bg-primary/5 pb-3">
                          <CardTitle className="text-lg">Debt Avalanche Method</CardTitle>
                          <CardDescription>
                            Pay off highest interest rate debts first to minimize interest payments.
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-4">
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Time to debt-free:</span>
                              <span className="font-medium">2 years, 3 months</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Total interest paid:</span>
                              <span className="font-medium">$2,840</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Monthly payment:</span>
                              <span className="font-medium">$750</span>
                            </div>
                          </div>
                          <div className="mt-4 pt-4 border-t">
                            <h4 className="font-medium mb-2">Payment Order:</h4>
                            <ol className="space-y-1 ml-5 list-decimal text-sm">
                              <li>Credit Card 1 (18.99%)</li>
                              <li>Car Loan (4.5%)</li>
                            </ol>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button variant="outline" className="w-full">View Detailed Plan</Button>
                        </CardFooter>
                      </Card>
                      
                      <Card>
                        <CardHeader className="bg-primary/5 pb-3">
                          <CardTitle className="text-lg">Debt Snowball Method</CardTitle>
                          <CardDescription>
                            Pay off smallest balances first to gain psychological wins and momentum.
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-4">
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Time to debt-free:</span>
                              <span className="font-medium">2 years, 5 months</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Total interest paid:</span>
                              <span className="font-medium">$3,120</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Monthly payment:</span>
                              <span className="font-medium">$750</span>
                            </div>
                          </div>
                          <div className="mt-4 pt-4 border-t">
                            <h4 className="font-medium mb-2">Payment Order:</h4>
                            <ol className="space-y-1 ml-5 list-decimal text-sm">
                              <li>Credit Card 1 ($5,000)</li>
                              <li>Car Loan ($12,000)</li>
                            </ol>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button variant="outline" className="w-full">View Detailed Plan</Button>
                        </CardFooter>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="retirement">
              <Card>
                <CardHeader>
                  <CardTitle>Retirement Planning Calculator</CardTitle>
                  <CardDescription>
                    Project your retirement savings and determine if you're on track to meet your goals.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Your Information</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="currentAge">Current Age</Label>
                          <Input id="currentAge" type="number" placeholder="30" />
                        </div>
                        <div>
                          <Label htmlFor="retirementAge">Retirement Age</Label>
                          <Input id="retirementAge" type="number" placeholder="65" />
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-medium mt-4">Current Savings</h3>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="currentSavings">Retirement Savings Balance</Label>
                          <div className="flex items-center">
                            <span className="bg-muted px-3 py-2 rounded-l-md border-y border-l">$</span>
                            <Input id="currentSavings" type="number" placeholder="50000" className="rounded-l-none" />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="monthlySavings">Monthly Contributions</Label>
                          <div className="flex items-center">
                            <span className="bg-muted px-3 py-2 rounded-l-md border-y border-l">$</span>
                            <Input id="monthlySavings" type="number" placeholder="500" className="rounded-l-none" />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="employerMatch">Employer Match (%)</Label>
                          <div className="flex items-center">
                            <Input id="employerMatch" type="number" placeholder="4" className="rounded-r-none" />
                            <span className="bg-muted px-3 py-2 rounded-r-md border-y border-r">%</span>
                          </div>
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-medium mt-4">Retirement Needs</h3>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="incomeNeeded">Desired Annual Income</Label>
                          <div className="flex items-center">
                            <span className="bg-muted px-3 py-2 rounded-l-md border-y border-l">$</span>
                            <Input id="incomeNeeded" type="number" placeholder="60000" className="rounded-l-none" />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="socialSecurity">Expected Monthly Social Security</Label>
                          <div className="flex items-center">
                            <span className="bg-muted px-3 py-2 rounded-l-md border-y border-l">$</span>
                            <Input id="socialSecurity" type="number" placeholder="1800" className="rounded-l-none" />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="inflationRate">Expected Inflation Rate (%)</Label>
                          <div className="flex items-center">
                            <Input id="inflationRate" type="number" placeholder="2.5" className="rounded-r-none" />
                            <span className="bg-muted px-3 py-2 rounded-r-md border-y border-r">%</span>
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="expectedReturn">Expected Annual Return (%)</Label>
                          <div className="flex items-center">
                            <Input id="expectedReturn" type="number" placeholder="7" className="rounded-r-none" />
                            <span className="bg-muted px-3 py-2 rounded-r-md border-y border-r">%</span>
                          </div>
                        </div>
                      </div>
                      
                      <Button className="w-full mt-4">
                        Calculate Retirement Projection
                      </Button>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="border p-6 rounded-lg">
                        <h3 className="text-xl font-medium text-center mb-4">Your Retirement Projection</h3>
                        <p className="text-center text-muted-foreground mb-4">
                          Based on your inputs, here's what your retirement might look like:
                        </p>
                        
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="text-center p-3 bg-muted/50 rounded-lg">
                            <h4 className="text-sm text-muted-foreground mb-1">Retirement Savings</h4>
                            <p className="text-2xl font-bold text-primary">$1,247,000</p>
                          </div>
                          <div className="text-center p-3 bg-muted/50 rounded-lg">
                            <h4 className="text-sm text-muted-foreground mb-1">Monthly Income</h4>
                            <p className="text-2xl font-bold text-primary">$5,195</p>
                          </div>
                        </div>
                        
                        <div className="space-y-3 mb-6">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Income Replacement</span>
                            <span className="font-medium">86%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2.5">
                            <div className="bg-primary h-2.5 rounded-full" style={{ width: '86%' }}></div>
                          </div>
                          <p className="text-xs text-muted-foreground">Target: 80% of pre-retirement income</p>
                        </div>
                        
                        <div className="space-y-3">
                          <h4 className="font-medium">Key Numbers</h4>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Years until retirement:</span>
                            <span>35 years</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Estimated years in retirement:</span>
                            <span>20 years</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Total contributions:</span>
                            <span>$315,000</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Investment growth:</span>
                            <span>$932,000</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 border border-primary/20 rounded-lg bg-primary/5">
                        <h4 className="font-medium mb-2">Recommendations</h4>
                        <ul className="space-y-2">
                          <li className="flex items-start text-sm">
                            <CheckCircle2Icon className="h-4 w-4 mr-2 mt-0.5 text-green-600" />
                            <span>You're on track to meet your retirement goals. Keep up the good work!</span>
                          </li>
                          <li className="flex items-start text-sm">
                            <CheckCircle2Icon className="h-4 w-4 mr-2 mt-0.5 text-green-600" />
                            <span>Consider increasing your contributions by 1-2% each year to build additional security.</span>
                          </li>
                          <li className="flex items-start text-sm">
                            <CheckCircle2Icon className="h-4 w-4 mr-2 mt-0.5 text-green-600" />
                            <span>Revisit your asset allocation to ensure it aligns with your time horizon and risk tolerance.</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="flex justify-center gap-4">
                        <Button variant="outline" size="sm">
                          <DownloadIcon className="h-4 w-4 mr-2" /> Download Report
                        </Button>
                        <Button variant="outline" size="sm">
                          <BookmarkIcon className="h-4 w-4 mr-2" /> Save Results
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </TabsContent>

        {/* ADDITIONAL RESOURCES TAB */}
        <TabsContent value="resources">
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="md:w-2/3 space-y-4">
                <h2 className="text-2xl font-bold">Additional Learning Resources</h2>
                <p className="text-muted-foreground">
                  Expand your financial knowledge with our curated collection of books, websites, courses, and multimedia resources.
                </p>
              </div>
              <div className="md:w-1/3 flex justify-center">
                <div className="p-4 bg-primary/20 rounded-full">
                  <BookIcon className="h-16 w-16 text-primary" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card>
              <CardHeader>
                <div className="p-2 w-fit rounded-full bg-primary/10 mb-3">
                  <VideoIcon className="h-5 w-5 text-primary" />
                </div>
                <CardTitle>Video Tutorials</CardTitle>
                <CardDescription>
                  Watch expert-led video tutorials covering key financial concepts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">Understanding Market Cycles</h4>
                      <Badge variant="outline">12:45</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Learn how to recognize different market cycles and adjust your investment strategy accordingly.</p>
                    <Button variant="ghost" size="sm" className="mt-2 w-full flex items-center justify-center gap-1">
                      <PlayCircleIcon className="h-4 w-4" /> Watch Now
                    </Button>
                  </div>
                  
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">The Psychology of Spending</h4>
                      <Badge variant="outline">18:22</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Explore the psychological factors that influence spending decisions and how to control impulse purchases.</p>
                    <Button variant="ghost" size="sm" className="mt-2 w-full flex items-center justify-center gap-1">
                      <PlayCircleIcon className="h-4 w-4" /> Watch Now
                    </Button>
                  </div>
                  
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">Tax-Efficient Investing</h4>
                      <Badge variant="outline">15:38</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Discover strategies to minimize the tax impact on your investment returns through proper account selection.</p>
                    <Button variant="ghost" size="sm" className="mt-2 w-full flex items-center justify-center gap-1">
                      <PlayCircleIcon className="h-4 w-4" /> Watch Now
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View All Videos</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="p-2 w-fit rounded-full bg-primary/10 mb-3">
                  <FileIcon className="h-5 w-5 text-primary" />
                </div>
                <CardTitle>Downloadable Guides</CardTitle>
                <CardDescription>
                  Access comprehensive guides and templates for financial planning
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                    <div className="mr-3 p-2 bg-primary/20 rounded-full">
                      <DownloadIcon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Budget Template</h4>
                      <p className="text-xs text-muted-foreground">Excel, PDF · 245KB</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                    <div className="mr-3 p-2 bg-primary/20 rounded-full">
                      <DownloadIcon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Debt Reduction Planner</h4>
                      <p className="text-xs text-muted-foreground">Excel, Google Sheets · 312KB</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                    <div className="mr-3 p-2 bg-primary/20 rounded-full">
                      <DownloadIcon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Investment Risk Assessment</h4>
                      <p className="text-xs text-muted-foreground">PDF · 178KB</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-muted/30 rounded-lg">
                    <div className="mr-3 p-2 bg-primary/20 rounded-full">
                      <DownloadIcon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Retirement Planning Guide</h4>
                      <p className="text-xs text-muted-foreground">PDF · 425KB</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View All Downloads</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="p-2 w-fit rounded-full bg-primary/10 mb-3">
                  <MessageSquareIcon className="h-5 w-5 text-primary" />
                </div>
                <CardTitle>Community & Forums</CardTitle>
                <CardDescription>
                  Connect with peers and financial experts to ask questions and share insights
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">Investing Strategies</h4>
                      <Badge>325 members</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Discuss various investment approaches, asset allocation, and market trends.</p>
                    <Button variant="ghost" size="sm" className="mt-2 w-full">Join Discussion</Button>
                  </div>
                  
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">Debt Freedom</h4>
                      <Badge>189 members</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Share strategies, celebrate milestones, and support others on their journey to debt freedom.</p>
                    <Button variant="ghost" size="sm" className="mt-2 w-full">Join Discussion</Button>
                  </div>
                  
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">Ask an Expert</h4>
                      <Badge variant="outline">Weekly</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Weekly Q&A sessions with certified financial planners and industry experts.</p>
                    <div className="mt-2 bg-muted p-2 rounded text-sm">
                      <span className="font-medium">Next session:</span> Friday, Mar 31 at 2:00 PM
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View All Forums</Button>
              </CardFooter>
            </Card>
          </div>

          <h3 className="text-xl font-semibold mb-6">Recommended Resources</h3>
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-medium mb-4 flex items-center">
                <BookIcon className="h-5 w-5 mr-2 text-primary" /> Books
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommendedResources.filter(r => r.type === "book").map((book, idx) => (
                  <Card key={idx} className="flex overflow-hidden">
                    <div className="bg-primary/10 p-6 flex items-center justify-center">
                      <BookIcon className="h-12 w-12 text-primary" />
                    </div>
                    <div className="flex-1 p-4">
                      <h5 className="font-medium mb-1">{book.title}</h5>
                      <p className="text-sm text-muted-foreground mb-1">by {book.author}</p>
                      <p className="text-sm line-clamp-2">{book.description}</p>
                      <div className="flex mt-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill={star <= Math.floor(book.rating) ? "currentColor" : "none"}
                            stroke="currentColor"
                            className={`w-4 h-4 ${star <= Math.floor(book.rating) ? "text-yellow-500" : "text-gray-300"}`}
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ))}
                        <span className="text-sm ml-1 text-muted-foreground">{book.rating}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-medium mb-4 flex items-center">
                <ArrowUpRightIcon className="h-5 w-5 mr-2 text-primary" /> Websites & Online Courses
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommendedResources.filter(r => r.type === "website" || r.type === "course").map((resource, idx) => (
                  <Card key={idx} className="flex overflow-hidden">
                    <div className="bg-primary/10 p-6 flex items-center justify-center">
                      {resource.type === "website" ? (
                        <ArrowUpRightIcon className="h-12 w-12 text-primary" />
                      ) : (
                        <GraduationCapIcon className="h-12 w-12 text-primary" />
                      )}
                    </div>
                    <div className="flex-1 p-4">
                      <div className="flex justify-between">
                        <h5 className="font-medium mb-1">{resource.title}</h5>
                        <Badge variant="outline">{resource.type === "website" ? "Website" : "Course"}</Badge>
                      </div>
                      {resource.type === "course" && (
                        <p className="text-sm text-muted-foreground mb-1">
                          by {resource.provider} · {resource.duration}
                        </p>
                      )}
                      <p className="text-sm line-clamp-2">{resource.description}</p>
                      <div className="flex justify-between mt-2">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                              key={star}
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill={star <= Math.floor(resource.rating) ? "currentColor" : "none"}
                              stroke="currentColor"
                              className={`w-4 h-4 ${star <= Math.floor(resource.rating) ? "text-yellow-500" : "text-gray-300"}`}
                            >
                              <path
                                fillRule="evenodd"
                                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                clipRule="evenodd"
                              />
                            </svg>
                          ))}
                          <span className="text-sm ml-1 text-muted-foreground">{resource.rating}</span>
                        </div>
                        <Button variant="ghost" size="sm" className="gap-1">
                          Visit <ArrowUpRightIcon className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-medium mb-4 flex items-center">
                <VideoIcon className="h-5 w-5 mr-2 text-primary" /> Videos & Podcasts
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommendedResources.filter(r => r.type === "video" || r.type === "podcast").map((resource, idx) => (
                  <Card key={idx} className="flex overflow-hidden">
                    <div className="bg-primary/10 p-6 flex items-center justify-center">
                      {resource.type === "video" ? (
                        <VideoIcon className="h-12 w-12 text-primary" />
                      ) : (
                        <UsersIcon className="h-12 w-12 text-primary" />
                      )}
                    </div>
                    <div className="flex-1 p-4">
                      <div className="flex justify-between">
                        <h5 className="font-medium mb-1">{resource.title}</h5>
                        <Badge variant="outline">{resource.type === "video" ? "Video" : "Podcast"}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">
                        by {resource.creator}
                        {resource.type === "video" && ` · ${resource.duration}`}
                      </p>
                      <p className="text-sm line-clamp-2">{resource.description}</p>
                      <div className="flex justify-between mt-2">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                              key={star}
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill={star <= Math.floor(resource.rating) ? "currentColor" : "none"}
                              stroke="currentColor"
                              className={`w-4 h-4 ${star <= Math.floor(resource.rating) ? "text-yellow-500" : "text-gray-300"}`}
                            >
                              <path
                                fillRule="evenodd"
                                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                clipRule="evenodd"
                              />
                            </svg>
                          ))}
                          <span className="text-sm ml-1 text-muted-foreground">{resource.rating}</span>
                        </div>
                        <Button variant="ghost" size="sm" className="gap-1">
                          {resource.type === "video" ? "Watch" : "Listen"} <ArrowUpRightIcon className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 bg-muted/30 rounded-lg p-6">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="md:w-2/3">
                <h2 className="text-2xl font-bold mb-2">Suggest a Resource</h2>
                <p className="text-muted-foreground mb-4">
                  Have a book, website, or course that helped you with your financial journey? Share it with the community!
                </p>
                <div className="flex gap-3">
                  <Button>Submit Resource</Button>
                  <Button variant="outline">View Guidelines</Button>
                </div>
              </div>
              <div className="md:w-1/3 flex justify-center">
                <div className="p-4 bg-primary/10 rounded-full">
                  <UsersIcon className="h-16 w-16 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}