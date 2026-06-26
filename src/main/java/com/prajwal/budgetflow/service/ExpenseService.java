package com.prajwal.budgetflow.service;

import com.prajwal.budgetflow.dto.ExpenseRequest;
import com.prajwal.budgetflow.dto.ExpenseResponse;
import org.springframework.data.domain.Page;

public interface ExpenseService {

    ExpenseResponse addExpense(ExpenseRequest request);

    ExpenseResponse updateExpense(Long expenseId, ExpenseRequest request);

    void deleteExpense(Long expenseId);

    ExpenseResponse getExpense(Long expenseId);

    Page<ExpenseResponse> getAllExpenses(
            int page,
            int size,
            String sortBy,
            String sortDirection
    );

    Page<ExpenseResponse> searchByTitle(
            String title,
            int page,
            int size
    );

    Page<ExpenseResponse> filterByCategory(
            Long categoryId,
            int page,
            int size
    );
}