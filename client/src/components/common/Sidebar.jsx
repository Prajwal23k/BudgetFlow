import * as React from "react"
import { LayoutDashboard, Receipt, CreditCard, PiggyBank, User, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Expenses", icon: Receipt },
  { name: "Income", icon: CreditCard },
  { name: "Budgets", icon: PiggyBank },
  { name: "Profile", icon: User },
]

const bottomItems = [
  { name: "Settings", icon: Settings },
  { name: "Logout", icon: LogOut },
]

export default function Sidebar() {
  return (
    <aside className="hidden w-[260px] flex-col bg-slate-900 h-screen sticky top-0 rounded-r-xl lg:flex">
      <div className="flex flex-col h-full p-6">
        <div className="mb-10">
          <h1 className="text-2xl font-semibold text-slate-100">BudgetFlow</h1>
          <span className="text-sm text-slate-400">Expense Management</span>
        </div>

        <nav className="flex flex-col space-y-1 flex-1">
          {navItems.map((item, index) => {
            const Icon = item.icon
            const isActive = index === 0
            return (
              <Button
                key={item.name}
                variant="ghost"
                className={cn(
                  "w-full justify-start px-3 py-2.5 h-auto text-slate-300 hover:text-slate-100 transition-colors",
                  isActive && "bg-slate-800 text-slate-100"
                )}
              >
                <Icon className="h-5 w-5 mr-3" />
                <span className="font-medium">{item.name}</span>
              </Button>
            )
          })}
        </nav>

        <div className="mt-auto">
          <div className="h-px bg-slate-700 mb-4" />
          <nav className="flex flex-col space-y-1">
            {bottomItems.map((item) => {
              const Icon = item.icon
              return (
                <Button
                  key={item.name}
                  variant="ghost"
                  className="w-full justify-start px-3 py-2.5 h-auto text-slate-300 hover:text-slate-100 transition-colors"
                >
                  <Icon className="h-5 w-5 mr-3" />
                  <span className="font-medium">{item.name}</span>
                </Button>
              )
            })}
          </nav>

          <div className="mt-6 pt-4 border-t border-slate-700">
            <p className="text-sm font-medium text-slate-100">BudgetFlow</p>
            <p className="text-xs text-slate-400">Version 1.0</p>
          </div>
        </div>
      </div>
    </aside>
  )
}