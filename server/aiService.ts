import * as dotenv from 'dotenv';
import axios from 'axios';

// Load environment variables
dotenv.config();

// Deepseek API endpoint
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';

// AI model configuration
export type AIModel = 'deepseek' | 'huggingface' | 'local';

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
 * @param model The AI model to use (local, deepseek, or huggingface)
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
    return "Creating a solid budget is the foundation of financial success! Here's how to get started:\n\n1. Track all income and expenses for at least a month\n2. Categorize your spending (housing, food, entertainment, etc.)\n3. Identify areas to reduce expenses\n4. Set savings goals and allocate funds accordingly\n5. Review and adjust your budget regularly to stay on track.";
  }
  
  // Saving-related questions
  if (message.includes("save") || message.includes("saving") || message.includes("emergency fund") || message.includes("emergency")) {
    return "Building savings is critical for financial security. Here's my advice:\n\n1. Start with an emergency fund covering 3-6 months of essential expenses\n2. Keep your emergency fund in a high-yield savings account\n3. Set specific savings goals (e.g., vacation, down payment, education)\n4. Automate savings to make it easier to stick to your goals\n5. Regularly review and adjust your savings plan.";
  }
  
  // Debt-related questions
  if (message.includes("debt") || message.includes("loan") || message.includes("credit card") || message.includes("mortgage") || message.includes("student loan")) {
    return "Managing debt effectively is crucial for your financial health. Here's a step-by-step approach:\n\n1. List all debts with their interest rates, minimum payments, and balances\n2. Consider debt consolidation if it lowers your interest rates and simplifies payments\n3. Prioritize paying off high-interest debt first (e.g., credit cards)\n4. Make at least the minimum payments on all debts to avoid penalties\n5. Develop a repayment plan and stick to it.";
  }
  
  // Investment-related questions
  if (message.includes("invest") || message.includes("stock") || message.includes("bond") || message.includes("retirement") || message.includes("401k") || message.includes("ira")) {
    return "Investing is how you build wealth long-term. Here are key principles to get started:\n\n1. Before investing, ensure you have an emergency fund and have addressed high-interest debt\n2. Take advantage of employer-sponsored retirement plans (e.g., 401(k)) and match contributions if offered\n3. Diversify your investments to spread risk (e.g., stocks, bonds, real estate)\n4. Consider low-cost index funds or ETFs for broad market exposure\n5. Review and adjust your investment strategy as your financial goals and risk tolerance change.";
  }
  
  // Real estate or home buying
  if (message.includes("house") || message.includes("home") || message.includes("mortgage") || message.includes("property") || message.includes("real estate")) {
    return "Buying a home is one of the biggest financial decisions you'll make. Here's guidance:\n\n1. Save for a down payment of at least 20% to avoid PMI (private mortgage insurance)\n2. Get pre-approved for a mortgage to understand your budget\n3. Research different mortgage options (fixed-rate, adjustable-rate, etc.)\n4. Consider additional costs (closing costs, property taxes, insurance, maintenance)\n5. Work with a reputable real estate agent to find the right property.";
  }
  
  // Credit score questions
  if (message.includes("credit score") || message.includes("credit report") || message.includes("credit history") || message.includes("fico")) {
    return "Your credit score has a huge impact on your financial options. Here's how to maintain a healthy score:\n\n1. Pay all bills on time - payment history is 35% of your FICO score\n2. Keep credit card balances low relative to their limits (aim for under 30%)\n3. Avoid opening too many new credit accounts in a short period\n4. Regularly check your credit report for errors and dispute any inaccuracies\n5. Use a mix of credit types responsibly (credit cards, installment loans, etc.).";
  }
  
  // Tax planning
  if (message.includes("tax") || message.includes("taxes") || message.includes("deduction") || message.includes("write-off") || message.includes("irs")) {
    return "Tax planning can save you significant money. Consider these strategies:\n\n1. Maximize tax-advantaged accounts like 401(k)s, IRAs, and HSAs\n2. Keep track of deductible expenses throughout the year (e.g., charitable donations, medical expenses)\n3. Take advantage of tax credits (e.g., Earned Income Tax Credit, Child Tax Credit)\n4. Consider the timing of income and expenses to minimize tax liability\n5. Consult a tax professional for personalized advice and to ensure compliance.";
  }
  
  // Retirement planning
  if (message.includes("retire") || message.includes("retirement") || message.includes("401k") || message.includes("ira") || message.includes("pension")) {
    return "Planning for retirement is essential for long-term financial security. Here's how to prepare:\n\n1. Start saving as early as possible to benefit from compound growth\n2. Aim to save 15% of your income for retirement\n3. Take advantage of tax-advantaged retirement accounts (401(k), IRA, Roth IRA)\n4. Diversify your retirement investments to manage risk\n5. Regularly review and adjust your retirement plan to stay on track with your goals.";
  }
  
  // Insurance questions
  if (message.includes("insurance") || message.includes("insure") || message.includes("coverage") || message.includes("policy") || message.includes("premium")) {
    return "Insurance protects your financial future from catastrophic events. Here are key types to consider:\n\n1. Health insurance - Essential for everyone to avoid medical bankruptcy\n2. Auto insurance - Required by law and protects against vehicle-related damages and liability\n3. Homeowners or renters insurance - Protects your property and personal belongings\n4. Life insurance - Provides financial support to your dependents in the event of your passing\n5. Disability insurance - Replaces lost income if you're unable to work due to illness or injury.";
  }
  
  // Financial independence / FIRE
  if (message.includes("financial independence") || message.includes("early retirement") || message.includes("fire movement") || message.includes("financial freedom")) {
    return "The FIRE (Financial Independence, Retire Early) movement focuses on aggressive saving and investing to achieve financial freedom sooner. Core principles include:\n\n1. Increase your savings rate by reducing expenses and increasing income\n2. Invest in low-cost, diversified index funds or ETFs\n3. Avoid lifestyle inflation and keep living expenses low\n4. Aim to save and invest 50-70% of your income\n5. Plan for healthcare, housing, and other expenses in early retirement.";
  }
  
  // Student loans
  if (message.includes("student loan") || message.includes("college debt") || message.includes("education loan") || message.includes("student debt")) {
    return "Managing student loan debt requires a strategic approach:\n\n1. Know your loans - federal vs private, interest rates, terms\n2. Explore repayment options for federal loans (income-driven, standard, graduated)\n3. Consider refinancing private loans to lower interest rates\n4. Make extra payments towards principal when possible\n5. Stay informed about potential loan forgiveness programs.";
  }
  
  // Side hustles or additional income
  if (message.includes("side hustle") || message.includes("extra income") || message.includes("passive income") || message.includes("earn more")) {
    return "Increasing your income can accelerate your financial goals. Consider these options:\n\n1. Freelancing in your professional field\n2. Sharing economy (Uber, Airbnb, etc.)\n3. Online marketplaces (Etsy, eBay, Amazon)\n4. Investing in dividend-paying stocks or rental properties\n5. Creating content (blogging, podcasting, YouTube).";
  }
  
  // Personal financial planning
  if (message.includes("plan") || message.includes("goals") || message.includes("financial plan") || message.includes("roadmap")) {
    return "Creating a personal financial plan is essential for achieving your goals. Here's how to get started:\n\n1. Define your financial goals (short-term, medium-term, and long-term)\n2. Assess your current financial situation (income, expenses, assets, liabilities)\n3. Create a budget that aligns with your goals\n4. Develop a savings and investment strategy\n5. Review and adjust your plan regularly to stay on track.";
  }

  // Cryptocurrency/blockchain questions
  if (message.includes("crypto") || message.includes("bitcoin") || message.includes("ethereum") || message.includes("blockchain") || message.includes("nft")) {
    return "Cryptocurrencies are highly volatile investments that should only be considered as a small portion of a well-diversified portfolio. Here's what to know:\n\n1. Only invest money you can afford to lose\n2. Diversify within the crypto space (e.g., Bitcoin, Ethereum)\n3. Stay informed about regulatory changes and market trends\n4. Use secure wallets and exchanges to protect your assets\n5. Consider the tax implications of crypto transactions.";
  }

  // Economic concerns (inflation, recession)
  if (message.includes("inflation") || message.includes("recession") || message.includes("economy") || message.includes("economic")) {
    return "Economic conditions like inflation and recessions affect
