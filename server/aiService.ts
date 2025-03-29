import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// AI model configuration
export type AIModel = 'local';

// System prompt for financial advisor role
const SYSTEM_PROMPT = `
You are FinanceGuru, a knowledgeable financial advisor specialized in personal finance.
Provide helpful, accurate, and actionable advice on:
- Budgeting and expense management
- Debt management and reduction strategies
- Saving and investing fundamentals
- Retirement planning
- Tax optimization
- Financial goal setting

Keep responses concise, practical, and tailored to the user's situation.
Answer with concrete examples and specific recommendations when possible.
If you don't know something or aren't qualified to give specific advice on complex matters,
acknowledge your limitations and suggest consulting a certified financial professional.
`;

/**
 * Generate a response to a user's finance question using the specified AI model
 * @param userMessage The user's finance-related question or message
 * @param chatHistory Previous messages for context (optional)
 * @param model The AI model to use (local)
 * @returns AI-generated response
 */
export async function generateFinanceResponse(
  userMessage: string, 
  chatHistory: string[] = [],
  model: AIModel = 'local'
): Promise<string> {
  // If model is explicitly set to local or if it's a simple greeting/short message,
  // use the local response generator directly without trying external APIs
  return generateLocalFinanceResponse(userMessage);
}

/**
 * Enhanced fallback function that returns detailed responses for common financial questions
 * Uses keyword matching to provide relevant financial advice without requiring external APIs
 * @param userMessage User's question
 * @returns Detailed response based on keywords in the question
 */
export function generateLocalFinanceResponse(userMessage: string): string {
  const message = userMessage.toLowerCase();
  
  // Greeting or introduction
  if (message.includes("hi") || message.includes("hello") || message.includes("hey") || message.length < 5) {
    return "Hello! I'm FinanceGuru, your personal finance assistant. I can help you with budgeting, investing, debt management, and achieving your financial goals. How can I assist you today?";
  }
  
  // Budget-related questions
  if (message.includes("budget") || message.includes("spending") || message.includes("expenses") || message.includes("track")) {
    return "Creating a solid budget is the foundation of financial success! Here's how to get started:\n\n1. Track all income and expenses for at least a month\n2. Categorize your spending (housing, food, transportation, etc.)\n3. Identify areas to reduce expenses\n4. Set realistic spending limits for each category\n5. Review and adjust your budget regularly to stay on track.";
  }
  
  // Saving-related questions
  if (message.includes("save") || message.includes("saving") || message.includes("emergency fund") || message.includes("emergency")) {
    return "Building savings is critical for financial security. Here's my advice:\n\n1. Start with an emergency fund covering 3-6 months of essential expenses\n2. Keep your emergency fund in a high-yield savings account\n3. Automate your savings to make it easier\n4. Set specific savings goals (e.g., vacation, home down payment)\n5. Review and adjust your savings plan regularly.";
  }
  
  // Debt-related questions
  if (message.includes("debt") || message.includes("loan") || message.includes("credit card") || message.includes("mortgage") || message.includes("student loan")) {
    return "Managing debt effectively is crucial for your financial health. Here's a step-by-step approach:\n\n1. List all debts with their interest rates, minimum payments, and balances\n2. Consider the debt avalanche (highest interest rate first) or debt snowball (smallest balance first) method\n3. Make extra payments towards the chosen debt while maintaining minimum payments on others\n4. Avoid taking on new debt while paying off existing debt\n5. Consider consolidating high-interest debts to lower your overall interest rate.";
  }
  
  // Investment-related questions
  if (message.includes("invest") || message.includes("stock") || message.includes("bond") || message.includes("retirement") || message.includes("401k") || message.includes("ira")) {
    return "Investing is how you build wealth long-term. Here are key principles to get started:\n\n1. Before investing, ensure you have an emergency fund and have addressed high-interest debt\n2. Diversify your investments to spread risk\n3. Consider low-cost index funds or ETFs\n4. Invest consistently over time, regardless of market conditions\n5. Review and adjust your investment portfolio periodically.";
  }
  
  // Real estate or home buying
  if (message.includes("house") || message.includes("home") || message.includes("mortgage") || message.includes("property") || message.includes("real estate")) {
    return "Buying a home is one of the biggest financial decisions you'll make. Here's guidance:\n\n1. Save for a down payment of at least 20% to avoid PMI (private mortgage insurance)\n2. Get pre-approved for a mortgage to understand your budget\n3. Consider the total cost of homeownership (maintenance, property taxes, insurance)\n4. Work with a reputable real estate agent\n5. Have the property inspected before finalizing the purchase.";
  }
  
  // Credit score questions
  if (message.includes("credit score") || message.includes("credit report") || message.includes("credit history") || message.includes("fico")) {
    return "Your credit score has a huge impact on your financial options. Here's how to maintain a healthy score:\n\n1. Pay all bills on time - payment history is 35% of your FICO score\n2. Keep credit card balances low relative to credit limits\n3. Avoid opening new credit accounts frequently\n4. Check your credit report regularly for errors\n5. Maintain a mix of credit types (credit cards, installment loans, etc.).";
  }
  
  // Tax planning
  if (message.includes("tax") || message.includes("taxes") || message.includes("deduction") || message.includes("write-off") || message.includes("irs")) {
    return "Tax planning can save you significant money. Consider these strategies:\n\n1. Maximize tax-advantaged accounts like 401(k)s, IRAs, and HSAs\n2. Keep track of deductible expenses throughout the year\n3. Consider tax loss harvesting to offset capital gains\n4. Stay informed about tax law changes\n5. Consult a tax professional for personalized advice.";
  }
  
  // Retirement planning
  if (message.includes("retire") || message.includes("retirement") || message.includes("401k") || message.includes("ira") || message.includes("pension")) {
    return "Planning for retirement is essential for long-term financial security. Here's how to prepare:\n\n1. Start saving as early as possible to benefit from compound growth\n2. Aim to save 15% of your income for retirement\n3. Take advantage of employer-sponsored retirement plans and matching contributions\n4. Diversify your retirement investments\n5. Review and adjust your retirement plan regularly.";
  }
  
  // Insurance questions
  if (message.includes("insurance") || message.includes("insure") || message.includes("coverage") || message.includes("policy") || message.includes("premium")) {
    return "Insurance protects your financial future from catastrophic events. Here are key types to consider:\n\n1. Health insurance - Essential for everyone to avoid medical bankruptcy\n2. Auto insurance - Required in most states and protects against vehicle-related damages\n3. Homeowners or renters insurance - Protects your property and belongings\n4. Life insurance - Provides financial support for your dependents\n5. Disability insurance - Replaces a portion of your income if you're unable to work.";
  }
  
  // Financial independence / FIRE
  if (message.includes("financial independence") || message.includes("early retirement") || message.includes("fire movement") || message.includes("financial freedom")) {
    return "The FIRE (Financial Independence, Retire Early) movement focuses on aggressive saving and investing to achieve financial freedom sooner. Core principles include:\n\n1. Increase your savings rate by reducing expenses and increasing income\n2. Invest in a diversified portfolio to grow your wealth\n3. Aim to save at least 50% of your income\n4. Track your progress towards financial independence\n5. Plan for sustainable withdrawal rates during early retirement.";
  }
  
  // Student loans
  if (message.includes("student loan") || message.includes("college debt") || message.includes("education loan") || message.includes("student debt")) {
    return "Managing student loan debt requires a strategic approach:\n\n1. Know your loans - federal vs private, interest rates, terms\n2. Explore repayment options for federal loans (income-driven repayment, public service loan forgiveness)\n3. Consider refinancing private loans to lower interest rates\n4. Make extra payments towards high-interest loans\n5. Stay informed about changes in student loan policies.";
  }
  
  // Side hustles or additional income
  if (message.includes("side hustle") || message.includes("extra income") || message.includes("passive income") || message.includes("earn more")) {
    return "Increasing your income can accelerate your financial goals. Consider these options:\n\n1. Freelancing in your professional field\n2. Sharing economy (Uber, Airbnb, etc.)\n3. Online marketplaces (Etsy, eBay, etc.)\n4. Part-time or seasonal jobs\n5. Creating passive income streams (investment income, rental properties, etc.).";
  }
  
  // Personal financial planning
  if (message.includes("plan") || message.includes("goals") || message.includes("financial plan") || message.includes("roadmap")) {
    return "Creating a personal financial plan is essential for achieving your goals. Here's how to get started:\n\n1. Define your financial goals (short-term, medium-term, and long-term)\n2. Assess your current financial situation (income, expenses, assets, liabilities)\n3. Create a budget to manage your cash flow\n4. Develop a savings and investment strategy\n5. Monitor your progress and adjust your plan as needed.";
  }

  // Cryptocurrency/blockchain questions
  if (message.includes("crypto") || message.includes("bitcoin") || message.includes("ethereum") || message.includes("blockchain") || message.includes("nft")) {
    return "Cryptocurrencies are highly volatile investments that should only be considered as a small portion of a well-diversified portfolio. Here's what to know:\n\n1. Only invest money you can afford to lose\n2. Research and understand the technology and market\n3. Be aware of security risks and store your assets safely\n4. Monitor regulations and legal considerations\n5. Diversify within the crypto market to spread risk.";
  }

  // Economic concerns (inflation, recession)
  if (message.includes("inflation") || message.includes("recession") || message.includes("economy") || message.includes("economic")) {
    return "Economic conditions like inflation and recessions affect your financial planning. Here are strategies to consider:\n\n1. Maintain a diversified investment portfolio\n2. Keep an emergency fund for unexpected expenses\n3. Focus on reducing high-interest debt\n4. Consider inflation-protected securities (e.g., TIPS)\n5. Stay informed about economic trends and adjust your financial plan accordingly.";
  }

  // Default response for unrecognized queries
  return "I'm here to help with your personal finance questions. Please provide more details or ask about specific topics like budgeting, investing, debt management, or financial planning.";
}
