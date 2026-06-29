package com.prajwal.budgetflow.repository;

import com.prajwal.budgetflow.entity.Budget;
import com.prajwal.budgetflow.entity.Category;
import com.prajwal.budgetflow.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface BudgetRepository extends JpaRepository<Budget, Long> {

    Optional<Budget> findByUserAndCategoryAndMonthAndYear(
            User user,
            Category category,
            Integer month,
            Integer year
    );
    Page<Budget> findByUser(User user, Pageable pageable);
    List<Budget> findByUser(User user);
}