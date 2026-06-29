package com.prajwal.budgetflow.repository;

import com.prajwal.budgetflow.entity.Expense;
import com.prajwal.budgetflow.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.prajwal.budgetflow.entity.Category;

import java.math.BigDecimal;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    Page<Expense> findByUser(User user, Pageable pageable);

    Page<Expense> findByUserAndTitleContainingIgnoreCase(
            User user,
            String title,
            Pageable pageable
    );

    Page<Expense> findByUserAndCategoryId(
            User user,
            Long categoryId,
            Pageable pageable
    );

    @Query("""
        SELECT COALESCE(SUM(e.amount), 0)
        FROM Expense e
        WHERE e.user = :user
        """)
    BigDecimal getTotalExpense(User user);

    @Query("""
        SELECT COALESCE(SUM(e.amount),0)
        FROM Expense e
        WHERE e.user = :user
        AND e.category = :category
        AND MONTH(e.date) = :month
        AND YEAR(e.date) = :year
        """)
        BigDecimal getSpentAmount(
                User user,
                Category category,
                Integer month,
                Integer year);
}