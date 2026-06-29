import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

function BudgetAnalyticsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <p className="text-sm font-medium">No budget data available.</p>
          <p className="mt-1.5 text-xs text-muted-foreground">
            Create a monthly budget to start tracking spending.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export default BudgetAnalyticsCard
