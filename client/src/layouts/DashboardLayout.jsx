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
    <div className="flex h-screen bg-slate-50">
      <aside className="hidden md:flex md:w-16 lg:w-64 flex-col bg-slate-900 h-screen sticky top-0 rounded-r-2xl">
        <div className="flex flex-col h-full p-4 lg:p-6">
          <div className="mb-10 hidden lg:block">
            <h1 className="text-xl font-semibold text-slate-100 tracking-tight">BudgetFlow</h1>
            <p className="text-sm text-slate-400 mt-1">Smart Expense Tracker</p>
          </div>
          <nav className="flex flex-col gap-1 flex-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = item.name === "Dashboard"
              return (
                <div
                  key={item.name}
                  className={`
                    flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer transition-all duration-200
                    md:justify-center lg:justify-start
                    ${isActive
                      ? "bg-slate-800 text-slate-100 shadow-sm"
                      : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/60"}
                  `}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  <span className="font-medium text-sm hidden lg:inline">{item.name}</span>
                </div>
              )
            })}
          </nav>
        </div>
      </aside>

      <div className="flex flex-1 flex-col min-w-0 h-screen">
        <header className="flex h-16 items-center justify-between gap-4 border-b border-slate-200 bg-white px-6 shrink-0">
          <h2 className="text-lg font-semibold text-slate-900 tracking-tight">Dashboard</h2>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-500 font-medium hidden md:inline">Welcome back</span>
            <button className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-600 hover:text-slate-900">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
            </button>
            <div className="h-9 w-9 rounded-full bg-slate-200 flex items-center justify-center ring-2 ring-white shadow-sm">
              <User className="h-4 w-4 text-slate-600" />
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto bg-slate-50">
          <div className="p-6 lg:p-8 max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
