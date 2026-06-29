import { TrendingUp, TrendingDown, Wallet, PiggyBank } from "lucide-react";

const iconClass = "size-5 text-muted-foreground";

const summaryCards = [
  {
    title: "Total Income",
    value: "₹0",
    icon: TrendingUp,
  },
  {
    title: "Total Expense",
    value: "₹0",
    icon: TrendingDown,
  },
  {
    title: "Remaining Balance",
    value: "₹0",
    icon: Wallet,
  },
  {
    title: "Monthly Budget",
    value: "₹0",
    icon: PiggyBank,
  },
];

export default function Dashboard() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Monitor your financial overview.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {summaryCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className="rounded-lg border border-border bg-card text-card-foreground shadow-sm"
            >
              <div className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
                <div className="text-sm font-medium">{card.title}</div>
                <Icon className={iconClass} />
              </div>
              <div className="p-6 pt-0">
                <div className="text-2xl font-bold">{card.value}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-border bg-card text-card-foreground shadow-sm">
          <div className="flex flex-row items-center justify-between p-6 pb-3">
            <h3 className="text-base font-semibold">Budget Analytics</h3>
          </div>
          <div className="p-6 pt-0">
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <p className="text-sm font-medium">No budget data available.</p>
              <p className="mt-1.5 text-xs text-muted-foreground">
                Create a monthly budget to start tracking spending.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card text-card-foreground shadow-sm">
          <div className="flex flex-row items-center justify-between p-6 pb-3">
            <h3 className="text-base font-semibold">Recent Transactions</h3>
          </div>
          <div className="p-6 pt-0">
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <p className="text-sm font-medium">No transactions yet.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
