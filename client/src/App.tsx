import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Budget from "@/pages/budget";
import Investing from "@/pages/investing";
import Goals from "@/pages/goals";
import Education from "@/pages/education";
import LearningHub from "@/pages/learning-hub";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/budget" component={Budget} />
          <Route path="/investing" component={Investing} />
          <Route path="/goals" component={Goals} />
          <Route path="/education" component={Education} />
          <Route path="/learning-hub" component={LearningHub} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
