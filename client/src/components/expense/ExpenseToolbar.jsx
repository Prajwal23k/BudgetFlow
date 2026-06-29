import { useState, useEffect, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus } from "lucide-react"

const sortOptions = [
  { value: "date", label: "Date" },
  { value: "amount", label: "Amount" },
  { value: "title", label: "Title" },
]

const categories = [
  { value: "1", label: "Food" },
  { value: "2", label: "Transport" },
  { value: "3", label: "Shopping" },
  { value: "4", label: "Entertainment" },
  { value: "5", label: "Bills" },
]

export default function ExpenseToolbar({
  title,
  categoryId,
  sortBy,
  sortDirection,
  onTitleChange,
  onCategoryChange,
  onSortByChange,
  onSortDirectionChange,
  onAddClick
}) {
  const [searchValue, setSearchValue] = useState(title)

  useEffect(() => {
    const timer = setTimeout(() => {
      onTitleChange(searchValue)
    }, 500)
    return () => clearTimeout(timer)
  }, [searchValue, onTitleChange])

  useEffect(() => {
    setSearchValue(title)
  }, [title])

  const handleSearchChange = useCallback((e) => {
    setSearchValue(e.target.value)
  }, [])

  const handleCategoryChange = useCallback((value) => {
    onCategoryChange(value === "all" ? "" : value)
  }, [onCategoryChange])

  const handleSortByChange = useCallback((value) => {
    onSortByChange(value)
  }, [onSortByChange])

  const handleSortDirectionChange = useCallback((value) => {
    onSortDirectionChange(value)
  }, [onSortDirectionChange])

  const handleAddClick = useCallback(() => {
    onAddClick()
  }, [onAddClick])

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 bg-card rounded-lg border">
      <div className="flex-1">
        <Input
          type="text"
          placeholder="Search expenses..."
          value={searchValue}
          onChange={handleSearchChange}
          className="w-full"
        />
      </div>

      <div className="w-full sm:w-48">
        <Select value={categoryId || "all"} onValueChange={handleCategoryChange}>
          <SelectTrigger>
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.value} value={cat.value}>
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="w-full sm:w-40">
        <Select value={sortBy} onValueChange={handleSortByChange}>
          <SelectTrigger>
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="w-full sm:w-32">
        <Select value={sortDirection} onValueChange={handleSortDirectionChange}>
          <SelectTrigger>
            <SelectValue placeholder="Direction" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">Ascending</SelectItem>
            <SelectItem value="desc">Descending</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button onClick={handleAddClick} className="w-full sm:w-auto">
        <Plus className="h-4 w-4 mr-2" />
        Add Expense
      </Button>
    </div>
  )
}