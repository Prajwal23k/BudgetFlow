package com.prajwal.budgetflow.dto;

import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DashboardResponse {

    private List<BudgetAnalyticsResponse> budgetAnalytics;

    private BigDecimal totalIncome;

    private BigDecimal totalExpense;

    private BigDecimal remainingBalance;
}