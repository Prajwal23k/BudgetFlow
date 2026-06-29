package com.prajwal.budgetflow.util;

import com.prajwal.budgetflow.dto.IncomeResponse;
import com.prajwal.budgetflow.entity.Income;

public final class IncomeMapper {

    private IncomeMapper() {
    }

    public static IncomeResponse toResponse(Income income) {

        return IncomeResponse.builder()
                .id(income.getId())
                .title(income.getTitle())
                .amount(income.getAmount())
                .description(income.getDescription())
                .date(income.getDate())
                .build();
    }
}