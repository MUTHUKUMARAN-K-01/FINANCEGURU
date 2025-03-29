import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BudgetCalculator from "@/components/budget/budget-calculator";

export default function Budget() {
  const [activeTab, setActiveTab] = useState("calculator");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-800 mb-2">Budget Planning</h1>
        <p className="text-neutral-600">Create and manage your personal budget to achieve financial goals</p>
      </div>

      <div className="flex space-x-2 mb-6">
        <button 
          onClick={() => setActiveTab("calculator")}
          className={`px-4 py-2 text-sm font-medium rounded-md ${
            activeTab === "calculator" 
              ? "bg-primary text-white" 
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Budget Calculator
        </button>
        <button 
          onClick={() => setActiveTab("tips")}
          className={`px-4 py-2 text-sm font-medium rounded-md ${
            activeTab === "tips" 
              ? "bg-primary text-white" 
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Budgeting Tips
        </button>
      </div>

      {activeTab === "calculator" ? (
        <BudgetCalculator />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <span className="material-icons mr-2">lightbulb</span>
              Effective Budgeting Strategies
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">The 50/30/20 Rule</h3>
              <p className="text-neutral-600 mb-2">
                A simple budgeting method that allocates your after-tax income to three categories:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-neutral-600">
                <li><span className="font-medium">50%</span> to needs (housing, food, utilities, transportation)</li>
                <li><span className="font-medium">30%</span> to wants (entertainment, dining out, hobbies)</li>
                <li><span className="font-medium">20%</span> to savings and debt repayment</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Zero-Based Budgeting</h3>
              <p className="text-neutral-600 mb-2">
                Give every dollar a job so your income minus expenses equals zero. Steps include:
              </p>
              <ol className="list-decimal pl-5 space-y-1 text-neutral-600">
                <li>List all sources of income</li>
                <li>List all expenses (both fixed and variable)</li>
                <li>Subtract expenses from income</li>
                <li>Assign any remaining money to savings or debt payment</li>
              </ol>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Envelope System</h3>
              <p className="text-neutral-600 mb-2">
                A cash-based method where you divide your money into different envelopes for different spending categories.
              </p>
              <p className="text-neutral-600">
                This can be done digitally with multiple bank accounts or budget apps that allow you to create virtual "envelopes."
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Pay Yourself First</h3>
              <p className="text-neutral-600 mb-2">
                Automatically direct a portion of your income to savings before paying bills or discretionary spending.
              </p>
              <p className="text-neutral-600">
                Set up automatic transfers to savings accounts on payday to ensure consistency.
              </p>
            </div>

            <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
              <h3 className="text-lg font-medium text-blue-800 mb-2 flex items-center">
                <span className="material-icons mr-1 text-blue-600">tips_and_updates</span>
                Pro Tip
              </h3>
              <p className="text-blue-700">
                Track your spending for at least 30 days before creating a budget to get an accurate picture of where your money is going. Use this data to set realistic spending limits in each category.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
