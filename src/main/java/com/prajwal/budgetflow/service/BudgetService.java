package com.prajwal.budgetflow.service;

import com.prajwal.budgetflow.dto.BudgetRequest;
import com.prajwal.budgetflow.dto.BudgetResponse;

import java.util.List;

public interface BudgetService {

    BudgetResponse saveBudget(BudgetRequest request);

    List<BudgetResponse> getAllBudgets();

    BudgetResponse getBudget(Long budgetId);

    void deleteBudget(Long budgetId);
}