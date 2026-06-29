import DashboardLayout from "@/layouts/DashboardLayout"
import { SummaryCard } from "@/components/dashboard/SummaryCard"
import { TrendingUp, TrendingDown, Wallet, PiggyBank } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import BudgetAnalyticsCard from "@/components/dashboard/BudgetAnalyticsCard"
import RecentTransactionsCard from "@/components/dashboard/RecentTransactionsCard"
import { getDashboard } from "@/services/dashboardService"
import { useState, useEffect } from "react"

const formatCurrency = (value) => {
  return `₹${value.toLocaleString('en-IN')}`;
};

function Skeleton({ className }) {
  return (
    <div className={`animate-pulse rounded-md bg-muted ${className}`} />
  );
}

function SummaryCardSkeleton() {
  return (
    <div className="group relative flex flex-col gap-4 rounded-[min(var(--radius-lg),12px)] border border-border/60 bg-card p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <Skeleton className="h-10 w-10 rounded-[min(var(--radius-md),10px)]" />
      </div>
      <div className="flex flex-col gap-1">
        <Skeleton className="h-4 w-24 mb-2" />
        <Skeleton className="h-8 w-20" />
      </div>
    </div>
  );
}

function BudgetAnalyticsSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-32" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-40 w-full" />
      </CardContent>
    </Card>
  );
}

function RecentTransactionsSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-40" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-40 w-full" />
      </CardContent>
    </Card>
  );
}

function BudgetAnalyticsContent({ budgetAnalytics }) {
  if (!budgetAnalytics || budgetAnalytics.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <p className="text-sm font-medium">No budget data available.</p>
        <p className="mt-1.5 text-xs text-muted-foreground">
          Create a monthly budget to start tracking spending.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {budgetAnalytics.map((item, index) => (
        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <p className="font-medium text-sm">{item.category}</p>
            <p className="text-xs text-muted-foreground">
              {formatCurrency(item.spent)} / {formatCurrency(item.budget)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold">{item.percentage}%</p>
            <div className="w-20 h-2 bg-muted rounded-full mt-1">
              <div
                className={cn(
                  "h-full rounded-full transition-all",
                  item.percentage > 90 ? "bg-red-500" : item.percentage > 70 ? "bg-amber-500" : "bg-green-500"
                )}
                style={{ width: `${Math.min(item.percentage, 100)}%` }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  const fetchDashboard = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getDashboard(currentMonth, currentYear);
      setDashboardData(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const summaryCards = dashboardData
    ? [
        {
          title: "Total Income",
          value: formatCurrency(dashboardData.totalIncome),
          icon: TrendingUp,
          color: "text-green-500",
        },
        {
          title: "Total Expense",
          value: formatCurrency(dashboardData.totalExpense),
          icon: TrendingDown,
          color: "text-red-500",
        },
        {
          title: "Remaining Balance",
          value: formatCurrency(dashboardData.remainingBalance),
          icon: Wallet,
          color: "text-blue-500",
        },
        {
          title: "Monthly Budget",
          value: formatCurrency(0),
          icon: PiggyBank,
          color: "text-orange-500",
        },
      ]
    : [];

  if (loading) {
    return (
      <DashboardLayout>
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Monitor your monthly financial overview.
          </p>
        </div>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <SummaryCardSkeleton key={i} />
          ))}
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <BudgetAnalyticsSkeleton />
          <RecentTransactionsSkeleton />
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <Card className="w-full max-w-md text-center">
            <CardHeader>
              <CardTitle>Unable to load dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Please try again later.
              </p>
              <Button onClick={fetchDashboard}>Retry</Button>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Monitor your monthly financial overview.
        </p>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {summaryCards.map((card) => (
          <SummaryCard key={card.title} {...card} />
        ))}
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Budget Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <BudgetAnalyticsContent budgetAnalytics={dashboardData?.budgetAnalytics} />
          </CardContent>
        </Card>
        <RecentTransactionsCard />
      </div>
    </DashboardLayout>
  )
}