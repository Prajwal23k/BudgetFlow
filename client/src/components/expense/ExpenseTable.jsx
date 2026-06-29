import { useCallback } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Edit, Trash2 } from "lucide-react"

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

export default function ExpenseTable({ expenses, onDelete, onEdit }) {
  const handleDelete = useCallback(async (id) => {
    await onDelete(id)
  }, [onDelete])

  const handleEdit = useCallback((expense) => {
    onEdit(expense)
  }, [onEdit])

  return (
    <>
      <div className="hidden md:block rounded-lg border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="sticky top-0 bg-card z-10">
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-center w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenses.map((expense, index) => (
                <TableRow
                  key={expense.id}
                  className={`hover:bg-slate-50 transition-colors ${
                    index % 2 === 1 ? 'bg-slate-50/30' : ''
                  }`}
                >
                  <TableCell className="font-medium">{expense.title}</TableCell>
                  <TableCell>{expense.category?.name || '—'}</TableCell>
                  <TableCell className="text-right">{formatCurrency(expense.amount)}</TableCell>
                  <TableCell>{formatDate(expense.date)}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex gap-1 justify-center">
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleEdit(expense)}>
                        <Edit className="h-3.5 w-3.5" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive">
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Expense</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{expense.title}"? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(expense.id)}>
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="md:hidden space-y-3">
        {expenses.map((expense) => (
          <div key={expense.id} className="rounded-lg border bg-card p-4 space-y-3">
            <div className="flex justify-between items-start">
              <h3 className="font-semibold text-slate-900">{expense.title}</h3>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleEdit(expense)}>
                  <Edit className="h-3.5 w-3.5" />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive">
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Expense</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete "{expense.title}"? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(expense.id)}>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Category</span>
              <span>{expense.category?.name || '—'}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Amount</span>
              <span className="font-medium">{formatCurrency(expense.amount)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Date</span>
              <span>{formatDate(expense.date)}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}