import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  BookOpenIcon, 
  ArrowUpIcon, 
  BarChart4Icon,
  HomeIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  PercentIcon,
  BanknoteIcon,
  HeartIcon
} from "lucide-react";
import { useState } from "react";

export default function Education() {
  const topics = [
    {
      id: "investing",
      title: "Investing Basics",
      icon: "savings",
      color: "text-blue-600",
      iconBg: "bg-blue-100",
    },
    {
      id: "retirement",
      title: "Retirement Planning",
      icon: "account_balance",
      color: "text-green-600",
      iconBg: "bg-green-100",
    },
    {
      id: "credit",
      title: "Credit & Debt Management",
      icon: "credit_card",
      color: "text-orange-600",
      iconBg: "bg-orange-100",
    },
    {
      id: "taxes",
      title: "Tax Strategies",
      icon: "request_quote",
      color: "text-purple-600",
      iconBg: "bg-purple-100",
    },
    {
      id: "insurance",
      title: "Insurance Basics",
      icon: "health_and_safety",
      color: "text-red-600",
      iconBg: "bg-red-100",
    },
    {
      id: "homebuying",
      title: "Home Buying Guide",
      icon: "home",
      color: "text-indigo-600",
      iconBg: "bg-indigo-100",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-800 mb-2">Financial Education</h1>
        <p className="text-neutral-600">Expand your financial knowledge with our educational resources</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {topics.map((topic) => (
          <Card 
            key={topic.id} 
            className="transition-all hover:shadow-md"
          >
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className={`w-12 h-12 rounded-lg ${topic.iconBg} flex items-center justify-center mr-4`}>
                  <span className={`material-icons ${topic.color}`}>{topic.icon}</span>
                </div>
                <h3 className="text-lg font-semibold">{topic.title}</h3>
              </div>
              <a 
                href={`#${topic.id}`} 
                className={`${topic.color} hover:underline font-medium flex items-center`}
              >
                Explore topic
                <span className="material-icons text-sm ml-1">arrow_forward</span>
              </a>
            </CardContent>
          </Card>
        ))}
      </div>

      <div id="investing" className="mb-16 scroll-mt-16">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mr-4">
            <span className="material-icons text-blue-600">savings</span>
          </div>
          <h2 className="text-2xl font-bold text-neutral-800">Investing Basics</h2>
        </div>

        <Tabs defaultValue="intro" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="intro">Introduction</TabsTrigger>
            <TabsTrigger value="types">Investment Types</TabsTrigger>
            <TabsTrigger value="risk">Risk & Return</TabsTrigger>
            <TabsTrigger value="strategy">Getting Started</TabsTrigger>
          </TabsList>
          
          <TabsContent value="intro">
            <Card>
              <CardContent className="p-6 prose max-w-none">
                <h3>What is Investing?</h3>
                <p>
                  Investing is the act of allocating resources, usually money, with the expectation of generating income or profit over time. Unlike saving, which involves putting money aside for future use with minimal risk, investing involves some level of risk in pursuit of potential returns.
                </p>
                
                <h3>Why Invest?</h3>
                <p>
                  The primary reasons to invest include:
                </p>
                <ul>
                  <li><strong>Growing wealth:</strong> Investments typically offer higher returns than savings accounts, allowing your money to grow faster over time.</li>
                  <li><strong>Beating inflation:</strong> The cost of goods and services tends to rise over time. Investments help your money maintain and increase its purchasing power.</li>
                  <li><strong>Achieving financial goals:</strong> Whether it's retirement, buying a home, or funding education, investing can help you reach these significant financial milestones.</li>
                  <li><strong>Creating passive income:</strong> Many investments generate regular income without requiring constant work.</li>
                </ul>
                
                <h3>The Power of Compound Interest</h3>
                <p>
                  Albert Einstein reportedly called compound interest "the eighth wonder of the world." Compound interest occurs when you earn interest not just on your initial investment, but also on the interest already accumulated. This creates a snowball effect that can significantly increase your wealth over time.
                </p>
                <p>
                  For example, $10,000 invested at a 7% annual return would grow to approximately $76,123 after 30 years, even without adding any additional money. This demonstrates why starting to invest early is so beneficial.
                </p>
                
                <div className="bg-blue-50 p-4 rounded-md border border-blue-100 my-6">
                  <h4 className="text-blue-800 font-medium flex items-center mb-2">
                    <span className="material-icons mr-1 text-blue-600">lightbulb</span>
                    Key Insight
                  </h4>
                  <p className="text-blue-700 mb-0">
                    Time in the market beats timing the market. The longer your money is invested, the more opportunity it has to grow and weather market fluctuations.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="types">
            <Card>
              <CardContent className="p-6 prose max-w-none">
                <h3>Common Investment Types</h3>
                
                <h4>Stocks (Equities)</h4>
                <p>
                  When you buy a stock, you purchase a share of ownership in a company. Stocks can provide returns through:
                </p>
                <ul>
                  <li><strong>Price appreciation:</strong> The value of your shares increases</li>
                  <li><strong>Dividends:</strong> Regular payments of company profits to shareholders</li>
                </ul>
                <p>
                  Stocks generally offer higher potential returns but come with higher volatility and risk.
                </p>
                
                <h4>Bonds (Fixed Income)</h4>
                <p>
                  Bonds are essentially loans to companies or governments. When you buy a bond, you're lending money to the issuer in exchange for regular interest payments and the return of the principal when the bond matures.
                </p>
                <p>
                  Bonds typically offer more stable, predictable returns than stocks but with lower long-term growth potential.
                </p>
                
                <h4>Mutual Funds and ETFs</h4>
                <p>
                  These investment vehicles pool money from many investors to purchase a diversified portfolio of stocks, bonds, or other securities.
                </p>
                <ul>
                  <li><strong>Mutual funds</strong> are typically bought and sold at the end of the trading day at a price based on the fund's net asset value (NAV).</li>
                  <li><strong>Exchange-Traded Funds (ETFs)</strong> trade throughout the day like individual stocks and often have lower expense ratios than mutual funds.</li>
                </ul>
                <p>
                  Both provide instant diversification and professional management, making them excellent choices for beginners.
                </p>
                
                <h4>Real Estate</h4>
                <p>
                  Real estate investments can include:
                </p>
                <ul>
                  <li>Physical property (residential or commercial)</li>
                  <li>Real Estate Investment Trusts (REITs)</li>
                  <li>Real estate crowdfunding platforms</li>
                </ul>
                <p>
                  Real estate can provide both appreciation and income through rent or lease payments.
                </p>
                
                <h4>Cash Equivalents</h4>
                <p>
                  These are low-risk, highly liquid investments such as:
                </p>
                <ul>
                  <li>Money market funds</li>
                  <li>Certificates of deposit (CDs)</li>
                  <li>Treasury bills</li>
                </ul>
                <p>
                  While they offer minimal risk, they typically provide returns that barely keep pace with inflation.
                </p>
                
                <div className="bg-blue-50 p-4 rounded-md border border-blue-100 my-6">
                  <h4 className="text-blue-800 font-medium flex items-center mb-2">
                    <span className="material-icons mr-1 text-blue-600">tips_and_updates</span>
                    Pro Tip
                  </h4>
                  <p className="text-blue-700 mb-0">
                    For most beginning investors, a low-cost index fund that tracks a broad market index (like the S&P 500) is an excellent place to start. It provides instant diversification, low fees, and has historically provided solid returns over the long term.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="risk">
            <Card>
              <CardContent className="p-6 prose max-w-none">
                <h3>Understanding Risk and Return</h3>
                
                <p>
                  In investing, risk and return are closely related. Generally, investments with higher potential returns come with higher risk of losses. Understanding this relationship is crucial for building a portfolio that matches your financial goals and risk tolerance.
                </p>
                
                <h4>Types of Investment Risk</h4>
                <ul>
                  <li><strong>Market risk:</strong> The possibility that investments will decline due to market factors like economic downturns or political events</li>
                  <li><strong>Inflation risk:</strong> The chance that your investment returns won't keep pace with inflation, reducing your purchasing power</li>
                  <li><strong>Liquidity risk:</strong> The risk of not being able to sell an investment quickly without significant loss</li>
                  <li><strong>Concentration risk:</strong> The danger of having too much exposure to a single investment or sector</li>
                  <li><strong>Interest rate risk:</strong> The potential for investments (especially bonds) to decrease in value when interest rates rise</li>
                </ul>
                
                <h4>Risk Tolerance</h4>
                <p>
                  Your risk tolerance depends on several factors:
                </p>
                <ul>
                  <li><strong>Time horizon:</strong> Generally, the longer your investment timeframe, the more risk you can afford to take</li>
                  <li><strong>Financial situation:</strong> Your income stability, emergency savings, and overall financial health</li>
                  <li><strong>Psychological comfort:</strong> Your emotional ability to handle market volatility without making impulsive decisions</li>
                </ul>
                
                <h4>Managing Risk Through Diversification</h4>
                <p>
                  Diversification is the practice of spreading your investments across various asset classes, sectors, and geographic regions to reduce risk. The core principle is that not all investments perform well or poorly at the same time, so having a mix can help smooth out returns.
                </p>
                
                <p>
                  Effective diversification might include:
                </p>
                <ul>
                  <li>Different asset classes (stocks, bonds, real estate)</li>
                  <li>Various sectors (technology, healthcare, financial services)</li>
                  <li>Domestic and international markets</li>
                  <li>Companies of different sizes (large-cap, mid-cap, small-cap)</li>
                </ul>
                
                <div className="bg-amber-50 p-4 rounded-md border border-amber-100 my-6">
                  <h4 className="text-amber-800 font-medium flex items-center mb-2">
                    <span className="material-icons mr-1 text-amber-600">warning</span>
                    Important Note
                  </h4>
                  <p className="text-amber-700 mb-0">
                    While diversification can reduce risk, it cannot eliminate it entirely. All investments carry some level of risk, and even a well-diversified portfolio will experience ups and downs.
                  </p>
                </div>
                
                <h4>The Risk-Return Spectrum</h4>
                <p>
                  Different investments fall along a spectrum of risk and potential return:
                </p>
                <ul>
                  <li><strong>Lower risk, lower return:</strong> Cash, CDs, Treasury bonds</li>
                  <li><strong>Medium risk, medium return:</strong> Corporate bonds, balanced mutual funds, blue-chip stocks</li>
                  <li><strong>Higher risk, higher potential return:</strong> Small-cap stocks, international stocks, sector-specific investments, cryptocurrencies</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="strategy">
            <Card>
              <CardContent className="p-6 prose max-w-none">
                <h3>Getting Started with Investing</h3>
                
                <h4>Step 1: Establish Your Financial Foundation</h4>
                <p>
                  Before investing, ensure you have:
                </p>
                <ul>
                  <li>An emergency fund covering 3-6 months of expenses</li>
                  <li>Paid off high-interest debt (especially credit cards)</li>
                  <li>Clear financial goals with specific timeframes</li>
                </ul>
                
                <h4>Step 2: Determine Your Asset Allocation</h4>
                <p>
                  Based on your goals, time horizon, and risk tolerance, decide how to divide your investments among different asset classes.
                </p>
                <p>
                  A common starting point is the "100 minus your age" rule for stock allocation. For example, if you're 30 years old, you might consider allocating roughly 70% to stocks and 30% to bonds. However, this is just a guideline and should be adjusted based on your personal circumstances.
                </p>
                
                <h4>Step 3: Choose an Investment Account</h4>
                <ul>
                  <li><strong>Retirement accounts:</strong> 401(k), 403(b), IRA, or Roth IRA offer tax advantages but may have restrictions on withdrawals</li>
                  <li><strong>Taxable brokerage accounts:</strong> More flexible but lack tax advantages</li>
                  <li><strong>Robo-advisors:</strong> Automated platforms that create and manage a diversified portfolio based on your goals</li>
                </ul>
                
                <h4>Step 4: Select Your Investments</h4>
                <p>
                  For most beginners, these options provide excellent starting points:
                </p>
                <ul>
                  <li><strong>Index funds:</strong> Passively managed funds that track market indexes (like S&P 500)</li>
                  <li><strong>ETFs:</strong> Similar to index funds but trade like stocks throughout the day</li>
                  <li><strong>Target-date funds:</strong> Automatically adjust asset allocation based on your target retirement date</li>
                </ul>
                
                <h4>Step 5: Implement a Regular Investment Strategy</h4>
                <p>
                  Consider using dollar-cost averaging by investing a fixed amount regularly, regardless of market conditions. This strategy:
                </p>
                <ul>
                  <li>Reduces the impact of market volatility</li>
                  <li>Removes the emotional aspect of trying to time the market</li>
                  <li>Creates a disciplined approach to building wealth</li>
                </ul>
                
                <h4>Step 6: Monitor and Rebalance</h4>
                <p>
                  Review your portfolio periodically (semi-annually or annually) and rebalance if necessary to maintain your target asset allocation. Avoid checking too frequently, as this can lead to emotional decision-making based on short-term market movements.
                </p>
                
                <div className="bg-green-50 p-4 rounded-md border border-green-100 my-6">
                  <h4 className="text-green-800 font-medium flex items-center mb-2">
                    <span className="material-icons mr-1 text-green-600">check_circle</span>
                    Getting Started Checklist
                  </h4>
                  <ul className="text-green-700 mb-0 pl-5 list-disc">
                    <li>Establish emergency fund</li>
                    <li>Pay off high-interest debt</li>
                    <li>Determine investment goals and time horizon</li>
                    <li>Open an appropriate investment account</li>
                    <li>Set up automatic contributions</li>
                    <li>Start with broad-based index funds or ETFs</li>
                    <li>Schedule regular portfolio reviews</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <div id="retirement" className="mb-16 scroll-mt-16">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mr-4">
            <span className="material-icons text-green-600">account_balance</span>
          </div>
          <h2 className="text-2xl font-bold text-neutral-800">Retirement Planning</h2>
        </div>

        <Tabs defaultValue="basics" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="basics">Basics</TabsTrigger>
            <TabsTrigger value="accounts">Retirement Accounts</TabsTrigger>
            <TabsTrigger value="strategy">Planning Strategies</TabsTrigger>
            <TabsTrigger value="calculators">Calculators</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basics">
            <Card>
              <CardContent className="p-6 prose max-w-none">
                <h3>Why Plan for Retirement?</h3>
                <p>
                  Retirement planning is the process of determining retirement income goals and the actions needed to achieve those goals. The importance of retirement planning includes:
                </p>
                <ul>
                  <li><strong>Financial independence:</strong> Maintaining your lifestyle without relying on employment income</li>
                  <li><strong>Healthcare coverage:</strong> Preparing for increased medical expenses that typically come with aging</li>
                  <li><strong>Long-term security:</strong> Ensuring you don't outlive your savings</li>
                  <li><strong>Quality of life:</strong> Having the means to enjoy your retirement years</li>
                </ul>
                
                <h3>The Three Pillars of Retirement Income</h3>
                <ol>
                  <li>
                    <strong>Social Security:</strong> Government-provided benefits based on your work history and earnings.
                    <ul>
                      <li>Benefits can start as early as age 62, but are reduced compared to waiting until full retirement age (66-67 for most current workers)</li>
                      <li>Waiting until age 70 maximizes your monthly benefit</li>
                      <li>Typically replaces only about 40% of pre-retirement income for average earners</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Pension plans:</strong> Employer-sponsored retirement plans that provide guaranteed income.
                    <ul>
                      <li>Becoming less common in the private sector, but still prevalent in government and some industries</li>
                      <li>Defined benefit plans guarantee a specific payout based on salary and years of service</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Personal savings:</strong> Individual retirement accounts, employer-sponsored plans like 401(k)s, and other investments.
                    <ul>
                      <li>These have become the primary source of retirement income for most Americans</li>
                      <li>Include tax-advantaged accounts and personal investments</li>
                    </ul>
                  </li>
                </ol>
                
                <div className="bg-green-50 p-4 rounded-md border border-green-100 my-6">
                  <h4 className="text-green-800 font-medium flex items-center mb-2">
                    <span className="material-icons mr-1 text-green-600">lightbulb</span>
                    Key Insight
                  </h4>
                  <p className="text-green-700 mb-0">
                    The earlier you start saving for retirement, the more time your money has to grow through compound interest. Even small contributions in your 20s and 30s can grow significantly by retirement age.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="accounts">
            <Card>
              <CardContent className="p-6 prose max-w-none">
                <h3>Types of Retirement Accounts</h3>
                
                <h4>Employer-Sponsored Plans</h4>
                <ul>
                  <li>
                    <strong>401(k)/403(b)/457 Plans:</strong>
                    <ul>
                      <li>Employer-sponsored plans with high contribution limits ($23,000 in 2025, with an additional $7,500 catch-up contribution for those over 50)</li>
                      <li>Many employers offer matching contributions (essentially free money)</li>
                      <li>Traditional (pre-tax) or Roth (after-tax) options may be available</li>
                      <li>Limited investment options selected by the plan administrator</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Pension Plans (Defined Benefit):</strong>
                    <ul>
                      <li>Employer guarantees a specific benefit amount upon retirement</li>
                      <li>Benefit typically based on salary history and years of service</li>
                      <li>Less common today, but still available in some sectors</li>
                    </ul>
                  </li>
                </ul>
                
                <h4>Individual Retirement Accounts (IRAs)</h4>
                <ul>
                  <li>
                    <strong>Traditional IRA:</strong>
                    <ul>
                      <li>Tax-deductible contributions (income limits may apply if you have an employer plan)</li>
                      <li>Tax-deferred growth</li>
                      <li>Withdrawals taxed as ordinary income in retirement</li>
                      <li>Required Minimum Distributions (RMDs) starting at age 73</li>
                      <li>Contribution limit of $7,000 in 2025 ($8,000 if over 50)</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Roth IRA:</strong>
                    <ul>
                      <li>After-tax contributions (no immediate tax deduction)</li>
                      <li>Tax-free growth and withdrawals in retirement</li>
                      <li>No RMDs during the owner's lifetime</li>
                      <li>Income limits apply for eligibility</li>
                      <li>Same contribution limits as Traditional IRA</li>
                      <li>More flexible withdrawal options for contributions</li>
                    </ul>
                  </li>
                </ul>
                
                <h4>Self-Employed Retirement Options</h4>
                <ul>
                  <li>
                    <strong>SEP IRA:</strong>
                    <ul>
                      <li>Simple to set up and maintain</li>
                      <li>High contribution limits (up to 25% of compensation or $69,000 in 2025, whichever is less)</li>
                    </ul>
                  </li>
                  <li>
                    <strong>SIMPLE IRA:</strong>
                    <ul>
                      <li>Good for small businesses (fewer than 100 employees)</li>
                      <li>Contribution limit of $16,000 in 2025 ($19,500 if over 50)</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Solo 401(k):</strong>
                    <ul>
                      <li>For self-employed individuals with no employees (except a spouse)</li>
                      <li>Allows contributions as both employer and employee</li>
                      <li>Highest potential contribution limits among self-employed options</li>
                    </ul>
                  </li>
                </ul>
                
                <div className="bg-amber-50 p-4 rounded-md border border-amber-100 my-6">
                  <h4 className="text-amber-800 font-medium flex items-center mb-2">
                    <span className="material-icons mr-1 text-amber-600">warning</span>
                    Important Note
                  </h4>
                  <p className="text-amber-700 mb-0">
                    Early withdrawals from retirement accounts (before age 59½) generally incur a 10% penalty in addition to any applicable taxes, with certain exceptions for hardships, first-time home purchases, educational expenses, and other qualifying circumstances.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="strategy">
            <Card>
              <CardContent className="p-6 prose max-w-none">
                <h3>Retirement Planning Strategies</h3>
                
                <h4>Determining Your Retirement Needs</h4>
                <p>
                  A common rule of thumb is that you'll need 70-80% of your pre-retirement income to maintain your standard of living in retirement. Factors that influence this include:
                </p>
                <ul>
                  <li>Expected lifestyle in retirement (travel, hobbies, etc.)</li>
                  <li>Healthcare costs</li>
                  <li>Whether your mortgage will be paid off</li>
                  <li>Location and cost of living</li>
                  <li>Longevity (planning for a potentially long retirement)</li>
                </ul>
                
                <h4>Creating a Savings Strategy</h4>
                <ol>
                  <li><strong>Max out employer matches:</strong> Always contribute enough to get the full employer match in your 401(k) or similar plan—this is essentially free money.</li>
                  <li><strong>Utilize tax advantages:</strong> Maximize contributions to tax-advantaged accounts before investing in taxable accounts.</li>
                  <li><strong>Prioritize accounts strategically:</strong> A common hierarchy:
                    <ol>
                      <li>401(k) or similar up to the match</li>
                      <li>HSA (if available and can be used for retirement)</li>
                      <li>Roth IRA or Traditional IRA</li>
                      <li>401(k) beyond the match</li>
                      <li>Taxable investments</li>
                    </ol>
                  </li>
                  <li><strong>Consider tax diversification:</strong> Having a mix of pre-tax, Roth, and taxable accounts gives you flexibility in retirement to manage your tax liability.</li>
                </ol>
                
                <h4>Adjusting Your Strategy Through Life Stages</h4>
                <ul>
                  <li>
                    <strong>Early Career (20s-30s):</strong>
                    <ul>
                      <li>Focus on establishing the habit of saving</li>
                      <li>More aggressive asset allocation (higher stock percentage)</li>
                      <li>Take advantage of long time horizon</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Mid-Career (40s-50s):</strong>
                    <ul>
                      <li>Ramp up savings rate as income increases</li>
                      <li>Begin to moderate investment risk</li>
                      <li>Catch-up contributions if behind</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Pre-Retirement (5-10 years before retirement):</strong>
                    <ul>
                      <li>Fine-tune retirement budget and timeline</li>
                      <li>Further adjust asset allocation to protect against market downturns</li>
                      <li>Consider meeting with a financial advisor for retirement-specific planning</li>
                    </ul>
                  </li>
                </ul>
                
                <div className="bg-green-50 p-4 rounded-md border border-green-100 my-6">
                  <h4 className="text-green-800 font-medium flex items-center mb-2">
                    <span className="material-icons mr-1 text-green-600">tips_and_updates</span>
                    Pro Tip
                  </h4>
                  <p className="text-green-700 mb-0">
                    The "4% Rule" suggests that withdrawing 4% of your retirement portfolio in the first year, and then adjusting that amount for inflation in subsequent years, provides a high probability of not outliving your money over a 30-year retirement. While not perfect, it's a good starting point for determining how much you need to save.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="calculators">
            <Card>
              <CardContent className="p-6 prose max-w-none">
                <h3>Retirement Calculators & Tools</h3>
                <p>
                  Retirement calculators help you estimate how much you need to save for retirement and whether you're on track to meet your goals. They typically account for factors such as:
                </p>
                <ul>
                  <li>Current age and planned retirement age</li>
                  <li>Current savings and monthly contributions</li>
                  <li>Expected investment returns</li>
                  <li>Inflation expectations</li>
                  <li>Social Security benefits</li>
                  <li>Desired retirement income</li>
                </ul>
                
                <h4>Recommended Retirement Planning Resources</h4>
                <ul>
                  <li><strong>Social Security Administration:</strong> Estimate your future benefits based on your actual earnings history.</li>
                  <li><strong>Financial institution calculators:</strong> Most major investment firms offer retirement calculators on their websites.</li>
                  <li><strong>Retirement planning worksheets:</strong> Tools to help you estimate expenses in retirement.</li>
                  <li><strong>Budget tracking apps:</strong> Help you identify areas where you can increase your savings rate.</li>
                </ul>
                
                <h4>Key Metrics to Track</h4>
                <ul>
                  <li><strong>Savings rate:</strong> The percentage of your income you're saving for retirement (aim for at least 15%).</li>
                  <li><strong>Total retirement assets:</strong> The combined value of all your retirement accounts and investments.</li>
                  <li><strong>Retirement income ratio:</strong> How much of your working income you'll be able to replace in retirement.</li>
                  <li><strong>Investment performance:</strong> How your investments are performing relative to appropriate benchmarks.</li>
                  <li><strong>Asset allocation:</strong> The mix of stocks, bonds, and other investments in your portfolio.</li>
                </ul>
                
                <div className="mt-6 p-6 border rounded-md bg-green-50">
                  <h4 className="font-semibold text-green-700">Simple Retirement Calculator</h4>
                  <p className="text-sm text-green-600 mb-4">
                    This is a basic calculator to estimate your retirement savings. For a more detailed analysis, consider using comprehensive financial planning tools.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-green-700">Current Age</label>
                      <input type="number" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50" placeholder="30" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-green-700">Retirement Age</label>
                      <input type="number" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50" placeholder="65" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-green-700">Current Savings ($)</label>
                      <input type="number" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50" placeholder="50000" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-green-700">Monthly Contribution ($)</label>
                      <input type="number" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50" placeholder="500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-green-700">Expected Annual Return (%)</label>
                      <input type="number" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50" placeholder="7" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-green-700">Inflation Rate (%)</label>
                      <input type="number" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50" placeholder="2.5" />
                    </div>
                  </div>
                  
                  <button className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                    Calculate Retirement Savings
                  </button>
                  
                  <div className="mt-4 p-4 bg-white rounded-md border border-green-200">
                    <p className="text-sm text-gray-500">Enter your information and click 'Calculate' to see your estimated retirement savings.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <div id="credit" className="mb-16 scroll-mt-16">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center mr-4">
            <span className="material-icons text-orange-600">credit_card</span>
          </div>
          <h2 className="text-2xl font-bold text-neutral-800">Credit & Debt Management</h2>
        </div>

        <Tabs defaultValue="credit" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="credit">Understanding Credit</TabsTrigger>
            <TabsTrigger value="debt">Debt Management</TabsTrigger>
            <TabsTrigger value="paydown">Debt Payoff Strategies</TabsTrigger>
            <TabsTrigger value="consolidation">Consolidation Options</TabsTrigger>
          </TabsList>
          
          <TabsContent value="credit">
            <Card>
              <CardContent className="p-6 prose max-w-none">
                <h3>Understanding Credit Scores</h3>
                <p>
                  A credit score is a number that represents your creditworthiness. It helps lenders determine the risk of lending money to you. In the United States, FICO® scores and VantageScore® are the most common, typically ranging from 300 to 850.
                </p>
                
                <h4>Components of a FICO® Score</h4>
                <ul>
                  <li><strong>Payment history (35%):</strong> Record of on-time payments</li>
                  <li><strong>Credit utilization (30%):</strong> Amount of available credit you're using</li>
                  <li><strong>Length of credit history (15%):</strong> Age of your accounts</li>
                  <li><strong>Credit mix (10%):</strong> Types of credit accounts you have</li>
                  <li><strong>New credit (10%):</strong> Recent applications for credit</li>
                </ul>
                
                <h4>Credit Score Ranges and What They Mean</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-red-50 p-3 rounded-md">
                    <div className="font-semibold text-red-700">Poor: 300-579</div>
                    <p className="text-sm text-red-600 m-0">
                      Difficult to get approved for credit; may require deposits or higher interest rates
                    </p>
                  </div>
                  <div className="bg-orange-50 p-3 rounded-md">
                    <div className="font-semibold text-orange-700">Fair: 580-669</div>
                    <p className="text-sm text-orange-600 m-0">
                      Below average; may qualify for some loans but with higher rates
                    </p>
                  </div>
                  <div className="bg-yellow-50 p-3 rounded-md">
                    <div className="font-semibold text-yellow-700">Good: 670-739</div>
                    <p className="text-sm text-yellow-600 m-0">
                      Near or slightly above average; eligible for many financial products
                    </p>
                  </div>
                  <div className="bg-lime-50 p-3 rounded-md">
                    <div className="font-semibold text-lime-700">Very Good: 740-799</div>
                    <p className="text-sm text-lime-600 m-0">
                      Above average; likely to receive favorable terms
                    </p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-md">
                    <div className="font-semibold text-green-700">Excellent: 800-850</div>
                    <p className="text-sm text-green-600 m-0">
                      Well above average; access to best rates and terms
                    </p>
                  </div>
                </div>
                
                <h4>How to Check Your Credit</h4>
                <p>
                  You're entitled to one free credit report every 12 months from each of the three major credit bureaus (Equifax, Experian, and TransUnion) at <a href="https://www.annualcreditreport.com" className="text-blue-600 hover:underline">AnnualCreditReport.com</a>. Many banks and credit card companies also offer free credit score access.
                </p>
                
                <h4>Improving Your Credit Score</h4>
                <ul>
                  <li><strong>Pay all bills on time:</strong> Payment history is the most important factor</li>
                  <li><strong>Reduce credit utilization:</strong> Aim to use less than 30% of your available credit</li>
                  <li><strong>Don't close old accounts:</strong> Length of credit history matters</li>
                  <li><strong>Limit hard inquiries:</strong> Only apply for new credit when necessary</li>
                  <li><strong>Dispute inaccuracies:</strong> Check your credit report for errors and dispute them</li>
                </ul>
                
                <div className="bg-orange-50 p-4 rounded-md border border-orange-100 my-6">
                  <h4 className="text-orange-800 font-medium flex items-center mb-2">
                    <span className="material-icons mr-1 text-orange-600">tips_and_updates</span>
                    Pro Tip
                  </h4>
                  <p className="text-orange-700 mb-0">
                    Set up automatic payments for at least the minimum amount due on all your bills to avoid late payments, which can significantly damage your credit score. Pay more than the minimum whenever possible.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="debt">
            <Card>
              <CardContent className="p-6 prose max-w-none">
                <h3>Types of Debt</h3>
                
                <h4>Good Debt vs. Bad Debt</h4>
                <p>
                  While all debt represents a financial obligation, some types of debt are generally considered more beneficial than others:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-green-50 p-4 rounded-md">
                    <h5 className="text-green-700 font-medium mb-2">Potentially Good Debt</h5>
                    <ul className="text-green-700 mb-0">
                      <li><strong>Mortgage:</strong> Helps build equity in an asset that may appreciate</li>
                      <li><strong>Student loans:</strong> Can increase earning potential over time</li>
                      <li><strong>Business loans:</strong> Can generate income and growth</li>
                      <li><strong>Investment property loans:</strong> Can provide rental income and appreciation</li>
                    </ul>
                  </div>
                  <div className="bg-red-50 p-4 rounded-md">
                    <h5 className="text-red-700 font-medium mb-2">Typically Problematic Debt</h5>
                    <ul className="text-red-700 mb-0">
                      <li><strong>High-interest credit cards:</strong> Often used for consumption, not investment</li>
                      <li><strong>Payday loans:</strong> Extremely high interest rates</li>
                      <li><strong>Auto loans:</strong> For depreciating assets</li>
                      <li><strong>Buy now, pay later:</strong> Can encourage impulse spending</li>
                    </ul>
                  </div>
                </div>
                
                <h4>Understanding Interest and Terms</h4>
                <ul>
                  <li><strong>Annual Percentage Rate (APR):</strong> The yearly cost of borrowing money, including interest and fees</li>
                  <li><strong>Fixed vs. variable interest:</strong> Fixed rates remain constant; variable rates can change based on market conditions</li>
                  <li><strong>Simple vs. compound interest:</strong> Simple interest is calculated only on the principal; compound interest is calculated on both principal and accumulated interest</li>
                  <li><strong>Term length:</strong> The time period to repay the loan; longer terms typically mean lower monthly payments but more interest paid overall</li>
                </ul>
                
                <h4>Warning Signs of Too Much Debt</h4>
                <ul>
                  <li>Using credit cards for basic necessities like groceries or utilities</li>
                  <li>Only making minimum payments on credit cards</li>
                  <li>Debt-to-income ratio above 36%</li>
                  <li>Borrowing from one source to pay another</li>
                  <li>Receiving collection calls or notices</li>
                  <li>Feeling stressed or anxious about your finances</li>
                </ul>
                
                <h4>Creating a Debt Inventory</h4>
                <p>
                  The first step in managing debt is to know exactly what you owe. Create a comprehensive list including:
                </p>
                <ul>
                  <li>Creditor name</li>
                  <li>Current balance</li>
                  <li>Interest rate</li>
                  <li>Minimum monthly payment</li>
                  <li>Payment due date</li>
                  <li>Expected payoff date</li>
                </ul>
                
                <div className="bg-amber-50 p-4 rounded-md border border-amber-100 my-6">
                  <h4 className="text-amber-800 font-medium flex items-center mb-2">
                    <span className="material-icons mr-1 text-amber-600">warning</span>
                    Important Note
                  </h4>
                  <p className="text-amber-700 mb-0">
                    Be wary of debt solutions that sound too good to be true. Many debt settlement companies charge high fees and can damage your credit. Always research thoroughly before working with any debt relief company.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="paydown">
            <Card>
              <CardContent className="p-6 prose max-w-none">
                <h3>Debt Payoff Strategies</h3>
                
                <h4>Debt Avalanche Method</h4>
                <p>
                  The debt avalanche method focuses on paying off debts in order of highest to lowest interest rate. This approach saves the most money in interest over time.
                </p>
                <ol>
                  <li>Make minimum payments on all debts</li>
                  <li>Put any extra money toward the debt with the highest interest rate</li>
                  <li>Once the highest-interest debt is paid off, direct that payment plus any extra funds to the next highest-interest debt</li>
                  <li>Continue until all debts are paid off</li>
                </ol>
                <p><strong>Best for:</strong> Those who want to minimize the total amount paid and are motivated by long-term financial optimization</p>
                
                <h4>Debt Snowball Method</h4>
                <p>
                  The debt snowball method focuses on paying off debts in order of smallest to largest balance, regardless of interest rate. This approach provides psychological wins as debts are eliminated faster.
                </p>
                <ol>
                  <li>Make minimum payments on all debts</li>
                  <li>Put any extra money toward the debt with the smallest balance</li>
                  <li>Once the smallest debt is paid off, direct that payment plus any extra funds to the next smallest debt</li>
                  <li>Continue until all debts are paid off</li>
                </ol>
                <p><strong>Best for:</strong> Those who need motivation from quick wins and seeing progress</p>
                
                <h4>Debt Snowflaking</h4>
                <p>
                  This supplementary strategy involves finding small amounts of money throughout your budget and applying them immediately to debt.
                </p>
                <ul>
                  <li>Income from side hustles or overtime</li>
                  <li>Savings from coupons or sales</li>
                  <li>Cash gifts or tax refunds</li>
                  <li>Money saved by reducing expenses</li>
                </ul>
                <p>
                  Each "snowflake" might seem small, but they can significantly accelerate your debt payoff when combined with either the avalanche or snowball method.
                </p>
                
                <h4>Balance Transfer Strategy</h4>
                <p>
                  If you have good credit, you might qualify for balance transfer credit cards offering 0% interest for an introductory period (typically 12-21 months).
                </p>
                <ul>
                  <li>Transfer high-interest debt to the 0% card</li>
                  <li>Aggressively pay down the balance during the 0% period</li>
                  <li>Be aware of balance transfer fees (typically 3-5% of the transferred amount)</li>
                  <li>Have a plan for any remaining balance after the promotional period</li>
                </ul>
                
                <div className="bg-orange-50 p-4 rounded-md border border-orange-100 my-6">
                  <h4 className="text-orange-800 font-medium flex items-center mb-2">
                    <span className="material-icons mr-1 text-orange-600">lightbulb</span>
                    Key Insight
                  </h4>
                  <p className="text-orange-700 mb-0">
                    Paying an extra $100 per month on a $10,000 credit card balance with 18% interest would save you $3,539 in interest and help you pay off the debt 28 months sooner compared to making only minimum payments.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="consolidation">
            <Card>
              <CardContent className="p-6 prose max-w-none">
                <h3>Debt Consolidation Options</h3>
                <p>
                  Debt consolidation involves combining multiple debts into a single loan or payment, often with a lower interest rate or more favorable terms.
                </p>
                
                <h4>Debt Consolidation Loans</h4>
                <p>
                  Personal loans used to pay off multiple debts, leaving you with one fixed monthly payment.
                </p>
                <ul>
                  <li><strong>Pros:</strong> Fixed interest rate, structured repayment plan, potential for lower interest rates compared to credit cards</li>
                  <li><strong>Cons:</strong> May require good credit to qualify for favorable rates, might include origination fees</li>
                  <li><strong>Best for:</strong> Those with good credit and multiple high-interest debts</li>
                </ul>
                
                <h4>Home Equity Loans or Lines of Credit</h4>
                <p>
                  Using the equity in your home to secure a loan or line of credit to pay off other debts.
                </p>
                <ul>
                  <li><strong>Pros:</strong> Lower interest rates than unsecured loans, potential tax deductibility of interest</li>
                  <li><strong>Cons:</strong> Risk of foreclosure if you can't make payments, closing costs and fees, using a long-term loan to pay off short-term debt</li>
                  <li><strong>Best for:</strong> Homeowners with significant equity and disciplined repayment habits</li>
                </ul>
                
                <h4>Balance Transfer Credit Cards</h4>
                <p>
                  Credit cards that offer low or 0% APR for an introductory period on transferred balances.
                </p>
                <ul>
                  <li><strong>Pros:</strong> Can save significant interest during the promotional period</li>
                  <li><strong>Cons:</strong> Usually charge balance transfer fees (3-5%), higher rates after the promotional period, typically require good to excellent credit</li>
                  <li><strong>Best for:</strong> Those who can pay off the debt during the promotional period</li>
                </ul>
                
                <h4>401(k) Loans</h4>
                <p>
                  Borrowing from your retirement account to pay off debt.
                </p>
                <ul>
                  <li><strong>Pros:</strong> No credit check, relatively low interest rates, interest paid goes back into your account</li>
                  <li><strong>Cons:</strong> Potential tax consequences and penalties if you leave your job, opportunity cost of missing potential investment growth, reduced retirement savings</li>
                  <li><strong>Best for:</strong> A last resort after exploring other options</li>
                </ul>
                
                <h4>Debt Management Plans</h4>
                <p>
                  Programs offered by nonprofit credit counseling agencies that may negotiate lower interest rates and payments with creditors.
                </p>
                <ul>
                  <li><strong>Pros:</strong> Single monthly payment, potentially lower interest rates, help with budgeting</li>
                  <li><strong>Cons:</strong> May involve fees, typically takes 3-5 years to complete, may require closing credit accounts</li>
                  <li><strong>Best for:</strong> Those struggling to make minimum payments but not yet in severe financial hardship</li>
                </ul>
                
                <div className="bg-amber-50 p-4 rounded-md border border-amber-100 my-6">
                  <h4 className="text-amber-800 font-medium flex items-center mb-2">
                    <span className="material-icons mr-1 text-amber-600">warning</span>
                    Important Consideration
                  </h4>
                  <p className="text-amber-700 mb-0">
                    Consolidating debt doesn't reduce what you owe—it restructures it. Without addressing the spending habits that led to debt, you might find yourself accumulating new debt alongside your consolidation loan.
                  </p>
                </div>
                
                <h4>Debt Consolidation Calculator</h4>
                <div className="mt-4 p-6 border rounded-md bg-orange-50">
                  <h5 className="font-semibold text-orange-700 mb-3">Compare Your Options</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-orange-700">Total Debt Amount ($)</label>
                      <input type="number" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50" placeholder="10000" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-orange-700">Current Average APR (%)</label>
                      <input type="number" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50" placeholder="18" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-orange-700">Consolidation Loan APR (%)</label>
                      <input type="number" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50" placeholder="9" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-orange-700">Loan Term (months)</label>
                      <input type="number" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50" placeholder="48" />
                    </div>
                  </div>
                  
                  <button className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                    Calculate Potential Savings
                  </button>
                  
                  <div className="mt-4 p-4 bg-white rounded-md border border-orange-200">
                    <p className="text-sm text-gray-500">Enter your information and click 'Calculate' to see how much you could save with debt consolidation.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <div id="taxes" className="mb-16 scroll-mt-16">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mr-4">
            <span className="material-icons text-purple-600">request_quote</span>
          </div>
          <h2 className="text-2xl font-bold text-neutral-800">Tax Strategies</h2>
        </div>

        <Tabs defaultValue="basics" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="basics">Tax Basics</TabsTrigger>
            <TabsTrigger value="deductions">Deductions & Credits</TabsTrigger>
            <TabsTrigger value="retirement">Retirement Tax Planning</TabsTrigger>
            <TabsTrigger value="investments">Investment Tax Strategies</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basics">
            <Card>
              <CardContent className="p-6 prose max-w-none">
                <h3>Understanding the U.S. Tax System</h3>
                
                <h4>Progressive Tax Brackets</h4>
                <p>
                  The U.S. federal income tax system is progressive, meaning that higher income levels are taxed at higher rates. However, it's important to understand that moving into a higher tax bracket doesn't mean all your income is taxed at that higher rate—only the portion that falls within that bracket.
                </p>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full border-collapse border border-gray-300 mt-4 mb-6">
                    <thead>
                      <tr className="bg-purple-50">
                        <th className="border border-gray-300 px-4 py-2 text-purple-700">Tax Rate</th>
                        <th className="border border-gray-300 px-4 py-2 text-purple-700">Single Filers (2025)</th>
                        <th className="border border-gray-300 px-4 py-2 text-purple-700">Married Filing Jointly (2025)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">10%</td>
                        <td className="border border-gray-300 px-4 py-2">$0 - $11,600</td>
                        <td className="border border-gray-300 px-4 py-2">$0 - $23,200</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-300 px-4 py-2">12%</td>
                        <td className="border border-gray-300 px-4 py-2">$11,601 - $47,150</td>
                        <td className="border border-gray-300 px-4 py-2">$23,201 - $94,300</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">22%</td>
                        <td className="border border-gray-300 px-4 py-2">$47,151 - $100,525</td>
                        <td className="border border-gray-300 px-4 py-2">$94,301 - $201,050</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-300 px-4 py-2">24%</td>
                        <td className="border border-gray-300 px-4 py-2">$100,526 - $191,950</td>
                        <td className="border border-gray-300 px-4 py-2">$201,051 - $383,900</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">32%</td>
                        <td className="border border-gray-300 px-4 py-2">$191,951 - $243,725</td>
                        <td className="border border-gray-300 px-4 py-2">$383,901 - $487,450</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-300 px-4 py-2">35%</td>
                        <td className="border border-gray-300 px-4 py-2">$243,726 - $609,350</td>
                        <td className="border border-gray-300 px-4 py-2">$487,451 - $731,200</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">37%</td>
                        <td className="border border-gray-300 px-4 py-2">Over $609,350</td>
                        <td className="border border-gray-300 px-4 py-2">Over $731,200</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <h4>Types of Taxes</h4>
                <ul>
                  <li><strong>Federal income tax:</strong> Collected by the IRS based on your earnings</li>
                  <li><strong>State income tax:</strong> Collected by most (but not all) states based on your earnings</li>
                  <li><strong>FICA taxes:</strong> Social Security (6.2%) and Medicare (1.45%) taxes</li>
                  <li><strong>Capital gains tax:</strong> Tax on profits from the sale of investments or property</li>
                  <li><strong>Property tax:</strong> Local taxes based on the value of real estate you own</li>
                  <li><strong>Sales tax:</strong> State and local taxes on purchases</li>
                </ul>
                
                <h4>Tax Filing Status</h4>
                <p>
                  Your filing status determines your tax rates and eligibility for certain deductions and credits. The five filing statuses are:
                </p>
                <ul>
                  <li><strong>Single:</strong> Unmarried or legally separated</li>
                  <li><strong>Married Filing Jointly (MFJ):</strong> Combined return for married couples</li>
                  <li><strong>Married Filing Separately (MFS):</strong> Separate returns for married couples</li>
                  <li><strong>Head of Household (HOH):</strong> Unmarried with qualifying dependents</li>
                  <li><strong>Qualifying Widow(er):</strong> Surviving spouse with dependent child</li>
                </ul>
                
                <div className="bg-purple-50 p-4 rounded-md border border-purple-100 my-6">
                  <h4 className="text-purple-800 font-medium flex items-center mb-2">
                    <span className="material-icons mr-1 text-purple-600">tips_and_updates</span>
                    Pro Tip
                  </h4>
                  <p className="text-purple-700 mb-0">
                    The difference between your marginal tax rate (the highest bracket you fall into) and your effective tax rate (the average percentage of your income paid in taxes) can be significant. Understanding this difference helps you make better financial decisions, especially regarding tax-advantaged investments.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="deductions">
            <Card>
              <CardContent className="p-6 prose max-w-none">
                <h3>Tax Deductions and Credits</h3>
                
                <h4>Standard vs. Itemized Deductions</h4>
                <p>
                  You have two options for reducing your taxable income:
                </p>
                <ul>
                  <li>
                    <strong>Standard Deduction:</strong> A flat amount that reduces your taxable income.
                    <ul>
                      <li>2025 standard deduction: $14,600 for single filers, $29,200 for married filing jointly</li>
                      <li>Simpler to claim, no receipts or documentation needed</li>
                      <li>Best for people with few deductible expenses</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Itemized Deductions:</strong> A list of eligible expenses that can be subtracted from your income.
                    <ul>
                      <li>Common itemized deductions include mortgage interest, state and local taxes (SALT), charitable contributions, and medical expenses exceeding 7.5% of AGI</li>
                      <li>Requires detailed record-keeping and documentation</li>
                      <li>Best if your itemized deductions exceed the standard deduction</li>
                    </ul>
                  </li>
                </ul>
                
                <h4>Common Tax Credits</h4>
                <p>
                  Tax credits are more valuable than deductions because they reduce your tax bill dollar-for-dollar, rather than just reducing your taxable income.
                </p>
                <ul>
                  <li>
                    <strong>Earned Income Tax Credit (EITC):</strong>
                    <ul>
                      <li>For low to moderate-income workers</li>
                      <li>Refundable credit (can result in a refund even if you owe no tax)</li>
                      <li>Amount varies based on income and number of qualifying children</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Child Tax Credit:</strong>
                    <ul>
                      <li>Up to $2,000 per qualifying child under 17</li>
                      <li>Partially refundable</li>
                      <li>Phases out at higher income levels</li>
                    </ul>
                  </li>
                  <li>
                    <strong>American Opportunity Tax Credit (AOTC):</strong>
                    <ul>
                      <li>Up to $2,500 per eligible student for first four years of higher education</li>
                      <li>40% refundable (up to $1,000)</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Lifetime Learning Credit:</strong>
                    <ul>
                      <li>Up to $2,000 per tax return for qualified education expenses</li>
                      <li>No limit on number of years claimed</li>
                      <li>Non-refundable</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Residential Energy Credits:</strong>
                    <ul>
                      <li>For energy-efficient home improvements and renewable energy systems</li>
                      <li>Can significantly reduce the cost of going green</li>
                    </ul>
                  </li>
                </ul>
                
                <h4>Above-the-Line Deductions</h4>
                <p>
                  These deductions are subtracted from your gross income to calculate your Adjusted Gross Income (AGI). They're available whether you take the standard deduction or itemize.
                </p>
                <ul>
                  <li>Contributions to traditional IRAs and Health Savings Accounts (HSAs)</li>
                  <li>Self-employment taxes and health insurance premiums</li>
                  <li>Student loan interest (up to $2,500)</li>
                  <li>Educator expenses (up to $300)</li>
                  <li>Alimony payments for divorces finalized before 2019</li>
                </ul>
                
                <div className="bg-purple-50 p-4 rounded-md border border-purple-100 my-6">
                  <h4 className="text-purple-800 font-medium flex items-center mb-2">
                    <span className="material-icons mr-1 text-purple-600">lightbulb</span>
                    Key Insight
                  </h4>
                  <p className="text-purple-700 mb-0">
                    Reducing your AGI through above-the-line deductions can have cascading benefits, as many tax benefits, credits, and deductions are calculated based on your AGI or Modified AGI. A lower AGI can help you qualify for more tax benefits.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="retirement">
            <Card>
              <CardContent className="p-6 prose max-w-none">
                <h3>Tax-Efficient Retirement Planning</h3>
                
                <h4>Traditional vs. Roth Accounts</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-blue-50 p-4 rounded-md">
                    <h5 className="text-blue-700 font-medium mb-2">Traditional Accounts</h5>
                    <ul className="text-blue-700 mb-0">
                      <li><strong>Tax treatment:</strong> Contributions are tax-deductible now; withdrawals are taxed as ordinary income in retirement</li>
                      <li><strong>Best for:</strong> Those who expect to be in a lower tax bracket in retirement</li>
                      <li><strong>Examples:</strong> Traditional 401(k), Traditional IRA</li>
                      <li><strong>Required Minimum Distributions (RMDs):</strong> Begin at age 73</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 p-4 rounded-md">
                    <h5 className="text-green-700 font-medium mb-2">Roth Accounts</h5>
                    <ul className="text-green-700 mb-0">
                      <li><strong>Tax treatment:</strong> Contributions are made with after-tax dollars; qualified withdrawals are completely tax-free</li>
                      <li><strong>Best for:</strong> Those who expect to be in a higher tax bracket in retirement or who value tax-free growth</li>
                      <li><strong>Examples:</strong> Roth 401(k), Roth IRA</li>
                      <li><strong>RMDs:</strong> None for Roth IRAs during the owner's lifetime; Roth 401(k)s require RMDs unless rolled over to a Roth IRA</li>
                    </ul>
                  </div>
                </div>
                
                <h4>Tax Diversification Strategy</h4>
                <p>
                  Having different types of accounts with different tax treatments gives you flexibility in retirement to manage your tax liability.
                </p>
                <ul>
                  <li><strong>Pre-tax accounts:</strong> Traditional 401(k)s and IRAs</li>
                  <li><strong>After-tax accounts with tax-free growth:</strong> Roth 401(k)s and IRAs</li>
                  <li><strong>Taxable accounts:</strong> Brokerage accounts</li>
                </ul>
                <p>
                  This diversity allows you to strategically withdraw from different account types to minimize taxes in retirement. For example:
                </p>
                <ul>
                  <li>Use standard deduction with traditional account withdrawals</li>
                  <li>Use Roth withdrawals to avoid pushing into higher tax brackets</li>
                  <li>Leverage long-term capital gains rates on taxable account withdrawals</li>
                </ul>
                
                <h4>Roth Conversion Ladders</h4>
                <p>
                  A Roth conversion ladder is a strategy where you convert portions of a Traditional IRA to a Roth IRA over multiple years, paying taxes on the converted amounts. Five years after each conversion, you can access the converted principal without penalties.
                </p>
                <p>
                  This strategy can be especially valuable:
                </p>
                <ul>
                  <li>During years with unusually low income</li>
                  <li>For early retirees looking to access retirement funds before age 59½</li>
                  <li>When you anticipate higher tax rates in the future</li>
                </ul>
                
                <h4>Qualified Charitable Distributions (QCDs)</h4>
                <p>
                  If you're 70½ or older, you can donate up to $100,000 annually directly from your IRA to qualified charities.
                </p>
                <ul>
                  <li>Counts toward your RMD requirement</li>
                  <li>Excluded from your taxable income (better than taking a distribution and then donating)</li>
                  <li>Can reduce Medicare premiums and taxation of Social Security benefits</li>
                </ul>
                
                <div className="bg-amber-50 p-4 rounded-md border border-amber-100 my-6">
                  <h4 className="text-amber-800 font-medium flex items-center mb-2">
                    <span className="material-icons mr-1 text-amber-600">warning</span>
                    Important Consideration
                  </h4>
                  <p className="text-amber-700 mb-0">
                    Tax laws frequently change. While long-term planning is essential, be prepared to adjust your strategy as tax regulations evolve. Consider working with a tax professional to optimize your retirement tax strategy.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="investments">
            <Card>
              <CardContent className="p-6 prose max-w-none">
                <h3>Tax-Efficient Investing</h3>
                
                <h4>Understanding Capital Gains</h4>
                <p>
                  Capital gains are profits from the sale of investments or property and are taxed differently based on how long you've held the asset:
                </p>
                <ul>
                  <li>
                    <strong>Short-term capital gains:</strong> Assets held for one year or less
                    <ul>
                      <li>Taxed at your ordinary income tax rates (10% to 37%)</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Long-term capital gains:</strong> Assets held for more than one year
                    <ul>
                      <li>Taxed at preferential rates: 0%, 15%, or 20%, depending on your income</li>
                      <li>Additional 3.8% Net Investment Income Tax may apply for high-income earners</li>
                    </ul>
                  </li>
                </ul>
                
                <h4>Tax-Loss Harvesting</h4>
                <p>
                  This strategy involves selling investments that have experienced losses to offset capital gains and reduce your tax liability.
                </p>
                <ul>
                  <li>Can offset capital gains with capital losses dollar-for-dollar</li>
                  <li>If losses exceed gains, you can deduct up to $3,000 against ordinary income</li>
                  <li>Excess losses can be carried forward to future tax years</li>
                  <li>Be aware of the "wash sale rule" – don't repurchase the same or substantially identical security within 30 days</li>
                </ul>
                
                <h4>Asset Location Strategy</h4>
                <p>
                  Place investments in accounts where they'll receive the most favorable tax treatment:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="border rounded-md p-4">
                    <h5 className="font-medium mb-2">Tax-Deferred Accounts</h5>
                    <p className="text-sm mb-2">(Traditional 401(k)s, IRAs)</p>
                    <ul className="text-sm">
                      <li>Taxable bonds</li>
                      <li>REITs</li>
                      <li>High-turnover funds</li>
                      <li>Short-term investments</li>
                    </ul>
                  </div>
                  <div className="border rounded-md p-4">
                    <h5 className="font-medium mb-2">Tax-Free Accounts</h5>
                    <p className="text-sm mb-2">(Roth 401(k)s, Roth IRAs)</p>
                    <ul className="text-sm">
                      <li>High-growth stocks</li>
                      <li>Aggressive assets</li>
                      <li>Investments with highest expected returns</li>
                    </ul>
                  </div>
                  <div className="border rounded-md p-4">
                    <h5 className="font-medium mb-2">Taxable Accounts</h5>
                    <p className="text-sm mb-2">(Brokerage accounts)</p>
                    <ul className="text-sm">
                      <li>Low-turnover index funds</li>
                      <li>Tax-efficient ETFs</li>
                      <li>Municipal bonds</li>
                      <li>Buy-and-hold stocks</li>
                    </ul>
                  </div>
                </div>
                
                <h4>Tax-Efficient Investment Vehicles</h4>
                <ul>
                  <li>
                    <strong>Exchange-Traded Funds (ETFs):</strong>
                    <ul>
                      <li>Generally more tax-efficient than mutual funds due to their creation/redemption process</li>
                      <li>Typically generate fewer capital gains distributions</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Index Funds:</strong>
                    <ul>
                      <li>Low turnover results in fewer taxable events</li>
                      <li>Passive management minimizes capital gains distributions</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Municipal Bonds:</strong>
                    <ul>
                      <li>Interest is exempt from federal taxes</li>
                      <li>Often exempt from state and local taxes if you reside in the issuing state</li>
                      <li>Most beneficial for investors in higher tax brackets</li>
                    </ul>
                  </li>
                  <li>
                    <strong>529 College Savings Plans:</strong>
                    <ul>
                      <li>Tax-free growth for qualified education expenses</li>
                      <li>Some states offer tax deductions for contributions</li>
                    </ul>
                  </li>
                </ul>
                
                <div className="bg-green-50 p-4 rounded-md border border-green-100 my-6">
                  <h4 className="text-green-800 font-medium flex items-center mb-2">
                    <span className="material-icons mr-1 text-green-600">tips_and_updates</span>
                    Pro Tip
                  </h4>
                  <p className="text-green-700 mb-0">
                    Consider your tax situation before year-end. December is the perfect time to implement tax-loss harvesting, make strategic Roth conversions, or accelerate deductible expenses to optimize your tax position for the current year.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <div id="insurance" className="mb-16 scroll-mt-16">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center mr-4">
            <span className="material-icons text-red-600">health_and_safety</span>
          </div>
          <h2 className="text-2xl font-bold text-neutral-800">Insurance Basics</h2>
        </div>

        <Tabs defaultValue="life" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="life">Life Insurance</TabsTrigger>
            <TabsTrigger value="health">Health Insurance</TabsTrigger>
            <TabsTrigger value="property">Home & Auto</TabsTrigger>
            <TabsTrigger value="other">Other Insurance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="life">
            <Card>
              <CardContent className="p-6 prose max-w-none">
                <h3>Life Insurance</h3>
                
                <h4>Why Life Insurance Matters</h4>
                <p>
                  Life insurance provides financial protection for your loved ones in the event of your death. It can:
                </p>
                <ul>
                  <li>Replace lost income for dependents</li>
                  <li>Cover funeral and final expenses</li>
                  <li>Pay off outstanding debts</li>
                  <li>Fund future expenses like college education</li>
                  <li>Provide inheritance</li>
                  <li>Create a charitable legacy</li>
                </ul>
                
                <h4>Types of Life Insurance</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="border rounded-md p-4">
                    <h5 className="font-medium text-green-700 mb-2">Term Life Insurance</h5>
                    <p className="text-sm mb-2">Provides coverage for a specific period (term)</p>
                    <h6 className="font-medium mb-1">Pros:</h6>
                    <ul className="text-sm mb-2">
                      <li>Most affordable option</li>
                      <li>Simple to understand</li>
                      <li>High death benefits available</li>
                    </ul>
                    <h6 className="font-medium mb-1">Cons:</h6>
                    <ul className="text-sm mb-0">
                      <li>No cash value build-up</li>
                      <li>Coverage expires after term</li>
                      <li>Premiums increase when renewing</li>
                    </ul>
                  </div>
                  <div className="border rounded-md p-4">
                    <h5 className="font-medium text-blue-700 mb-2">Permanent Life Insurance</h5>
                    <p className="text-sm mb-2">Provides lifetime coverage with a cash value component</p>
                    <h6 className="font-medium mb-1">Types:</h6>
                    <ul className="text-sm mb-0">
                      <li><strong>Whole Life:</strong> Fixed premiums, guaranteed cash value growth</li>
                      <li><strong>Universal Life:</strong> Flexible premiums and death benefits</li>
                      <li><strong>Variable Life:</strong> Investment options for cash value</li>
                      <li><strong>Variable Universal Life:</strong> Combines flexibility with investment options</li>
                    </ul>
                  </div>
                </div>
                
                <h4>How Much Coverage Do You Need?</h4>
                <p>
                  Several factors determine how much life insurance is appropriate:
                </p>
                <ul>
                  <li><strong>Income replacement:</strong> Often 10-15 times your annual income</li>
                  <li><strong>Outstanding debts:</strong> Mortgage, car loans, credit cards, student loans</li>
                  <li><strong>Future expenses:</strong> College tuition, childcare</li>
                  <li><strong>Final expenses:</strong> Funeral costs, medical bills</li>
                  <li><strong>Existing coverage:</strong> Employer-provided plans, other policies</li>
                </ul>
                
                <h4>Common Life Insurance Riders</h4>
                <p>
                  Riders are optional add-ons that can customize your policy:
                </p>
                <ul>
                  <li><strong>Accelerated death benefit:</strong> Access to benefits if diagnosed with terminal illness</li>
                  <li><strong>Waiver of premium:</strong> Waives premiums if you become disabled</li>
                  <li><strong>Guaranteed insurability:</strong> Option to purchase additional coverage without medical underwriting</li>
                  <li><strong>Accidental death benefit:</strong> Additional payout for accidental death</li>
                  <li><strong>Child rider:</strong> Provides coverage for your children</li>
                </ul>
                
                <div className="bg-amber-50 p-4 rounded-md border border-amber-100 my-6">
                  <h4 className="text-amber-800 font-medium flex items-center mb-2">
                    <span className="material-icons mr-1 text-amber-600">warning</span>
                    Important Consideration
                  </h4>
                  <p className="text-amber-700 mb-0">
                    When purchasing life insurance, be truthful on your application. Misrepresentation can lead to claim denial or policy rescission. Also, review your coverage needs as life changes (marriage, children, home purchase, etc.).
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="health">
            <Card>
              <CardContent className="p-6 prose max-w-none">
                <h3>Health Insurance</h3>
                
                <h4>Understanding Health Insurance Terms</h4>
                <ul>
                  <li><strong>Premium:</strong> The amount you pay for coverage (typically monthly)</li>
                  <li><strong>Deductible:</strong> Amount you pay before insurance starts covering costs</li>
                  <li><strong>Copayment (copay):</strong> Fixed amount you pay for covered services</li>
                  <li><strong>Coinsurance:</strong> Percentage of costs you pay after meeting your deductible</li>
                  <li><strong>Out-of-pocket maximum:</strong> The most you'll pay during a policy period</li>
                  <li><strong>Network:</strong> Healthcare providers who contract with your insurance company</li>
                  <li><strong>Formulary:</strong> List of prescription drugs covered by your plan</li>
                </ul>
                
                <h4>Types of Health Insurance Plans</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="border rounded-md p-4">
                    <h5 className="font-medium mb-2">Health Maintenance Organization (HMO)</h5>
                    <ul className="text-sm">
                      <li>Requires primary care physician (PCP) referrals for specialists</li>
                      <li>Limited to network providers except in emergencies</li>
                      <li>Often lower premiums and out-of-pocket costs</li>
                      <li>Less flexibility but simpler administration</li>
                    </ul>
                  </div>
                  <div className="border rounded-md p-4">
                    <h5 className="font-medium mb-2">Preferred Provider Organization (PPO)</h5>
                    <ul className="text-sm">
                      <li>No PCP requirement or referrals needed</li>
                      <li>Coverage for both in-network and out-of-network care</li>
                      <li>Higher premiums but more flexibility</li>
                      <li>Higher out-of-network costs</li>
                    </ul>
                  </div>
                  <div className="border rounded-md p-4">
                    <h5 className="font-medium mb-2">High Deductible Health Plan (HDHP)</h5>
                    <ul className="text-sm">
                      <li>Lower premiums, higher deductibles</li>
                      <li>Can be paired with Health Savings Account (HSA)</li>
                      <li>Good for generally healthy people</li>
                      <li>Preventive care often covered before deductible</li>
                    </ul>
                  </div>
                  <div className="border rounded-md p-4">
                    <h5 className="font-medium mb-2">Exclusive Provider Organization (EPO)</h5>
                    <ul className="text-sm">
                      <li>No PCP requirement or referrals</li>
                      <li>Only covers in-network care (except emergencies)</li>
                      <li>Middle ground between HMO and PPO</li>
                      <li>Often lower premiums than PPOs</li>
                    </ul>
                  </div>
                </div>
                
                <h4>Health Savings Account (HSA)</h4>
                <p>
                  An HSA is a tax-advantaged account available to those enrolled in HDHPs:
                </p>
                <ul>
                  <li><strong>Triple tax advantage:</strong> Tax-deductible contributions, tax-free growth, tax-free withdrawals for qualified medical expenses</li>
                  <li><strong>Portable:</strong> Stays with you if you change employers</li>
                  <li><strong>No "use it or lose it" rule:</strong> Funds roll over year to year</li>
                  <li><strong>Retirement option:</strong> After age 65, can withdraw for non-medical expenses (subject to income tax)</li>
                  <li><strong>2025 contribution limits:</strong> $4,150 for individual coverage, $8,300 for family coverage, with an additional $1,000 catch-up contribution for those 55 and older</li>
                </ul>
                
                <h4>Flexible Spending Account (FSA)</h4>
                <p>
                  An employer-sponsored benefit that allows you to set aside pre-tax dollars for eligible healthcare expenses:
                </p>
                <ul>
                  <li>2025 contribution limit: $3,200</li>
                  <li>Use-it-or-lose-it rule (though employers may offer a grace period or $610 carryover)</li>
                  <li>Not portable between employers</li>
                  <li>Available with most health plans (not just HDHPs)</li>
                </ul>
                
                <div className="bg-red-50 p-4 rounded-md border border-red-100 my-6">
                  <h4 className="text-red-800 font-medium flex items-center mb-2">
                    <span className="material-icons mr-1 text-red-600">tips_and_updates</span>
                    Pro Tip
                  </h4>
                  <p className="text-red-700 mb-0">
                    Review your health insurance plan each year during open enrollment. Your health needs and plan options change over time, and a plan that was optimal last year might not be the best choice this year.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="property">
            <Card>
              <CardContent className="p-6 prose max-w-none">
                <h3>Home and Auto Insurance</h3>
                
                <h4>Homeowners Insurance</h4>
                <p>
                  Homeowners insurance protects your home and belongings against covered perils and provides liability coverage.
                </p>
                
                <h5 className="font-medium mt-4">What It Typically Covers:</h5>
                <ul>
                  <li><strong>Dwelling coverage:</strong> Your house structure</li>
                  <li><strong>Other structures:</strong> Detached garage, shed, fence</li>
                  <li><strong>Personal property:</strong> Your belongings</li>
                  <li><strong>Loss of use:</strong> Additional living expenses if your home is uninhabitable</li>
                  <li><strong>Personal liability:</strong> Legal and medical costs if someone is injured on your property</li>
                  <li><strong>Medical payments:</strong> Medical expenses for guests injured on your property</li>
                </ul>
                
                <h5 className="font-medium mt-4">What It Typically Doesn't Cover:</h5>
                <ul>
                  <li>Floods (requires separate flood insurance)</li>
                  <li>Earthquakes (requires separate earthquake insurance)</li>
                  <li>Normal wear and tear</li>
                  <li>Intentional damage</li>
                  <li>Certain high-value items may have limited coverage</li>
                </ul>
                
                <h5 className="font-medium mt-4">Tips for Homeowners Insurance:</h5>
                <ul>
                  <li>Ensure you have enough dwelling coverage to rebuild your home</li>
                  <li>Consider replacement cost (rather than actual cash value) coverage for belongings</li>
                  <li>Create a home inventory with photos or video</li>
                  <li>Ask about discounts for security systems, bundling policies, etc.</li>
                  <li>Consider umbrella insurance for additional liability protection</li>
                </ul>
                
                <h4>Auto Insurance</h4>
                <p>
                  Auto insurance provides financial protection against physical damage and bodily injury resulting from traffic accidents and other vehicle-related incidents.
                </p>
                
                <h5 className="font-medium mt-4">Common Coverage Types:</h5>
                <ul>
                  <li><strong>Liability coverage:</strong> Pays for others' bodily injury and property damage</li>
                  <li><strong>Collision coverage:</strong> Pays for damage to your car from a collision</li>
                  <li><strong>Comprehensive coverage:</strong> Covers theft and damage from incidents other than collisions</li>
                  <li><strong>Personal injury protection (PIP):</strong> Covers medical expenses regardless of fault</li>
                  <li><strong>Uninsured/underinsured motorist coverage:</strong> Protects you if the at-fault driver has insufficient insurance</li>
                  <li><strong>Gap insurance:</strong> Covers the difference between what you owe and your car's value if it's totaled</li>
                </ul>
                
                <h5 className="font-medium mt-4">Factors Affecting Auto Insurance Rates:</h5>
                <ul>
                  <li>Driving record and claims history</li>
                  <li>Age, location, and gender</li>
                  <li>Vehicle make, model, and age</li>
                  <li>Annual mileage</li>
                  <li>Credit score (in most states)</li>
                  <li>Coverage levels and deductibles</li>
                </ul>
                
                <div className="bg-red-50 p-4 rounded-md border border-red-100 my-6">
                  <h4 className="text-red-800 font-medium flex items-center mb-2">
                    <span className="material-icons mr-1 text-red-600">lightbulb</span>
                    Key Insight
                  </h4>
                  <p className="text-red-700 mb-0">
                    When deciding on deductibles for your insurance policies, consider your emergency fund. Higher deductibles lower your premiums but require you to have funds available to cover that amount if you need to file a claim.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="other">
            <Card>
              <CardContent className="p-6 prose max-w-none">
                <h3>Other Important Insurance Types</h3>
                
                <h4>Disability Insurance</h4>
                <p>
                  Disability insurance replaces a portion of your income if you become unable to work due to illness or injury.
                </p>
                <ul>
                  <li><strong>Short-term disability:</strong> Typically covers 3-6 months</li>
                  <li><strong>Long-term disability:</strong> Can last for years or until retirement age</li>
                  <li><strong>Own-occupation:</strong> Pays if you can't perform your specific job</li>
                  <li><strong>Any-occupation:</strong> Pays only if you can't work in any job suitable for your education and experience</li>
                </ul>
                <p>
                  <strong>Why it matters:</strong> The chance of becoming disabled during your working years is higher than most people realize. Approximately 1 in 4 workers will experience a disability before reaching retirement age.
                </p>
                
                <h4>Umbrella Insurance</h4>
                <p>
                  Umbrella insurance provides additional liability coverage beyond the limits of your homeowners, auto, and boat insurance policies.
                </p>
                <ul>
                  <li>Typically sold in million-dollar increments</li>
                  <li>Relatively inexpensive for the coverage provided</li>
                  <li>Covers lawsuits, property damage, and certain personal liability situations</li>
                  <li>Some policies include coverage for libel, slander, and false imprisonment</li>
                </ul>
                <p>
                  <strong>Who needs it:</strong> Anyone with significant assets to protect, those with high-risk factors (pool, trampoline, teenage drivers), or individuals in the public eye.
                </p>
                
                <h4>Long-Term Care Insurance</h4>
                <p>
                  Long-term care insurance covers costs associated with extended care needs, such as nursing home care, assisted living, or in-home care.
                </p>
                <ul>
                  <li>Medicare does not cover most long-term care expenses</li>
                  <li>Best purchased in your 50s or early 60s before premiums become prohibitively expensive</li>
                  <li>Can include inflation protection to ensure benefits keep pace with rising costs</li>
                  <li>Alternative options include hybrid life/LTC policies and self-insuring</li>
                </ul>
                <p>
                  <strong>Why it matters:</strong> The average cost of a private room in a nursing home exceeds $100,000 annually, and approximately 70% of people over 65 will need some form of long-term care in their lifetime.
                </p>
                
                <h4>Identity Theft Insurance</h4>
                <p>
                  Identity theft insurance provides coverage for expenses associated with restoring your identity and repairing credit reports after identity theft.
                </p>
                <ul>
                  <li>Typically covers expenses like phone bills, lost wages, notary fees, and sometimes attorney fees</li>
                  <li>May include credit monitoring and fraud alert services</li>
                  <li>Often available as a rider to homeowners insurance or through credit monitoring services</li>
                </ul>
                
                <h4>Pet Insurance</h4>
                <p>
                  Pet insurance helps cover veterinary expenses for illness or injury to your pets.
                </p>
                <ul>
                  <li><strong>Accident-only plans:</strong> Cover injuries from accidents</li>
                  <li><strong>Accident and illness plans:</strong> Cover both accidents and diseases</li>
                  <li><strong>Wellness plans:</strong> Cover routine care like vaccinations and annual check-ups</li>
                  <li>Most plans operate on a reimbursement model</li>
                  <li>Pre-existing conditions are generally not covered</li>
                </ul>
                
                <div className="bg-red-50 p-4 rounded-md border border-red-100 my-6">
                  <h4 className="text-red-800 font-medium flex items-center mb-2">
                    <span className="material-icons mr-1 text-red-600">tips_and_updates</span>
                    Pro Tip
                  </h4>
                  <p className="text-red-700 mb-0">
                    Insurance is for catastrophic expenses, not small ones. Choose higher deductibles for lower premiums, and consider self-insuring (paying out of pocket) for smaller risks. Put the premium savings into an emergency fund to cover deductibles when needed.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <div id="homebuying" className="mb-16 scroll-mt-16">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center mr-4">
            <span className="material-icons text-indigo-600">home</span>
          </div>
          <h2 className="text-2xl font-bold text-neutral-800">Home Buying Guide</h2>
        </div>

        <Tabs defaultValue="prepare" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="prepare">Preparing to Buy</TabsTrigger>
            <TabsTrigger value="mortgage">Mortgage Basics</TabsTrigger>
            <TabsTrigger value="process">Buying Process</TabsTrigger>
            <TabsTrigger value="costs">Hidden Costs</TabsTrigger>
          </TabsList>
          
          <TabsContent value="prepare">
            <Card>
              <CardContent className="p-6 prose max-w-none">
                <h3>Preparing to Buy a Home</h3>
                
                <h4>Is Homeownership Right for You?</h4>
                <p>
                  Before diving into the home buying process, consider whether homeownership aligns with your financial situation and lifestyle:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="border rounded-md p-4">
                    <h5 className="font-medium text-green-700 mb-2">Advantages of Buying</h5>
                    <ul className="text-sm">
                      <li>Building equity instead of paying rent</li>
                      <li>Potential tax benefits (mortgage interest deduction)</li>
                      <li>Freedom to modify and personalize your space</li>
                      <li>Protection against rent increases</li>
                      <li>Potential appreciation in property value</li>
                    </ul>
                  </div>
                  <div className="border rounded-md p-4">
                    <h5 className="font-medium text-red-700 mb-2">Considerations</h5>
                    <ul className="text-sm">
                      <li>Responsibility for maintenance and repairs</li>
                      <li>Less flexibility to relocate</li>
                      <li>Property taxes and homeowners insurance</li>
                      <li>Potential for value depreciation</li>
                      <li>Upfront costs (down payment, closing costs)</li>
                    </ul>
                  </div>
                </div>
                
                <h4>Financial Preparation</h4>
                <ul>
                  <li>
                    <strong>Check your credit score:</strong> Higher scores (typically 740+) qualify for better mortgage rates. Obtain free credit reports from the three major bureaus and address any issues.
                  </li>
                  <li>
                    <strong>Calculate your debt-to-income ratio (DTI):</strong> Lenders typically prefer a DTI of 43% or lower. This includes all monthly debt payments divided by gross monthly income.
                  </li>
                  <li>
                    <strong>Save for a down payment:</strong> While 20% is ideal to avoid private mortgage insurance (PMI), many loans allow for lower down payments:
                    <ul>
                      <li>Conventional loans: As low as 3-5%</li>
                      <li>FHA loans: As low as 3.5%</li>
                      <li>VA loans: 0% for eligible veterans</li>
                      <li>USDA loans: 0% for eligible rural properties</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Budget for closing costs:</strong> Typically 2-5% of the loan amount.
                  </li>
                  <li>
                    <strong>Establish an emergency fund:</strong> Have 3-6 months of expenses saved separately from your down payment.
                  </li>
                </ul>
                
                <h4>Getting Pre-Approved for a Mortgage</h4>
                <p>
                  Mortgage pre-approval gives you a clear understanding of what you can afford and signals to sellers that you're a serious buyer.
                </p>
                <ol>
                  <li>Shop around with multiple lenders to compare rates and terms</li>
                  <li>Gather necessary documents:
                    <ul>
                      <li>Proof of income (W-2s, pay stubs, tax returns)</li>
                      <li>Employment verification</li>
                      <li>Assets (bank statements, investment accounts)</li>
                      <li>Identification and Social Security number</li>
                      <li>Credit information</li>
                    </ul>
                  </li>
                  <li>Complete the pre-approval application</li>
                  <li>Receive a pre-approval letter stating how much you can borrow</li>
                </ol>
                
                <div className="bg-indigo-50 p-4 rounded-md border border-indigo-100 my-6">
                  <h4 className="text-indigo-800 font-medium flex items-center mb-2">
                    <span className="material-icons mr-1 text-indigo-600">tips_and_updates</span>
                    Pro Tip
                  </h4>
                  <p className="text-indigo-700 mb-0">
                    Just because you're pre-approved for a certain amount doesn't mean you should spend that much. Consider your full financial picture and aim to keep your housing costs (mortgage, taxes, insurance, and maintenance) below 28% of your gross monthly income.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="mortgage">
            <Card>
              <CardContent className="p-6 prose max-w-none">
                <h3>Understanding Mortgages</h3>
                
                <h4>Types of Mortgages</h4>
                <ul>
                  <li>
                    <strong>Conventional loans:</strong>
                    <ul>
                      <li>Not backed by the federal government</li>
                      <li>Typically require higher credit scores (620+)</li>
                      <li>Down payments as low as 3% for first-time buyers</li>
                      <li>May be conforming (meeting Fannie Mae and Freddie Mac guidelines) or non-conforming (jumbo loans)</li>
                    </ul>
                  </li>
                  <li>
                    <strong>FHA loans:</strong>
                    <ul>
                      <li>Backed by the Federal Housing Administration</li>
                      <li>More lenient credit requirements (580+ for 3.5% down)</li>
                      <li>Higher mortgage insurance premiums</li>
                      <li>Good for first-time homebuyers or those with lower credit scores</li>
                    </ul>
                  </li>
                  <li>
                    <strong>VA loans:</strong>
                    <ul>
                      <li>Guaranteed by the Department of Veterans Affairs</li>
                      <li>Available to eligible service members, veterans, and qualifying spouses</li>
                      <li>No down payment required</li>
                      <li>No private mortgage insurance</li>
                    </ul>
                  </li>
                  <li>
                    <strong>USDA loans:</strong>
                    <ul>
                      <li>Backed by the U.S. Department of Agriculture</li>
                      <li>Available for rural and some suburban properties</li>
                      <li>No down payment required</li>
                      <li>Income limitations apply</li>
                    </ul>
                  </li>
                </ul>
                
                <h4>Fixed vs. Adjustable Rate Mortgages</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="border rounded-md p-4">
                    <h5 className="font-medium mb-2">Fixed-Rate Mortgage</h5>
                    <ul className="text-sm">
                      <li>Interest rate remains the same for the entire loan term</li>
                      <li>Predictable monthly principal and interest payments</li>
                      <li>Common terms: 30, 20, and 15 years</li>
                      <li>Best when interest rates are low or you plan to stay in the home long-term</li>
                    </ul>
                  </div>
                  <div className="border rounded-md p-4">
                    <h5 className="font-medium mb-2">Adjustable-Rate Mortgage (ARM)</h5>
                    <ul className="text-sm">
                      <li>Interest rate is fixed for an initial period, then adjusts periodically</li>
                      <li>Often expressed as 5/1 ARM (fixed for 5 years, then adjusts annually)</li>
                      <li>Usually starts with lower rates than fixed-rate mortgages</li>
                      <li>Best for those who plan to move or refinance before the rate adjusts</li>
                    </ul>
                  </div>
                </div>
                
                <h4>Understanding Mortgage Costs</h4>
                <ul>
                  <li>
                    <strong>Interest rate:</strong> The percentage charged on the loan amount
                  </li>
                  <li>
                    <strong>Annual Percentage Rate (APR):</strong> Reflects the total cost of borrowing, including interest rate and fees
                  </li>
                  <li>
                    <strong>Points:</strong> Fees paid to lower the interest rate (1 point = 1% of the loan amount)
                  </li>
                  <li>
                    <strong>Private Mortgage Insurance (PMI):</strong> Required for conventional loans with less than 20% down payment
                  </li>
                  <li>
                    <strong>Escrow account:</strong> Holds funds for property taxes and homeowners insurance
                  </li>
                </ul>
                
                <h4>Mortgage Calculator</h4>
                <div className="mt-4 p-6 border rounded-md bg-indigo-50">
                  <h5 className="font-semibold text-indigo-700 mb-3">Estimate Your Monthly Payment</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-indigo-700">Home Price ($)</label>
                      <input type="number" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50" placeholder="300000" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-indigo-700">Down Payment ($)</label>
                      <input type="number" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50" placeholder="60000" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-indigo-700">Loan Term (years)</label>
                      <input type="number" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50" placeholder="30" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-indigo-700">Interest Rate (%)</label>
                      <input type="number" step="0.01" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50" placeholder="5.5" />
                    </div>
                  </div>
                  
                  <button className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Calculate Payment
                  </button>
                  
                  <div className="mt-4 p-4 bg-white rounded-md border border-indigo-200">
                    <p className="text-sm text-gray-500">Enter your information and click 'Calculate' to see your estimated monthly mortgage payment.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="process">
            <Card>
              <CardContent className="p-6 prose max-w-none">
                <h3>The Home Buying Process</h3>
                
                <h4>Step 1: Assemble Your Team</h4>
                <ul>
                  <li>
                    <strong>Real estate agent:</strong> Represents your interests, helps find properties, guides negotiations
                    <ul>
                      <li>Look for someone with local expertise, good communication, and negotiation skills</li>
                      <li>Buyer's agents are typically paid by the seller, so there's usually no direct cost to you</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Mortgage lender:</strong> Provides financing for your purchase
                    <ul>
                      <li>Compare rates, terms, and customer service from multiple lenders</li>
                      <li>Consider banks, credit unions, mortgage brokers, and online lenders</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Home inspector:</strong> Evaluates the property's condition
                  </li>
                  <li>
                    <strong>Real estate attorney:</strong> Reviews contracts and handles legal aspects (required in some states)
                  </li>
                </ul>
                
                <h4>Step 2: House Hunting</h4>
                <ol>
                  <li>
                    <strong>Define your needs vs. wants:</strong>
                    <ul>
                      <li>Needs: Non-negotiable features (location, minimum bedrooms/bathrooms, etc.)</li>
                      <li>Wants: Desirable but not essential features (particular finishes, pool, etc.)</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Research neighborhoods:</strong>
                    <ul>
                      <li>School quality (even if you don't have children, as it affects resale value)</li>
                      <li>Crime rates</li>
                      <li>Proximity to work, schools, shopping, healthcare</li>
                      <li>Future development plans</li>
                      <li>Property tax rates</li>
                    </ul>
                  </li>
                  <li>
                    <strong>View properties:</strong>
                    <ul>
                      <li>Take notes and photos during visits</li>
                      <li>Visit during different times of day</li>
                      <li>Check commute times during rush hour</li>
                      <li>Consider the home's orientation (natural light, privacy)</li>
                    </ul>
                  </li>
                </ol>
                
                <h4>Step 3: Making an Offer</h4>
                <ol>
                  <li>
                    <strong>Determine offering price:</strong>
                    <ul>
                      <li>Consider comparable properties (comps)</li>
                      <li>Assess market conditions (buyer's vs. seller's market)</li>
                      <li>Factor in the property's condition and needed repairs</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Include contingencies:</strong>
                    <ul>
                      <li>Financing contingency: Protects you if you can't secure a mortgage</li>
                      <li>Inspection contingency: Allows you to renegotiate or back out based on inspection results</li>
                      <li>Appraisal contingency: Protects you if the home appraises for less than the purchase price</li>
                      <li>Title contingency: Ensures the seller can transfer clear title</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Submit earnest money deposit:</strong> Shows good faith (typically 1-3% of purchase price)
                  </li>
                  <li>
                    <strong>Negotiate terms:</strong> Price, closing date, included fixtures/appliances, repairs
                  </li>
                </ol>
                
                <h4>Step 4: Under Contract to Closing</h4>
                <ol>
                  <li>
                    <strong>Home inspection:</strong> Thoroughly evaluate the property's condition
                  </li>
                  <li>
                    <strong>Renegotiate if necessary:</strong> Based on inspection findings
                  </li>
                  <li>
                    <strong>Mortgage application and processing:</strong>
                    <ul>
                      <li>Submit full application with supporting documents</li>
                      <li>Lender orders appraisal</li>
                      <li>Underwriting process</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Title search and insurance:</strong> Verify property ownership and protect against claims
                  </li>
                  <li>
                    <strong>Final walk-through:</strong> Verify property condition before closing
                  </li>
                  <li>
                    <strong>Closing:</strong> Sign documents, pay closing costs, receive keys
                  </li>
                </ol>
                
                <div className="bg-amber-50 p-4 rounded-md border border-amber-100 my-6">
                  <h4 className="text-amber-800 font-medium flex items-center mb-2">
                    <span className="material-icons mr-1 text-amber-600">warning</span>
                    Important Consideration
                  </h4>
                  <p className="text-amber-700 mb-0">
                    Avoid making major financial changes (new credit cards, large purchases, job changes) between pre-approval and closing. These can impact your credit score and debt-to-income ratio, potentially jeopardizing your mortgage approval.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="costs">
            <Card>
              <CardContent className="p-6 prose max-w-none">
                <h3>Hidden Costs of Homeownership</h3>
                
                <h4>Upfront Costs</h4>
                <ul>
                  <li>
                    <strong>Down payment:</strong> Typically 3-20% of purchase price
                  </li>
                  <li>
                    <strong>Closing costs:</strong> 2-5% of loan amount
                    <ul>
                      <li>Loan origination fees</li>
                      <li>Appraisal fee</li>
                      <li>Title search and insurance</li>
                      <li>Attorney fees</li>
                      <li>Prepaid property taxes and homeowners insurance</li>
                      <li>Recording fees</li>
                      <li>Transfer taxes</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Moving expenses:</strong> Professional movers, truck rental, packing supplies
                  </li>
                  <li>
                    <strong>Initial furnishings and appliances:</strong> May need new furniture for different spaces
                  </li>
                  <li>
                    <strong>Immediate repairs or upgrades:</strong> Based on inspection findings or preferences
                  </li>
                </ul>
                
                <h4>Ongoing Costs</h4>
                <ul>
                  <li>
                    <strong>Mortgage payment:</strong> Principal and interest
                  </li>
                  <li>
                    <strong>Property taxes:</strong> Vary by location, typically 0.5-2.5% of property value annually
                  </li>
                  <li>
                    <strong>Homeowners insurance:</strong> Protects your home and belongings
                  </li>
                  <li>
                    <strong>Private Mortgage Insurance (PMI):</strong> Required with less than 20% down on conventional loans
                  </li>
                  <li>
                    <strong>HOA or condo fees:</strong> If applicable
                  </li>
                  <li>
                    <strong>Utilities:</strong> Often higher than in an apartment (water, electricity, gas, trash, sewer)
                  </li>
                  <li>
                    <strong>Internet and cable:</strong> May need to establish new service
                  </li>
                </ul>
                
                <h4>Long-term Maintenance and Repairs</h4>
                <p>
                  Budget 1-4% of your home's value annually for maintenance and repairs.
                </p>
                <ul>
                  <li>
                    <strong>Regular maintenance:</strong>
                    <ul>
                      <li>HVAC service (twice yearly)</li>
                      <li>Gutter cleaning</li>
                      <li>Chimney inspection and cleaning</li>
                      <li>Lawn care and landscaping</li>
                      <li>Pest control</li>
                      <li>Dryer vent cleaning</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Major components have limited lifespans:</strong>
                    <ul>
                      <li>Roof: 15-30 years ($8,000-$20,000+)</li>
                      <li>HVAC system: 10-20 years ($5,000-$10,000)</li>
                      <li>Water heater: 8-12 years ($800-$1,500)</li>
                      <li>Appliances: 8-15 years ($500-$2,000+ each)</li>
                      <li>Exterior paint: 5-10 years ($5,000-$10,000)</li>
                    </ul>
                  </li>
                </ul>
                
                <h4>Creating a Homeownership Budget</h4>
                <ol>
                  <li>
                    <strong>List all monthly housing expenses:</strong>
                    <ul>
                      <li>Mortgage payment (principal and interest)</li>
                      <li>Property taxes (annual amount divided by 12)</li>
                      <li>Homeowners insurance (annual amount divided by 12)</li>
                      <li>PMI (if applicable)</li>
                      <li>HOA fees (if applicable)</li>
                      <li>Estimated utilities</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Establish a home maintenance fund:</strong>
                    <ul>
                      <li>Set aside money monthly for future repairs and maintenance</li>
                      <li>Start with at least 1% of home value per year, divided by 12</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Plan for major expenses:</strong>
                    <ul>
                      <li>Research lifespans of major components in your home</li>
                      <li>Estimate replacement costs</li>
                      <li>Create separate sinking funds for big-ticket items</li>
                    </ul>
                  </li>
                </ol>
                
                <div className="bg-indigo-50 p-4 rounded-md border border-indigo-100 my-6">
                  <h4 className="text-indigo-800 font-medium flex items-center mb-2">
                    <span className="material-icons mr-1 text-indigo-600">lightbulb</span>
                    Key Insight
                  </h4>
                  <p className="text-indigo-700 mb-0">
                    Many first-time homebuyers focus exclusively on the mortgage payment but underestimate the total cost of homeownership. A realistic budget that accounts for all expenses will help you avoid becoming "house poor" – owning a home but having little money left for other needs and goals.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <div className="flex justify-center my-8">
        <Button 
          onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
          variant="outline"
          className="flex items-center gap-2"
        >
          <ArrowUpIcon className="h-4 w-4" />
          Back to top
        </Button>
      </div>
    </div>
  );
}
