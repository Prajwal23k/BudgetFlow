package com.prajwal.budgetflow.dto;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BudgetResponse {

    private Long id;

    private BigDecimal monthlyLimit;

    private Integer month;

    private Integer year;

    private String categoryName;
}