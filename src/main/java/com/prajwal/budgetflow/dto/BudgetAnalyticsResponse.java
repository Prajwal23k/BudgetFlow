package com.prajwal.budgetflow.dto;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BudgetAnalyticsResponse {

    private String categoryName;

    private BigDecimal monthlyLimit;

    private BigDecimal spentAmount;

    private BigDecimal remainingAmount;

    private BigDecimal usagePercentage;

    private boolean budgetExceeded;
}