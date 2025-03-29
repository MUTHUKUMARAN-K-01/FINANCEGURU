import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from "@/components/ui/sheet";

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
  currentPath: string;
};

const NavLink = ({ href, children, currentPath }: NavLinkProps) => {
  const isActive = currentPath === href;

  return (
    <Link href={href}>
      <a className={`px-3 py-2 text-sm font-medium transition-colors ${
        isActive 
          ? "text-primary" 
          : "text-neutral-700 hover:text-primary"
      }`}>
        {children}
      </a>
    </Link>
  );
};

export default function Header() {
  const [location] = useLocation();

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <div className="flex items-center flex-shrink-0">
            <span className="material-icons text-primary mr-2">account_balance</span>
            <div className="flex items-center">
              <Link href="/">
                <a className="text-xl font-bold text-primary">FinanceGuru</a>
              </Link>
            </div>
          </div>
          <nav className="hidden md:ml-10 md:flex md:space-x-8">
            <NavLink href="/" currentPath={location}>Dashboard</NavLink>
            <NavLink href="/budget" currentPath={location}>Budget</NavLink>
            <NavLink href="/investing" currentPath={location}>Investing</NavLink>
            <NavLink href="/goals" currentPath={location}>Goals</NavLink>
            <NavLink href="/education" currentPath={location}>Learn</NavLink>
            <NavLink href="/learning-hub" currentPath={location}>Learning Hub</NavLink>
          </nav>
        </div>

        <div className="flex items-center">
          <Button className="bg-primary hover:bg-primary/90 text-white">
            Get Started
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-4 md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-4 mt-8">
                <Link href="/">
                  <a className="px-4 py-2 text-base font-medium hover:bg-muted rounded-md">Dashboard</a>
                </Link>
                <Link href="/budget">
                  <a className="px-4 py-2 text-base font-medium hover:bg-muted rounded-md">Budget</a>
                </Link>
                <Link href="/investing">
                  <a className="px-4 py-2 text-base font-medium hover:bg-muted rounded-md">Investing</a>
                </Link>
                <Link href="/goals">
                  <a className="px-4 py-2 text-base font-medium hover:bg-muted rounded-md">Goals</a>
                </Link>
                <Link href="/education">
                  <a className="px-4 py-2 text-base font-medium hover:bg-muted rounded-md">Learn</a>
                </Link>
                <Link href="/learning-hub">
                  <a className="px-4 py-2 text-base font-medium hover:bg-muted rounded-md">Learning Hub</a>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}