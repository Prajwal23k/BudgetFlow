package com.prajwal.budgetflow.repository;

import com.prajwal.budgetflow.entity.Budget;
import com.prajwal.budgetflow.entity.Category;
import com.prajwal.budgetflow.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BudgetRepository extends JpaRepository<Budget, Long> {

    Optional<Budget> findByUserAndCategoryAndMonthAndYear(
            User user,
            Category category,
            Integer month,
            Integer year
    );
}