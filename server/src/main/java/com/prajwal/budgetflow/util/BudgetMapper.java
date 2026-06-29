package com.prajwal.budgetflow.util;

import com.prajwal.budgetflow.dto.BudgetResponse;
import com.prajwal.budgetflow.entity.Budget;

public final class BudgetMapper {

    private BudgetMapper() {
    }

    public static BudgetResponse toResponse(Budget budget) {

        return BudgetResponse.builder()
                .id(budget.getId())
                .monthlyLimit(budget.getMonthlyLimit())
                .month(budget.getMonth())
                .year(budget.getYear())
                .categoryName(budget.getCategory().getName())
                .build();
    }
}