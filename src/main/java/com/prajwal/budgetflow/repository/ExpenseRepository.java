package com.prajwal.budgetflow.repository;

import com.prajwal.budgetflow.entity.Expense;
import com.prajwal.budgetflow.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

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
}