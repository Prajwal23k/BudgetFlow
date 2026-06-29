package com.prajwal.budgetflow.repository;

import com.prajwal.budgetflow.entity.Income;
import com.prajwal.budgetflow.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import java.math.BigDecimal;
import org.springframework.data.jpa.repository.Query;

public interface IncomeRepository extends JpaRepository<Income, Long> {

    Page<Income> findByUser(User user, Pageable pageable);

    Page<Income> findByUserAndTitleContainingIgnoreCase(
            User user,
            String title,
            Pageable pageable
    );

    @Query("""
        SELECT COALESCE(SUM(i.amount), 0)
        FROM Income i
        WHERE i.user = :user
        """)
    BigDecimal getTotalIncome(User user);
}