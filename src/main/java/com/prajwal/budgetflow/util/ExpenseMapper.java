package com.prajwal.budgetflow.util;

import com.prajwal.budgetflow.dto.ExpenseResponse;
import com.prajwal.budgetflow.entity.Expense;

public final class ExpenseMapper {

    private ExpenseMapper() {
    }

    public static ExpenseResponse toResponse(Expense expense) {

        return ExpenseResponse.builder()
                .id(expense.getId())
                .title(expense.getTitle())
                .amount(expense.getAmount())
                .description(expense.getDescription())
                .date(expense.getDate())
                .categoryName(expense.getCategory().getName())
                .build();
    }
}