import { useState, useEffect, useCallback, useMemo } from "react"
import { toast } from "react-toastify"
import DashboardLayout from "@/layouts/DashboardLayout"
import ExpenseToolbar from "@/components/expense/ExpenseToolbar"
import ExpenseTable from "@/components/expense/ExpenseTable"
import ExpenseForm from "@/components/expense/ExpenseForm"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { ToastContainer } from "react-toastify"
import { getExpenses, deleteExpense } from "@/services/expenseService"

export default function Expenses() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [expenses, setExpenses] = useState([])
  const [totalElements, setTotalElements] = useState(0)
  const [page, setPage] = useState(0)
  const [size] = useState(10)
  const [sortBy, setSortBy] = useState("date")
  const [sortDirection, setSortDirection] = useState("desc")
  const [title, setTitle] = useState("")
  const [categoryId, setCategoryId] = useState("")
  const [formOpen, setFormOpen] = useState(false)
  const [selectedExpense, setSelectedExpense] = useState(null)

  const fetchExpenses = useCallback(async () => {
    setLoading(true)
    setError(false)
    try {
      const params = {
        page,
        size,
        sortBy,
        sortDirection,
      }
      if (title) params.title = title
      if (categoryId) params.categoryId = categoryId
      const data = await getExpenses(params)
      setExpenses(data.content || [])
      setTotalElements(data.totalElements || 0)
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }, [page, size, sortBy, sortDirection, title, categoryId])

  useEffect(() => {
    fetchExpenses()
  }, [fetchExpenses])

  const handleDelete = async (id) => {
    await deleteExpense(id)
    toast.success("Expense deleted successfully")
    if (expenses.length === 1 && page > 0) {
      setPage(page - 1)
    } else {
      fetchExpenses()
    }
  }

  const handleAddExpense = useCallback(() => {
    setSelectedExpense(null)
    setFormOpen(true)
  }, [])

  const handleEditExpense = useCallback((expense) => {
    setSelectedExpense(expense)
    setFormOpen(true)
  }, [])

  const handleFormSuccess = useCallback(() => {
    fetchExpenses()
  }, [fetchExpenses])

  const handleCloseForm = useCallback(() => {
    setFormOpen(false)
    setSelectedExpense(null)
  }, [])

  const handleRetry = useCallback(() => {
    fetchExpenses()
  }, [fetchExpenses])

  const handleTitleChange = useCallback((value) => {
    setTitle(value)
    setPage(0)
  }, [])

  const handleCategoryChange = useCallback((value) => {
    setCategoryId(value)
    setPage(0)
  }, [])

  const handleSortByChange = useCallback((value) => {
    setSortBy(value)
    setPage(0)
  }, [])

  const handleSortDirectionChange = useCallback((value) => {
    setSortDirection(value)
    setPage(0)
  }, [])

  const paginationInfo = useMemo(() => {
    const start = page * size + 1
    const end = Math.min((page + 1) * size, totalElements)
    return { start, end }
  }, [page, size, totalElements])

  if (error) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-96">
          <Card className="w-full max-w-md text-center">
            <CardContent className="pt-6">
              <p className="text-muted-foreground mb-4">Failed to load expenses. Please try again.</p>
              <Button onClick={handleRetry}>Retry</Button>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    )
  }

  const renderSkeletonRows = () => (
    <div className="rounded-lg border bg-card overflow-hidden">
      <div className="border-b border-border">
        <div className="flex">
          <div className="flex-1 p-3"><Skeleton className="h-5 w-3/4" /></div>
          <div className="flex-1 p-3"><Skeleton className="h-5 w-1/2" /></div>
          <div className="flex-1 p-3"><Skeleton className="h-5 w-1/3 ml-auto" /></div>
          <div className="flex-1 p-3"><Skeleton className="h-5 w-2/3" /></div>
          <div className="w-24 p-3"><Skeleton className="h-5 w-12 ml-auto" /></div>
        </div>
      </div>
      {[...Array(5)].map((_, i) => (
        <div key={i} className="border-b border-border last:border-0">
          <div className="flex">
            <div className="flex-1 p-3"><Skeleton className="h-4 w-5/6" /></div>
            <div className="flex-1 p-3"><Skeleton className="h-4 w-2/3" /></div>
            <div className="flex-1 p-3"><Skeleton className="h-4 w-1/3 ml-auto" /></div>
            <div className="flex-1 p-3"><Skeleton className="h-4 w-3/4" /></div>
            <div className="w-24 p-3 flex gap-1 justify-end">
              <Skeleton className="h-7 w-7" />
              <Skeleton className="h-7 w-7" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )

  const renderEmptyState = () => (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-24 h-24 mb-6 text-slate-300">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m-6-8h6M5 7h14a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2z" />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-slate-900 mb-2">No expenses found</h3>
      <p className="text-sm text-slate-500 mb-6">Start by adding your first expense.</p>
    </div>
  )

  if (loading) {
    return (
      <DashboardLayout>
        <div className="space-y-4">
          <ExpenseToolbar
            title={title}
            categoryId={categoryId}
            sortBy={sortBy}
            sortDirection={sortDirection}
            onTitleChange={handleTitleChange}
            onCategoryChange={handleCategoryChange}
            onSortByChange={handleSortByChange}
            onSortDirectionChange={handleSortDirectionChange}
            onAddClick={handleAddExpense}
          />
          {renderSkeletonRows()}
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <ExpenseToolbar
          title={title}
          categoryId={categoryId}
          sortBy={sortBy}
          sortDirection={sortDirection}
          onTitleChange={handleTitleChange}
          onCategoryChange={handleCategoryChange}
          onSortByChange={handleSortByChange}
          onSortDirectionChange={handleSortDirectionChange}
          onAddClick={handleAddExpense}
        />

        {expenses.length === 0 ? (
          <div className="rounded-lg border bg-card">
            {renderEmptyState()}
          </div>
        ) : (
          <ExpenseTable expenses={expenses} onDelete={handleDelete} onEdit={handleEditExpense} />
        )}

        {totalElements > 0 && (
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              disabled={page === 0}
              onClick={() => setPage(page - 1)}
            >
              Previous
            </Button>
            <span className="text-sm text-muted-foreground">
              Showing {paginationInfo.start}–{paginationInfo.end} of {totalElements} expenses
            </span>
            <Button
              variant="outline"
              disabled={expenses.length < size}
              onClick={() => setPage(page + 1)}
            >
              Next
            </Button>
          </div>
        )}

        <ExpenseForm
          open={formOpen}
          onClose={handleCloseForm}
          expense={selectedExpense}
          onSuccess={handleFormSuccess}
        />
        <ToastContainer />
      </div>
    </DashboardLayout>
  )
}