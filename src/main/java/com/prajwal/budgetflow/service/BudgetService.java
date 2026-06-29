package com.prajwal.budgetflow.service;

import com.prajwal.budgetflow.dto.BudgetRequest;
import com.prajwal.budgetflow.dto.BudgetResponse;
import org.springframework.data.domain.Page;

public interface BudgetService {

    BudgetResponse saveBudget(BudgetRequest request);

    Page<BudgetResponse> getAllBudgets(
            int page,
            int size,
            String sortBy,
            String sortDirection);

    BudgetResponse getBudget(Long budgetId);

    void deleteBudget(Long budgetId);
}