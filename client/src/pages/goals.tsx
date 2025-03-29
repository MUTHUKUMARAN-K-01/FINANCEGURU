import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

type Goal = {
  id: number;
  userId: number;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  category: string;
  createdAt: string;
};

export default function Goals() {
  const [isOpen, setIsOpen] = useState(false);
  const [userId, setUserId] = useState(1); // For demo purposes, normally from auth
  const { toast } = useToast();

  // Load goals from API
  const { data: goals, isLoading } = useQuery({
    queryKey: [`/api/goals/${userId}`],
    // Empty function as we're using the default fetcher
  });

  // Create goal mutation
  const createGoalMutation = useMutation({
    mutationFn: async (newGoal: any) => {
      return apiRequest("POST", "/api/goals", newGoal);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/goals/${userId}`] });
      toast({
        title: "Goal Created",
        description: "Your financial goal has been created successfully.",
      });
      setIsOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create financial goal",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    const newGoal = {
      userId,
      title: formData.get("title") as string,
      targetAmount: parseFloat(formData.get("targetAmount") as string),
      currentAmount: parseFloat(formData.get("currentAmount") as string),
      deadline: formData.get("deadline") as string,
      category: formData.get("category") as string,
    };
    
    createGoalMutation.mutate(newGoal);
  };

  // Calculate progress percentage
  const calculateProgress = (current: number, target: number) => {
    return Math.min(Math.round((current / target) * 100), 100);
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'emergency':
        return 'health_and_safety';
      case 'retirement':
        return 'beach_access';
      case 'home':
        return 'home';
      case 'education':
        return 'school';
      case 'vacation':
        return 'flight';
      case 'car':
        return 'directions_car';
      default:
        return 'savings';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800 mb-2">Financial Goals</h1>
          <p className="text-neutral-600">Set and track your progress toward important financial milestones</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <span className="material-icons mr-2">add</span>
              Add New Goal
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a New Financial Goal</DialogTitle>
              <DialogDescription>
                Define a specific financial goal with a target amount and deadline.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Goal Title</Label>
                  <Input id="title" name="title" placeholder="e.g., Emergency Fund" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Select name="category" required defaultValue="emergency">
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="emergency">Emergency Fund</SelectItem>
                      <SelectItem value="retirement">Retirement</SelectItem>
                      <SelectItem value="home">Home Purchase</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="vacation">Vacation</SelectItem>
                      <SelectItem value="car">Vehicle</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="targetAmount">Target Amount ($)</Label>
                    <Input 
                      id="targetAmount" 
                      name="targetAmount" 
                      type="number" 
                      min="1" 
                      step="0.01" 
                      placeholder="10000.00" 
                      required 
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="currentAmount">Current Amount ($)</Label>
                    <Input 
                      id="currentAmount" 
                      name="currentAmount" 
                      type="number" 
                      min="0" 
                      step="0.01" 
                      placeholder="0.00" 
                      required 
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="deadline">Target Date</Label>
                  <Input 
                    id="deadline" 
                    name="deadline" 
                    type="date" 
                    required 
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">Cancel</Button>
                </DialogClose>
                <Button 
                  type="submit" 
                  disabled={createGoalMutation.isPending}
                >
                  {createGoalMutation.isPending ? "Creating..." : "Create Goal"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="bg-gray-100 h-16"></CardHeader>
              <CardContent className="p-6">
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-6"></div>
                <div className="h-8 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : goals && goals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {goals.map((goal: Goal) => (
            <Card key={goal.id}>
              <CardHeader className={`bg-${goal.category === 'emergency' ? 'red' : goal.category === 'retirement' ? 'blue' : 'green'}-50 flex flex-row items-center py-4`}>
                <span className="material-icons text-2xl mr-2 text-neutral-700">
                  {getCategoryIcon(goal.category)}
                </span>
                <CardTitle className="text-lg">{goal.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-neutral-600">Progress</span>
                    <span className="text-sm font-medium">
                      {calculateProgress(goal.currentAmount, goal.targetAmount)}%
                    </span>
                  </div>
                  <Progress value={calculateProgress(goal.currentAmount, goal.targetAmount)} className="h-2" />
                </div>
                
                <div className="flex justify-between items-center mb-4">
                  <span className="text-neutral-600">Current</span>
                  <span className="text-lg font-mono font-medium">
                    {formatCurrency(goal.currentAmount)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center mb-4">
                  <span className="text-neutral-600">Target</span>
                  <span className="text-lg font-mono font-medium">
                    {formatCurrency(goal.targetAmount)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center text-sm">
                  <span className="text-neutral-600 flex items-center">
                    <span className="material-icons text-xs mr-1">event</span>
                    Target Date
                  </span>
                  <span className="font-medium">
                    {new Date(goal.deadline).toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-8 text-center">
          <div className="flex justify-center mb-4">
            <span className="material-icons text-4xl text-neutral-400">flag</span>
          </div>
          <h3 className="text-lg font-medium mb-2">No Goals Yet</h3>
          <p className="text-neutral-600 mb-6">
            Start by creating your first financial goal to track your progress
          </p>
          <Button onClick={() => setIsOpen(true)}>
            <span className="material-icons mr-2">add</span>
            Create Your First Goal
          </Button>
        </Card>
      )}
    </div>
  );
}
