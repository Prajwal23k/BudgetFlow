package com.prajwal.budgetflow.service.impl;

import com.prajwal.budgetflow.dto.DashboardResponse;
import com.prajwal.budgetflow.entity.User;
import com.prajwal.budgetflow.repository.ExpenseRepository;
import com.prajwal.budgetflow.repository.IncomeRepository;
import com.prajwal.budgetflow.security.CustomUserDetails;
import com.prajwal.budgetflow.service.DashboardService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class DashboardServiceImpl implements DashboardService {

    private final IncomeRepository incomeRepository;
    private final ExpenseRepository expenseRepository;

    public DashboardServiceImpl(
            IncomeRepository incomeRepository,
            ExpenseRepository expenseRepository) {

        this.incomeRepository = incomeRepository;
        this.expenseRepository = expenseRepository;
    }

    @Override
    public DashboardResponse getDashboard() {

        User currentUser = getCurrentUser();

        BigDecimal totalIncome =
                incomeRepository.getTotalIncome(currentUser);

        BigDecimal totalExpense =
                expenseRepository.getTotalExpense(currentUser);

        BigDecimal remainingBalance =
                totalIncome.subtract(totalExpense);

        return DashboardResponse.builder()
                .totalIncome(totalIncome)
                .totalExpense(totalExpense)
                .remainingBalance(remainingBalance)
                .build();
    }

    private User getCurrentUser() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        CustomUserDetails userDetails =
                (CustomUserDetails) authentication.getPrincipal();

        return userDetails.getUser();
    }
}