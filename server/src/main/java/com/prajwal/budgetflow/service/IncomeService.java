package com.prajwal.budgetflow.service;

import com.prajwal.budgetflow.dto.IncomeRequest;
import com.prajwal.budgetflow.dto.IncomeResponse;
import org.springframework.data.domain.Page;

public interface IncomeService {

    IncomeResponse addIncome(IncomeRequest request);

    IncomeResponse updateIncome(Long incomeId, IncomeRequest request);

    void deleteIncome(Long incomeId);

    IncomeResponse getIncome(Long incomeId);

    Page<IncomeResponse> getAllIncomes(
            int page,
            int size,
            String sortBy,
            String sortDirection
    );

    Page<IncomeResponse> searchByTitle(
            String title,
            int page,
            int size
    );
}