import { useState, useEffect } from "react"
import { useForm, Controller } from "react-hook-form"
import axiosInstance from "@/api/axios"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { toast } from "react-toastify"

export default function ExpenseForm({ open, onClose, expense, onSuccess }) {
  const [saving, setSaving] = useState(false)
  const [categories, setCategories] = useState([])
  const [categoriesLoading, setCategoriesLoading] = useState(false)

  const { register, handleSubmit, reset, control, formState: { errors } } = useForm({
    defaultValues: {
      title: "",
      description: "",
      amount: "",
      date: "",
      categoryId: "",
    }
  })

  useEffect(() => {
    if (open) {
      reset({
        title: expense?.title || "",
        description: expense?.description || "",
        amount: expense?.amount?.toString() || "",
        date: expense?.date ? expense.date.split("T")[0] : "",
        categoryId: expense?.category?.id?.toString() || "",
      })
      setCategories([])
      setCategoriesLoading(true)
      axiosInstance
        .get("/categories")
        .then((response) => setCategories(response.data))
        .catch(() => toast.error("Failed to load categories"))
        .finally(() => setCategoriesLoading(false))
    }
  }, [open, expense, reset])

  const onSubmit = async (data) => {
    setSaving(true)
    try {
      const payload = {
        title: data.title,
        description: data.description,
        amount: parseFloat(data.amount),
        date: data.date,
        categoryId: parseInt(data.categoryId, 10),
      }
      if (expense?.id) {
        await axiosInstance.put(`/expenses/${expense.id}`, payload)
        toast.success("Expense updated successfully")
      } else {
        await axiosInstance.post("/expenses", payload)
        toast.success("Expense added successfully")
      }
      onSuccess?.()
      onClose()
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Failed to save expense")
    } finally {
      setSaving(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{expense?.id ? "Edit Expense" : "Add Expense"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" {...register("title", { required: "Title is required" })} />
            {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input id="description" {...register("description")} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              {...register("amount", {
                required: "Amount is required",
                validate: (value) => parseFloat(value) > 0 || "Amount must be positive",
              })}
            />
            {errors.amount && <p className="text-sm text-red-500">{errors.amount.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input id="date" type="date" {...register("date", { required: "Date is required" })} />
            {errors.date && <p className="text-sm text-red-500">{errors.date.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="categoryId">Category</Label>
            <Controller
              name="categoryId"
              control={control}
              rules={{ required: "Category is required" }}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange} disabled={categoriesLoading}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={String(cat.id)}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.categoryId && <p className="text-sm text-red-500">{errors.categoryId.message}</p>}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={saving}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save Expense"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
