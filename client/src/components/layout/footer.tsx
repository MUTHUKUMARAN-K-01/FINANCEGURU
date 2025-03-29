import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-neutral-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <span className="material-icons mr-2">account_balance</span>
              <h2 className="text-xl font-bold">FinanceGuru</h2>
            </div>
            <p className="text-neutral-300 text-sm mb-4">
              Your personal finance mentor, helping you achieve financial freedom through personalized guidance.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-300 hover:text-white transition-colors">
                <span className="material-icons">facebook</span>
              </a>
              <a href="#" className="text-neutral-300 hover:text-white transition-colors">
                <span className="material-icons">language</span>
              </a>
              <a href="#" className="text-neutral-300 hover:text-white transition-colors">
                <span className="material-icons">email</span>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/education">
                  <a className="text-neutral-300 hover:text-white transition-colors">Financial Education</a>
                </Link>
              </li>
              <li>
                <Link href="/budget">
                  <a className="text-neutral-300 hover:text-white transition-colors">Budgeting Tools</a>
                </Link>
              </li>
              <li>
                <Link href="/investing">
                  <a className="text-neutral-300 hover:text-white transition-colors">Investment Guides</a>
                </Link>
              </li>
              <li>
                <Link href="/goals">
                  <a className="text-neutral-300 hover:text-white transition-colors">Retirement Planning</a>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-neutral-300 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-neutral-300 hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#" className="text-neutral-300 hover:text-white transition-colors">Testimonials</a></li>
              <li><a href="#" className="text-neutral-300 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-neutral-300 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-neutral-300 hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-neutral-300 hover:text-white transition-colors">Disclaimer</a></li>
            </ul>
            <div className="mt-6 p-3 bg-neutral-700/50 rounded-md text-xs text-neutral-300">
              FinanceGuru provides financial information for educational purposes only. For personalized advice, please consult with a certified financial professional.
            </div>
          </div>
        </div>
        
        <div className="border-t border-neutral-700 mt-8 pt-8 text-center text-sm text-neutral-300">
          <p>&copy; {new Date().getFullYear()} FinanceGuru. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
