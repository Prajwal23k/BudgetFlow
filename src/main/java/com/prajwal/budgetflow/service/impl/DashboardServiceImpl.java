package com.prajwal.budgetflow.service.impl;

import com.prajwal.budgetflow.dto.BudgetAnalyticsResponse;
import com.prajwal.budgetflow.dto.DashboardResponse;
import com.prajwal.budgetflow.entity.Budget;
import com.prajwal.budgetflow.entity.User;
import com.prajwal.budgetflow.repository.BudgetRepository;
import com.prajwal.budgetflow.repository.ExpenseRepository;
import com.prajwal.budgetflow.repository.IncomeRepository;
import com.prajwal.budgetflow.security.CustomUserDetails;
import com.prajwal.budgetflow.service.DashboardService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;

@Service
public class DashboardServiceImpl implements DashboardService {

    private final IncomeRepository incomeRepository;
    private final ExpenseRepository expenseRepository;
    BudgetRepository budgetRepository;

    public DashboardServiceImpl(
            IncomeRepository incomeRepository,
            ExpenseRepository expenseRepository,
            BudgetRepository budgetRepository) {

        this.incomeRepository = incomeRepository;
        this.expenseRepository = expenseRepository;
        this.budgetRepository = budgetRepository;
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
        List<BudgetAnalyticsResponse> analytics =
                new ArrayList<>();

        List<Budget> budgets =
                budgetRepository.findByUser(currentUser);

        for (Budget budget : budgets) {

            BigDecimal spent =
                    expenseRepository.getSpentAmount(
                            currentUser,
                            budget.getCategory(),
                            budget.getMonth(),
                            budget.getYear());

            BigDecimal remaining =
                    budget.getMonthlyLimit().subtract(spent);

            boolean exceeded =
                    remaining.compareTo(BigDecimal.ZERO) < 0;

            BigDecimal percentage;

            if (budget.getMonthlyLimit().compareTo(BigDecimal.ZERO) == 0) {

                percentage = BigDecimal.ZERO;

            } else {

                percentage = spent
                        .multiply(BigDecimal.valueOf(100))
                        .divide(
                                budget.getMonthlyLimit(),
                                2,
                                RoundingMode.HALF_UP);
            }

            analytics.add(

                    BudgetAnalyticsResponse.builder()

                            .categoryName(
                                    budget.getCategory().getName())

                            .monthlyLimit(
                                    budget.getMonthlyLimit())

                            .spentAmount(spent)

                            .remainingAmount(remaining)

                            .usagePercentage(percentage)

                            .budgetExceeded(exceeded)

                            .build()
            );
        }

        return DashboardResponse.builder()

                .totalIncome(totalIncome)

                .totalExpense(totalExpense)

                .remainingBalance(remainingBalance)

                .budgetAnalytics(analytics)

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