import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import FinanceChat from "@/components/chat/finance-chat";
import FeatureCard from "@/components/shared/feature-card";
import TestimonialCard from "@/components/shared/testimonial-card";

export default function Home() {
  const features = [
    {
      icon: "account_balance_wallet",
      title: "Personalized Budgeting",
      description: "Get tailored budget plans based on your income, expenses, and financial goals.",
      color: "primary",
    },
    {
      icon: "trending_up",
      title: "Investment Guidance",
      description: "Learn about investment options, risk tolerance, and strategies aligned with your financial goals.",
      color: "secondary",
    },
    {
      icon: "payments",
      title: "Debt Management",
      description: "Develop strategies to reduce debt efficiently and improve your credit score.",
      color: "accent",
    },
    {
      icon: "flag",
      title: "Goal Setting",
      description: "Create actionable plans for your financial goals, from buying a home to retirement planning.",
      color: "info",
    },
    {
      icon: "school",
      title: "Financial Education",
      description: "Access easy-to-understand explanations of complex financial concepts and terms.",
      color: "primary",
    },
    {
      icon: "calculate",
      title: "Financial Calculators",
      description: "Use interactive tools to plan for retirement, compare loan options, and more.",
      color: "success",
    },
  ];

  const testimonials = [
    {
      content: "FinanceGuru helped me create a budget that actually works. I've managed to save $5,000 in just 6 months while paying down my credit card debt!",
      author: "Sarah J.",
      title: "Marketing Specialist",
      rating: 5,
    },
    {
      content: "I had no idea where to start with investing. FinanceGuru broke it down for me and now I'm confidently building a diversified portfolio with just $200 a month.",
      author: "Michael T.",
      title: "Software Developer",
      rating: 5,
    },
  ];

  const educationalTopics = [
    {
      icon: "savings",
      title: "Investing Basics",
      description: "Learn the fundamentals of investing, from stocks and bonds to funds and risk management.",
      color: "primary",
      link: "/education#investing",
    },
    {
      icon: "account_balance",
      title: "Retirement Planning",
      description: "Understand the different retirement accounts, withdrawal strategies, and how to calculate your needs.",
      color: "secondary",
      link: "/education#retirement",
    },
    {
      icon: "credit_card",
      title: "Credit & Debt Management",
      description: "Master strategies for improving your credit score and managing debt effectively.",
      color: "accent",
      link: "/education#credit",
    },
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Your Personal Finance Mentor</h1>
              <p className="text-lg md:text-xl mb-6">
                Get personalized advice on budgeting, investing, debt management, and financial planning to achieve your goals.
              </p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <Button className="bg-white text-blue-700 hover:bg-gray-100">
                  Talk to FinanceGuru
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white/10">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="md:w-5/12 rounded-lg overflow-hidden shadow-lg">
              <div className="bg-blue-600 p-8 h-[300px] flex items-center justify-center">
                <span className="material-icons text-8xl text-white/70">account_balance</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FinanceGuru Chat Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <FinanceChat />
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">How FinanceGuru Helps You</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Get personalized financial guidance with practical tools to manage your money effectively
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              colorType={feature.color}
            />
          ))}
        </div>
      </section>

      {/* Educational Resources Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gray-50">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Financial Education</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Expand your financial knowledge with our educational resources
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {educationalTopics.map((topic, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden transition-all hover:shadow-md">
              <div className={`h-40 bg-${topic.color}-500/10 flex items-center justify-center`}>
                <span className={`material-icons text-5xl text-${topic.color}-500`}>{topic.icon}</span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">{topic.title}</h3>
                <p className="text-gray-600 mb-4">{topic.description}</p>
                <Link href={topic.link}>
                  <a className={`text-${topic.color}-600 hover:text-${topic.color}-700 font-medium flex items-center`}>
                    Learn more
                    <span className="material-icons text-sm ml-1">arrow_forward</span>
                  </a>
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <Link href="/education">
            <a className="inline-flex items-center px-6 py-3 border border-blue-700 text-blue-700 rounded-md hover:bg-blue-700 hover:text-white transition-colors font-medium">
              Browse all topics
              <span className="material-icons ml-2">arrow_forward</span>
            </a>
          </Link>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Success Stories</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            See how FinanceGuru has helped others achieve their financial goals
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              content={testimonial.content}
              author={testimonial.author}
              title={testimonial.title}
              rating={testimonial.rating}
            />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Ready to Take Control of Your Finances?</h2>
          <p className="text-lg mb-8 opacity-90">Get personalized advice and actionable financial guidance today.</p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button className="bg-white text-blue-700 hover:bg-gray-100">
              Start Your Financial Journey
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10">
              Learn More
            </Button>
          </div>
          <p className="mt-6 text-sm opacity-75">
            <span className="material-icons text-xs align-middle">lock</span>
            Your financial information is always secure and private
          </p>
        </div>
      </section>
    </div>
  );
}
