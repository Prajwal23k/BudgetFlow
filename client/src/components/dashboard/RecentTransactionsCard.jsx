import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

function RecentTransactionsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <p className="text-sm font-medium">No recent transactions.</p>
          <p className="mt-1.5 text-xs text-muted-foreground">
            Your latest income and expenses will appear here.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export default RecentTransactionsCard
