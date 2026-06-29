import { LayoutDashboard, Receipt, CreditCard, PiggyBank, User, Bell } from "lucide-react"

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Expenses", icon: Receipt },
  { name: "Income", icon: CreditCard },
  { name: "Budgets", icon: PiggyBank },
  { name: "Profile", icon: User },
]

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950">
      <aside className="hidden w-64 flex-col bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-6 lg:flex">
        <div className="mb-10">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">BudgetFlow</h1>
        </div>
        <nav className="flex flex-col space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.name}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.name}</span>
              </div>
            )
          })}
        </nav>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center justify-end gap-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6">
          <span className="text-sm text-slate-600 dark:text-slate-400 font-medium">Welcome back</span>
          <Bell className="h-5 w-5 text-slate-600 dark:text-slate-400 cursor-pointer hover:text-slate-900 dark:hover:text-slate-100 transition-colors" />
          <div className="h-9 w-9 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
            <User className="h-5 w-5 text-slate-600 dark:text-slate-400" />
          </div>
        </header>

        <main className="flex-1 overflow-auto p-8 bg-slate-50 dark:bg-slate-950">
          <div className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 shadow-sm min-h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}