import OpenAI from 'openai';
import * as dotenv from 'dotenv';
import axios from 'axios';

// Load environment variables
dotenv.config();

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Deepseek API endpoint
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';

// AI model configuration
export type AIModel = 'openai' | 'deepseek' | 'huggingface' | 'local';

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
 * @param model The AI model to use (local, openai, deepseek, or huggingface)
 * @returns AI-generated response
 */
export async function generateFinanceResponse(
  userMessage: string, 
  chatHistory: string[] = [],
  model: AIModel = 'local'
): Promise<string> {
  // If model is explicitly set to local or if it's a simple greeting/short message,
  // use the local response generator directly without trying external APIs
  if (model === 'local' || 
      userMessage.toLowerCase().match(/^(hi|hello|hey|howdy|greetings)(\s|$|[!?.,])/)) {
    return generateLocalFinanceResponse(userMessage);
  }
  
  try {
    // Use the appropriate model based on the parameter
    if (model === 'deepseek') {
      return await generateDeepseekResponse(userMessage, chatHistory);
    } else if (model === 'huggingface') {
      return await generateHuggingFaceResponse(userMessage, chatHistory);
    } else if (model === 'openai') {
      return await generateOpenAIResponse(userMessage, chatHistory);
    } else {
      // Default to local response generator
      return generateLocalFinanceResponse(userMessage);
    }
  } catch (error) {
    console.error("Error generating AI response:", error);
    
    // Always fall back to the local response generator when APIs fail
    console.log("Falling back to local response generator");
    return generateLocalFinanceResponse(userMessage);
  }
}

/**
 * Generate a response using OpenAI
 * @param userMessage The user's finance-related question
 * @param chatHistory Previous messages for context
 * @returns AI-generated response
 */
async function generateOpenAIResponse(userMessage: string, chatHistory: string[] = []): Promise<string> {
  // Default fallback response if API call fails
  let response = "I'm having trouble connecting to my knowledge base right now. Please try again in a moment.";
  
  if (!process.env.OPENAI_API_KEY) {
    return "API key not configured. Please set the OPENAI_API_KEY environment variable.";
  }

  // Format chat history for the API
  type MessageRole = 'system' | 'user' | 'assistant';
  const messages: Array<{role: MessageRole, content: string}> = [
    { role: 'system', content: SYSTEM_PROMPT },
  ];
  
  // Add chat history if available
  if (chatHistory.length > 0) {
    for (let i = 0; i < chatHistory.length; i += 2) {
      if (i < chatHistory.length) {
        messages.push({ role: 'user', content: chatHistory[i] });
      }
      if (i + 1 < chatHistory.length) {
        messages.push({ role: 'assistant', content: chatHistory[i + 1] });
      }
    }
  }
  
  // Add the current user message
  messages.push({ role: 'user', content: userMessage });

  // Make API request with type assertion to avoid type errors
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: messages as any,
    max_tokens: 500,
    temperature: 0.7,
  });

  // Extract and return the generated response
  if (completion.choices && completion.choices.length > 0) {
    response = completion.choices[0].message.content || response;
  }

  return response;
}

/**
 * Generate a response using Deepseek API
 * @param userMessage The user's finance-related question
 * @param chatHistory Previous messages for context
 * @returns AI-generated response
 */
async function generateDeepseekResponse(userMessage: string, chatHistory: string[] = []): Promise<string> {
  // Default fallback response if API call fails
  let response = "I'm having trouble connecting to my knowledge base right now. Please try again in a moment.";
  
  if (!process.env.DEEPSEEK_API_KEY) {
    return "Deepseek API key not configured. Please set the DEEPSEEK_API_KEY environment variable.";
  }

  // Format messages for Deepseek API
  const messages = [];
  
  // Add system message
  messages.push({ role: "system", content: SYSTEM_PROMPT });
  
  // Add chat history if available
  if (chatHistory.length > 0) {
    for (let i = 0; i < chatHistory.length; i += 2) {
      if (i < chatHistory.length) {
        messages.push({ role: "user", content: chatHistory[i] });
      }
      if (i + 1 < chatHistory.length) {
        messages.push({ role: "assistant", content: chatHistory[i + 1] });
      }
    }
  }
  
  // Add the current user message
  messages.push({ role: "user", content: userMessage });

  try {
    // Make API request to Deepseek
    const deepseekResponse = await axios.post(
      DEEPSEEK_API_URL,
      {
        model: "deepseek-chat", // Using Deepseek's basic model
        messages: messages,
        temperature: 0.7,
        max_tokens: 500,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.DEEPSEEK_API_KEY}`,
        },
      }
    );

    // Extract the response content
    if (deepseekResponse.data && 
        deepseekResponse.data.choices && 
        deepseekResponse.data.choices.length > 0 &&
        deepseekResponse.data.choices[0].message) {
      response = deepseekResponse.data.choices[0].message.content || response;
    }
  } catch (error) {
    console.error("Error with Deepseek API:", error);
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(`Deepseek API error: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
    } else {
      throw error;
    }
  }

  return response;
}

/**
 * Generate a response using HuggingFace's free Inference API - no API key needed
 * @param userMessage The user's finance-related question
 * @param chatHistory Previous messages for context
 * @returns AI-generated response
 */
async function generateHuggingFaceResponse(userMessage: string, chatHistory: string[] = []): Promise<string> {
  // Default fallback response if API call fails
  let response = "I'm having trouble connecting to my knowledge base right now. Please try again in a moment.";
  
  // Create context from chat history and current message
  let context = "";
  
  if (chatHistory.length > 0) {
    for (let i = 0; i < chatHistory.length; i++) {
      const role = i % 2 === 0 ? "User" : "AI";
      context += `${role}: ${chatHistory[i]}\n`;
    }
  }
  
  // Build prompt for the financial advisor
  const prompt = `${SYSTEM_PROMPT}

${context ? context + "\n" : ""}User: ${userMessage}

AI:`;

  try {
    // Make API request to HuggingFace Inference API
    // Using a model that works with the free endpoint without authentication
    const huggingFaceResponse = await axios.post(
      "https://api-inference.huggingface.co/models/Xenova/LaMini-GPT-124M",
      {
        inputs: prompt,
        parameters: {
          max_new_tokens: 500,
          temperature: 0.7,
          top_p: 0.95,
          do_sample: true,
          return_full_text: false
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (huggingFaceResponse.data && typeof huggingFaceResponse.data === 'string') {
      // Remove the prompt part from the response and extract just the AI's answer
      const generatedText = huggingFaceResponse.data;
      // Use [\s\S] instead of . with s flag for better compatibility
      const aiResponseMatch = generatedText.match(/AI:([\s\S]*?)(?:User:|$)/);
      response = aiResponseMatch ? aiResponseMatch[1].trim() : generatedText;
    } else if (Array.isArray(huggingFaceResponse.data) && huggingFaceResponse.data.length > 0) {
      // Extract generated text from array response format
      const generatedText = huggingFaceResponse.data[0]?.generated_text || "";
      // Use [\s\S] instead of . with s flag for better compatibility
      const aiResponseMatch = generatedText.match(/AI:([\s\S]*?)(?:User:|$)/);
      response = aiResponseMatch ? aiResponseMatch[1].trim() : generatedText;
    } else if (huggingFaceResponse.data?.generated_text) {
      // Handle alternate response format
      const generatedText = huggingFaceResponse.data.generated_text;
      // Use [\s\S] instead of . with s flag for better compatibility
      const aiResponseMatch = generatedText.match(/AI:([\s\S]*?)(?:User:|$)/);
      response = aiResponseMatch ? aiResponseMatch[1].trim() : generatedText;
    }
  } catch (error) {
    console.error("Error with HuggingFace API:", error);
    if (axios.isAxiosError(error) && error.response) {
      // If the error suggests the model is loading, let the user know
      if (error.response.status === 503 && error.response.data?.error?.includes("Loading")) {
        return "The AI model is currently loading. This is a free service and might take a moment to initialize. Please try again in a few seconds.";
      }
      throw new Error(`HuggingFace API error: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
    } else {
      throw error;
    }
  }

  return response;
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
    return "Creating a solid budget is the foundation of financial success! Here's how to get started:\n\n1. Track all income and expenses for at least a month\n2. Categorize your spending (housing, food, transportation, etc.)\n3. Follow the 50/30/20 rule: allocate 50% for needs, 30% for wants, and 20% for savings and debt repayment\n4. Use budgeting apps or spreadsheets to automate tracking\n5. Review and adjust your budget monthly\n\nThe key to successful budgeting is consistency and regular reviews. What specific aspect of budgeting are you struggling with?";
  }
  
  // Saving-related questions
  if (message.includes("save") || message.includes("saving") || message.includes("emergency fund") || message.includes("emergency")) {
    return "Building savings is critical for financial security. Here's my advice:\n\n1. Start with an emergency fund covering 3-6 months of essential expenses\n2. Keep your emergency fund in a high-yield savings account for easy access\n3. Set up automatic transfers on payday to make saving effortless\n4. Create specific savings goals with deadlines (vacation, down payment, etc.)\n5. Once your emergency fund is complete, direct savings toward other financial goals\n\nRemember: Even small, consistent contributions add up significantly over time thanks to compound interest.";
  }
  
  // Debt-related questions
  if (message.includes("debt") || message.includes("loan") || message.includes("credit card") || message.includes("mortgage") || message.includes("student loan")) {
    return "Managing debt effectively is crucial for your financial health. Here's a step-by-step approach:\n\n1. List all debts with their interest rates, minimum payments, and balances\n2. Consider these two popular payoff strategies:\n   - Debt Avalanche: Focus on highest-interest debt first (saves the most money)\n   - Debt Snowball: Pay off smallest balances first (provides psychological wins)\n3. Always pay more than the minimum payment when possible\n4. Consider balance transfers or debt consolidation for high-interest debt\n5. Avoid taking on new debt while paying off existing obligations\n\nWhat types of debt are you currently dealing with? I can provide more specific advice based on your situation.";
  }
  
  // Investment-related questions
  if (message.includes("invest") || message.includes("stock") || message.includes("bond") || message.includes("retirement") || message.includes("401k") || message.includes("ira")) {
    return "Investing is how you build wealth long-term. Here are key principles to get started:\n\n1. Before investing, ensure you have an emergency fund and have addressed high-interest debt\n2. Take advantage of employer-matched retirement accounts like 401(k)s first\n3. Consider tax-advantaged accounts like Roth or Traditional IRAs\n4. For most people, low-cost index funds provide appropriate diversification\n5. Set an asset allocation based on your risk tolerance and time horizon\n6. Invest regularly regardless of market conditions (dollar-cost averaging)\n\nRemember that investing is for long-term goals, typically 5+ years. Short-term needs should be kept in savings accounts.";
  }
  
  // Real estate or home buying
  if (message.includes("house") || message.includes("home") || message.includes("mortgage") || message.includes("property") || message.includes("real estate")) {
    return "Buying a home is one of the biggest financial decisions you'll make. Here's guidance:\n\n1. Save for a down payment of at least 20% to avoid PMI (private mortgage insurance)\n2. Get pre-approved for a mortgage before house hunting\n3. Budget for total housing costs (mortgage, property taxes, insurance, maintenance)\n4. The general rule is that housing shouldn't exceed 28% of your gross income\n5. Consider additional costs like closing costs, moving expenses, and new furniture\n6. Think about how long you plan to stay in the home - buying usually makes sense if you'll stay 5+ years\n\nAre you currently saving for a home or already in the process of buying?";
  }
  
  // Credit score questions
  if (message.includes("credit score") || message.includes("credit report") || message.includes("credit history") || message.includes("fico")) {
    return "Your credit score has a huge impact on your financial options. Here's how to maintain a healthy score:\n\n1. Pay all bills on time - payment history is 35% of your FICO score\n2. Keep credit utilization below 30% of available credit (lower is better)\n3. Don't close old credit accounts - length of credit history matters\n4. Limit applications for new credit to avoid hard inquiries\n5. Regularly check your credit reports for errors at annualcreditreport.com\n\nScore ranges: 300-579 (Poor), 580-669 (Fair), 670-739 (Good), 740-799 (Very Good), 800-850 (Excellent). Most lenders consider 740+ to be excellent.";
  }
  
  // Tax planning
  if (message.includes("tax") || message.includes("taxes") || message.includes("deduction") || message.includes("write-off") || message.includes("irs")) {
    return "Tax planning can save you significant money. Consider these strategies:\n\n1. Maximize tax-advantaged accounts like 401(k)s, IRAs, and HSAs\n2. Keep track of deductible expenses throughout the year\n3. Consider bunching itemized deductions in certain years\n4. Harvest investment losses to offset gains\n5. Contribute to a 529 plan for education expenses\n\nRemember that tax laws change frequently, so consult with a tax professional for personalized advice based on your specific situation.";
  }
  
  // Retirement planning
  if (message.includes("retire") || message.includes("retirement") || message.includes("401k") || message.includes("ira") || message.includes("pension")) {
    return "Planning for retirement is essential for long-term financial security. Here's how to prepare:\n\n1. Start saving as early as possible to benefit from compound growth\n2. Aim to save 15% of your income for retirement (including employer matches)\n3. Maximize tax-advantaged accounts in this order:\n   - 401(k) or 403(b) up to employer match\n   - HSA if eligible (triple tax advantage)\n   - Roth IRA or Traditional IRA\n   - Remainder in 401(k) or taxable accounts\n4. Adjust your asset allocation to become more conservative as you approach retirement\n5. Consider working with a fee-only financial advisor for personalized retirement planning\n\nThe 4% rule suggests you can withdraw 4% of your retirement savings annually with minimal risk of running out of money over a 30-year retirement.";
  }
  
  // Insurance questions
  if (message.includes("insurance") || message.includes("insure") || message.includes("coverage") || message.includes("policy") || message.includes("premium")) {
    return "Insurance protects your financial future from catastrophic events. Here are key types to consider:\n\n1. Health insurance - Essential for everyone to avoid medical bankruptcy\n2. Auto insurance - Required by law in most places\n3. Home/renters insurance - Protects your dwelling and possessions\n4. Life insurance - Important if others depend on your income\n5. Disability insurance - Replaces income if you can't work\n6. Umbrella policy - Provides additional liability protection\n\nFocus on high-deductible policies that protect against financial disasters, not small expenses you could cover from your emergency fund.";
  }
  
  // Financial independence / FIRE
  if (message.includes("financial independence") || message.includes("early retirement") || message.includes("fire movement") || message.includes("financial freedom")) {
    return "The FIRE (Financial Independence, Retire Early) movement focuses on aggressive saving and investing to achieve financial freedom sooner. Core principles include:\n\n1. Increase your savings rate dramatically (often 50-70% of income)\n2. Reduce expenses by embracing frugality and minimalism\n3. Invest in low-cost index funds for long-term growth\n4. Build passive income streams through investments\n5. Use the 4% rule to determine your FIRE number (25x annual expenses)\n\nThere are different FIRE approaches: Lean FIRE (extreme frugality), Fat FIRE (higher spending level), and Barista FIRE (part-time work with partial financial independence). Which approach interests you most?";
  }
  
  // Student loans
  if (message.includes("student loan") || message.includes("college debt") || message.includes("education loan") || message.includes("student debt")) {
    return "Managing student loan debt requires a strategic approach:\n\n1. Know your loans - federal vs private, interest rates, terms\n2. Explore repayment options for federal loans (income-driven, extended plans)\n3. Consider refinancing private loans if you can qualify for lower rates\n4. Look into loan forgiveness programs if you work in public service\n5. Make extra payments toward higher-interest loans when possible\n6. Stay informed about policy changes that might affect student loan repayment\n\nFederal loans offer more protections and flexible repayment options than private loans, so consider this carefully before refinancing federal loans.";
  }
  
  // Side hustles or additional income
  if (message.includes("side hustle") || message.includes("extra income") || message.includes("passive income") || message.includes("earn more")) {
    return "Increasing your income can accelerate your financial goals. Consider these options:\n\n1. Freelancing in your professional field\n2. Sharing economy (Uber, Airbnb, etc.)\n3. Online marketplaces for skills (teaching, writing, design)\n4. Creating digital products (courses, ebooks, printables)\n5. Monetizing a hobby or passion project\n\nWhen evaluating side hustles, consider the time commitment, upfront costs, and potential return. The best side hustle aligns with your skills and interests while fitting into your schedule.";
  }
  
  // Personal financial planning
  if (message.includes("plan") || message.includes("goals") || message.includes("financial plan") || message.includes("roadmap")) {
    return "Creating a personal financial plan is essential for achieving your goals. Here's how to get started:\n\n1. Define your financial goals (short-term, medium-term, and long-term)\n2. Assess your current financial situation (income, expenses, assets, liabilities)\n3. Create a budget that aligns with your goals\n4. Build an emergency fund (3-6 months of expenses)\n5. Pay off high-interest debt\n6. Save for retirement through tax-advantaged accounts\n7. Invest according to your timeline and risk tolerance\n8. Review and adjust your plan regularly\n\nA comprehensive financial plan serves as your roadmap to financial security and should evolve as your life circumstances change.";
  }

  // Cryptocurrency/blockchain questions
  if (message.includes("crypto") || message.includes("bitcoin") || message.includes("ethereum") || message.includes("blockchain") || message.includes("nft")) {
    return "Cryptocurrencies are highly volatile investments that should only be considered as a small portion of a well-diversified portfolio. Here's what to know:\n\n1. Only invest money you can afford to lose completely\n2. Consider cryptocurrencies as speculative, high-risk investments\n3. Research thoroughly before investing (tokenomics, use cases, team)\n4. Use reputable exchanges with strong security measures\n5. Consider storage options carefully (hot wallets vs. cold storage)\n6. Be aware of tax implications of crypto transactions\n\nCryptocurrencies are still an emerging asset class with significant regulatory uncertainty. They should typically represent no more than 5% of your investment portfolio, if any.";
  }

  // Economic concerns (inflation, recession)
  if (message.includes("inflation") || message.includes("recession") || message.includes("economy") || message.includes("economic")) {
    return "Economic conditions like inflation and recessions affect your finances in important ways. Here's how to prepare:\n\n1. During inflation:\n   - Focus on increasing your income\n   - Invest in assets that historically outpace inflation (stocks, real estate)\n   - Consider I-bonds or TIPS for inflation-protected savings\n   - Review your budget regularly as prices increase\n\n2. During recessions:\n   - Build a larger emergency fund (6-12 months of expenses)\n   - Secure multiple income streams if possible\n   - Reduce discretionary spending\n   - Avoid taking on new debt\n   - Continue investing regularly (dollar-cost averaging)\n\nRemember that economic cycles are normal. A diversified financial plan should account for both good and challenging economic conditions.";
  }

  // Children/family financial planning
  if (message.includes("child") || message.includes("children") || message.includes("kid") || message.includes("college") || message.includes("education fund") || message.includes("529")) {
    return "Financial planning for children and education requires early preparation. Consider these strategies:\n\n1. Education funding options:\n   - 529 College Savings Plans (tax-advantaged growth for education)\n   - Coverdell Education Savings Accounts (for K-12 and college expenses)\n   - UTMA/UGMA custodial accounts (more flexible but less tax advantages)\n   - Roth IRAs (can be used for education without penalty)\n\n2. When to start: As early as possible, ideally when your child is born\n\n3. How much to save: Target at least 1/3 of expected college costs\n\n4. Beyond education:\n   - Consider life insurance to protect your family\n   - Create or update your will and guardianship arrangements\n   - Teach children about money management from an early age\n\nRemember that while education is important, prioritize your retirement savings first. Your children can borrow for college, but you can't borrow for retirement.";
  }

  // Career and income growth
  if (message.includes("career") || message.includes("salary") || message.includes("income") || message.includes("negotiate") || message.includes("raise") || message.includes("promotion")) {
    return "Growing your income is one of the most powerful ways to improve your finances. Consider these strategies:\n\n1. In your current job:\n   - Document your achievements and value-add metrics\n   - Research market rates for your position and experience level\n   - Prepare for performance reviews with specific accomplishments\n   - Request additional responsibilities that can lead to advancement\n\n2. Career development:\n   - Invest in skills that are in high demand in your industry\n   - Build your professional network both inside and outside your company\n   - Consider certifications or additional education if ROI is positive\n   - Look for lateral moves that open new career paths\n\n3. Negotiation tips:\n   - Focus on your value rather than your needs\n   - Practice your pitch and anticipate objections\n   - Consider the entire compensation package, not just salary\n   - Be willing to walk away if necessary\n\nRemember that job-hopping strategically (every 2-4 years) often results in larger income increases than staying with one employer long-term.";
  }

  // Generic response for other questions
  return "Thank you for your question! As your financial assistant, I can provide guidance on budgeting, saving, investing, debt management, retirement planning, and many other personal finance topics. To give you the most helpful advice, could you provide a bit more detail about your specific situation or what you're trying to achieve financially?";
}