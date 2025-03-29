import express, { type Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertChatMessageSchema, 
  insertFinancialGoalSchema, 
  insertFinancialProfileSchema, 
  insertUserSchema 
} from "@shared/schema";
import { fromZodError } from "zod-validation-error";
import { generateFinanceResponse, generateLocalFinanceResponse } from "./aiService";
import { getStockQuote, getHistoricalData, searchStocks, getCompanyOverview } from "./stockService";

export async function registerRoutes(app: Express): Promise<Server> {
  const router = express.Router();

  // --- User routes ---

  // Register a new user
  router.post("/users/register", async (req: Request, res: Response) => {
    try {
      const userData = insertUserSchema.parse(req.body);

      // Check if user already exists
      const existingUser = await storage.getUserByUsername(userData.username);
      if (existingUser) {
        return res.status(409).json({ message: "Username already exists" });
      }

      const existingEmail = await storage.getUserByEmail(userData.email);
      if (existingEmail) {
        return res.status(409).json({ message: "Email already exists" });
      }

      const newUser = await storage.createUser(userData);

      // Don't return password in response
      const { password, ...userWithoutPassword } = newUser;
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      // Check if it's a ZodError using a safer approach
      if (error instanceof Error) {
        if ('issues' in error && Array.isArray((error as any).issues)) {
          // This is likely a ZodError
          res.status(400).json({ message: fromZodError(error as any).message });
        } else {
          // Regular Error
          res.status(400).json({ message: error.message || "Invalid request data" });
        }
      } else {
        // Unknown error
        res.status(500).json({ message: "An unknown error occurred" });
      }
    }
  });

  // Login user
  router.post("/users/login", async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
      }

      const user = await storage.getUserByUsername(username);

      // In the database, the field is "password_hash" but in our schema it's mapped to "password"
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Don't return password in response
      const { password: _, ...userWithoutPassword } = user;
      res.status(200).json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: "An error occurred during login" });
    }
  });

  // --- Financial Profile routes ---

  // Get user's financial profile
  router.get("/financial-profile/:userId", async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.userId);

      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }

      const profile = await storage.getFinancialProfile(userId);

      if (!profile) {
        return res.status(404).json({ message: "Financial profile not found" });
      }

      res.status(200).json(profile);
    } catch (error) {
      res.status(500).json({ message: "An error occurred retrieving the financial profile" });
    }
  });

  // Create or update financial profile
  router.post("/financial-profile", async (req: Request, res: Response) => {
    try {
      const profileData = insertFinancialProfileSchema.parse(req.body);

      // Check if user exists
      const user = await storage.getUser(profileData.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Check if profile already exists for this user
      const existingProfile = await storage.getFinancialProfile(profileData.userId);

      let profile;
      if (existingProfile) {
        profile = await storage.updateFinancialProfile(profileData.userId, profileData);
      } else {
        profile = await storage.createFinancialProfile(profileData);
      }

      res.status(200).json(profile);
    } catch (error) {
      // Check if it's a ZodError using a safer approach
      if (error instanceof Error) {
        if ('issues' in error && Array.isArray((error as any).issues)) {
          // This is likely a ZodError
          res.status(400).json({ message: fromZodError(error as any).message });
        } else {
          // Regular Error
          res.status(400).json({ message: error.message || "Invalid profile data" });
        }
      } else {
        // Unknown error
        res.status(500).json({ message: "An error occurred saving the financial profile" });
      }
    }
  });

  // --- Chat routes ---

  // Get chat history for a user
  router.get("/chat/:userId", async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.userId);
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;

      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }

      const messages = await storage.getChatMessages(userId, limit);
      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json({ message: "An error occurred retrieving chat messages" });
    }
  });

  // Post a new chat message
  router.post("/chat", async (req: Request, res: Response) => {
    try {
      const messageData = insertChatMessageSchema.parse(req.body);
      // Get the AI model type from the request (defaulting to Local if not specified)
      const modelType = (req.body.modelType as 'openai' | 'deepseek' | 'huggingface' | 'local') || 'local';

      // Get or create default user if none exists
      let user = await storage.getUser(messageData.userId);
      if (!user) {
        try {
          // Create a default user for chat - using password_hash as per the schema
          user = await storage.createUser({
            username: `guest_${messageData.userId}`,
            password: "guest_password", // This will be mapped to password_hash in PostgresStorage
            email: `guest_${messageData.userId}@example.com`
          });
        } catch (error) {
          console.error("Error creating user:", error);
          // If user creation fails, assume user exists and continue
          // This is a fallback mechanism if there's a schema mismatch
        }
      }

      // Save user message
      const savedMessage = await storage.createChatMessage(messageData);

      // Get previous chat messages for context (last 5 messages)
      const previousMessages = await storage.getChatMessages(messageData.userId, 5);
      const chatHistory: string[] = [];
      
      // Format previous messages for the AI (convert to pairs of user/assistant messages)
      previousMessages.forEach(msg => {
        chatHistory.push(msg.message);
      });
      
      let aiResponse: string;
      
      try {
        // Use the appropriate model based on the request
        console.log(`Generating response using ${modelType} model`);
        
        // Actually use the AI models instead of local fallback
        aiResponse = await generateFinanceResponse(
          messageData.message,
          chatHistory,
          modelType
        );
      } catch (error) {
        console.error(`Error with ${modelType} API:`, error);
        // Fall back to local response generator if the API call fails
        console.log(`Falling back to local response generator due to API error`);
        aiResponse = generateLocalFinanceResponse(messageData.message);
      }

      // Save AI response
      const aiMessage = await storage.createChatMessage({
        userId: messageData.userId,
        message: aiResponse,
        isUserMessage: 0
      });

      res.status(201).json({ userMessage: savedMessage, aiMessage });
    } catch (error) {
      // Check if it's a ZodError using a safer approach
      if (error instanceof Error) {
        if ('issues' in error && Array.isArray((error as any).issues)) {
          // This is likely a ZodError
          res.status(400).json({ message: fromZodError(error as any).message });
        } else {
          // Regular Error
          res.status(400).json({ message: error.message || "Invalid chat message data" });
        }
      } else {
        // Unknown error
        res.status(500).json({ message: "An error occurred saving the chat message" });
      }
    }
  });

  // --- Financial Goals routes ---

  // Get all goals for a user
  router.get("/goals/:userId", async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.userId);

      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }

      const goals = await storage.getFinancialGoals(userId);
      res.status(200).json(goals);
    } catch (error) {
      res.status(500).json({ message: "An error occurred retrieving financial goals" });
    }
  });

  // Create a new financial goal
  router.post("/goals", async (req: Request, res: Response) => {
    try {
      const goalData = insertFinancialGoalSchema.parse(req.body);

      // Check if user exists
      const user = await storage.getUser(goalData.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const newGoal = await storage.createFinancialGoal(goalData);
      res.status(201).json(newGoal);
    } catch (error) {
      // Check if it's a ZodError using a safer approach
      if (error instanceof Error) {
        if ('issues' in error && Array.isArray((error as any).issues)) {
          // This is likely a ZodError
          res.status(400).json({ message: fromZodError(error as any).message });
        } else {
          // Regular Error
          res.status(400).json({ message: error.message || "Invalid financial goal data" });
        }
      } else {
        // Unknown error
        res.status(500).json({ message: "An error occurred creating the financial goal" });
      }
    }
  });

  // Update a financial goal
  router.put("/goals/:id", async (req: Request, res: Response) => {
    try {
      const goalId = parseInt(req.params.id);

      if (isNaN(goalId)) {
        return res.status(400).json({ message: "Invalid goal ID" });
      }

      // Check if goal exists
      const existingGoal = await storage.getFinancialGoal(goalId);
      if (!existingGoal) {
        return res.status(404).json({ message: "Financial goal not found" });
      }

      // Update only provided fields
      const updatedGoal = await storage.updateFinancialGoal(goalId, req.body);
      res.status(200).json(updatedGoal);
    } catch (error) {
      res.status(500).json({ message: "An error occurred updating the financial goal" });
    }
  });

  // Delete a financial goal
  router.delete("/goals/:id", async (req: Request, res: Response) => {
    try {
      const goalId = parseInt(req.params.id);

      if (isNaN(goalId)) {
        return res.status(400).json({ message: "Invalid goal ID" });
      }

      // Check if goal exists
      const existingGoal = await storage.getFinancialGoal(goalId);
      if (!existingGoal) {
        return res.status(404).json({ message: "Financial goal not found" });
      }

      const deleted = await storage.deleteFinancialGoal(goalId);

      if (deleted) {
        res.status(204).send();
      } else {
        res.status(500).json({ message: "Failed to delete the financial goal" });
      }
    } catch (error) {
      res.status(500).json({ message: "An error occurred deleting the financial goal" });
    }
  });

  // Calculate budget recommendations
  router.post("/calculate/budget", (req: Request, res: Response) => {
    try {
      const { monthlyIncome, housingExpense, transportExpense, foodExpense, otherExpenses } = req.body;

      if (!monthlyIncome || isNaN(parseFloat(monthlyIncome))) {
        return res.status(400).json({ message: "Valid monthly income is required" });
      }

      const income = parseFloat(monthlyIncome);
      const housing = parseFloat(housingExpense) || 0;
      const transport = parseFloat(transportExpense) || 0;
      const food = parseFloat(foodExpense) || 0;
      const other = parseFloat(otherExpenses) || 0;

      const totalExpenses = housing + transport + food + other;
      const remaining = income - totalExpenses;

      // Calculate recommended allocations
      const emergencyFund = remaining * 0.5;
      const retirement = remaining * 0.3;
      const shortTermSavings = remaining * 0.2;

      // Calculate percentages for chart
      const housingPercent = (housing / income) * 100;
      const transportPercent = (transport / income) * 100;
      const foodPercent = (food / income) * 100;
      const otherPercent = (other / income) * 100;
      const remainingPercent = (remaining / income) * 100;

      res.status(200).json({
        income,
        totalExpenses,
        remaining,
        recommendations: {
          emergencyFund,
          retirement,
          shortTermSavings
        },
        chartData: {
          housingPercent,
          transportPercent,
          foodPercent,
          otherPercent,
          remainingPercent
        }
      });
    } catch (error) {
      res.status(500).json({ message: "An error occurred calculating budget recommendations" });
    }
  });

  // Calculate investment growth
  router.post("/calculate/investment", (req: Request, res: Response) => {
    try {
      const { initialInvestment, monthlyContribution, years, annualReturn } = req.body;

      if (!initialInvestment || !monthlyContribution || !years || !annualReturn) {
        return res.status(400).json({ message: "All investment parameters are required" });
      }

      const initial = parseFloat(initialInvestment);
      const monthly = parseFloat(monthlyContribution);
      const timeYears = parseInt(years);
      const returnRate = parseFloat(annualReturn) / 100; // Convert percentage to decimal

      // Calculate compound interest with monthly contributions
      // Future Value = P(1 + r)^n + PMT * ((1 + r)^n - 1) / r
      // Where P = initial principal, r = monthly interest rate, n = number of months, PMT = monthly contribution

      const monthlyRate = returnRate / 12;
      const months = timeYears * 12;

      const futureValue = 
        initial * Math.pow(1 + monthlyRate, months) + 
        monthly * (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate;

      const totalContributions = initial + (monthly * months);
      const interestEarned = futureValue - totalContributions;

      // Calculate growth data for each year for the chart
      const yearlyData = [];
      for (let year = 0; year <= timeYears; year++) {
        const currentMonths = year * 12;
        const currentValue = 
          initial * Math.pow(1 + monthlyRate, currentMonths) + 
          monthly * (Math.pow(1 + monthlyRate, currentMonths) - 1) / monthlyRate;

        yearlyData.push({
          year,
          value: currentValue.toFixed(2)
        });
      }

      // Calculate impact of increased contribution
      const increasedContribution = monthly + 50;
      const increasedFutureValue = 
        initial * Math.pow(1 + monthlyRate, months) + 
        increasedContribution * (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate;

      const contributionImpact = increasedFutureValue - futureValue;

      res.status(200).json({
        initialInvestment: initial,
        totalContributions,
        interestEarned,
        finalBalance: futureValue,
        yearlyData,
        insights: {
          contributionImpact,
          interestPercentage: (interestEarned / futureValue) * 100,
        }
      });
    } catch (error) {
      res.status(500).json({ message: "An error occurred calculating investment growth" });
    }
  });

  // --- Stock Market Data routes ---
  
  // Get stock quote
  router.get("/stocks/quote/:symbol", async (req: Request, res: Response) => {
    try {
      const symbol = req.params.symbol.toUpperCase();
      
      if (!symbol) {
        return res.status(400).json({ message: "Stock symbol is required" });
      }
      
      const stockQuote = await getStockQuote(symbol);
      res.status(200).json(stockQuote);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message || "Invalid stock symbol" });
      } else {
        res.status(500).json({ message: "An error occurred fetching stock data" });
      }
    }
  });
  
  // Get historical stock data
  router.get("/stocks/history/:symbol", async (req: Request, res: Response) => {
    try {
      const symbol = req.params.symbol.toUpperCase();
      const outputSize = (req.query.outputSize as 'compact' | 'full') || 'compact';
      
      if (!symbol) {
        return res.status(400).json({ message: "Stock symbol is required" });
      }
      
      const historicalData = await getHistoricalData(symbol, outputSize);
      res.status(200).json(historicalData);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message || "Invalid request" });
      } else {
        res.status(500).json({ message: "An error occurred fetching historical stock data" });
      }
    }
  });
  
  // Search for stocks
  router.get("/stocks/search", async (req: Request, res: Response) => {
    try {
      const keywords = req.query.keywords as string;
      
      if (!keywords) {
        return res.status(400).json({ message: "Search keywords are required" });
      }
      
      const searchResults = await searchStocks(keywords);
      res.status(200).json(searchResults);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message || "Invalid search request" });
      } else {
        res.status(500).json({ message: "An error occurred searching for stocks" });
      }
    }
  });
  
  // Get company overview
  router.get("/stocks/company/:symbol", async (req: Request, res: Response) => {
    try {
      const symbol = req.params.symbol.toUpperCase();
      
      if (!symbol) {
        return res.status(400).json({ message: "Stock symbol is required" });
      }
      
      const companyData = await getCompanyOverview(symbol);
      res.status(200).json(companyData);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message || "Invalid company request" });
      } else {
        res.status(500).json({ message: "An error occurred fetching company data" });
      }
    }
  });

  app.use("/api", router);

  const httpServer = createServer(app);

  return httpServer;
}

// Simple function to generate AI responses based on the user's message
function generateAIResponse(userMessage: string): string {
  const lowerCaseMessage = userMessage.toLowerCase();

  // Investment related query
  if (lowerCaseMessage.includes("invest") || lowerCaseMessage.includes("stock") || lowerCaseMessage.includes("bond") || lowerCaseMessage.includes("fund")) {
    return "Thanks for your question about investing! Before recommending specific investments, I'd like to understand your overall financial situation better:\n\n1. Do you have an emergency fund with 3-6 months of expenses?\n2. Do you have any high-interest debt that should be paid off first?\n3. What are your investment goals (retirement, house down payment, etc.)?\n4. What's your risk tolerance and time horizon?\n\nWith this information, I can provide more personalized investment advice.";
  }

  // Debt related query
  else if (lowerCaseMessage.includes("debt") || lowerCaseMessage.includes("credit") || lowerCaseMessage.includes("loan")) {
    return "Regarding debt management, here are some key strategies that could help:\n\n- List all your debts with their interest rates and minimum payments\n- Consider the debt avalanche method (paying highest interest first) to minimize interest costs\n- Look into balance transfer options for high-interest credit cards\n- Maintain on-time payments to improve your credit score\n\nCould you share what types of debt you're dealing with and their approximate amounts and interest rates?";
  }

  // Budget related query
  else if (lowerCaseMessage.includes("budget") || lowerCaseMessage.includes("spend") || lowerCaseMessage.includes("save")) {
    return "Creating an effective budget is the foundation of financial success! Here are some steps to get started:\n\n1. Track all your income and expenses for a month\n2. Categorize your spending (housing, food, transport, etc.)\n3. Look for areas where you can cut back\n4. Set specific saving goals\n5. Use the 50/30/20 rule as a guideline: 50% for needs, 30% for wants, and 20% for savings/debt repayment\n\nWhat's your biggest challenge when it comes to budgeting?";
  }

  // Retirement related query
  else if (lowerCaseMessage.includes("retire") || lowerCaseMessage.includes("401k") || lowerCaseMessage.includes("ira")) {
    return "Planning for retirement is crucial for long-term financial security. Here are some key considerations:\n\n1. Start saving early to benefit from compound growth\n2. Take advantage of tax-advantaged accounts like 401(k)s and IRAs\n3. If your employer offers a match, contribute at least enough to get the full match\n4. Diversify your investments based on your age and risk tolerance\n5. Regularly review and adjust your retirement strategy\n\nAt what age do you hope to retire, and have you started saving yet?";
  }

  // Generic response for other queries
  else {
    return "Thank you for your question! To provide the most helpful advice, could you share a bit more about your specific financial situation and goals? This will help me tailor my response to your needs.";
  }
}