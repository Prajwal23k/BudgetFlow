package com.prajwal.budgetflow.service.impl;
import com.prajwal.budgetflow.exception.UnauthorizedException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import com.prajwal.budgetflow.dto.BudgetRequest;
import com.prajwal.budgetflow.dto.BudgetResponse;
import com.prajwal.budgetflow.entity.Budget;
import com.prajwal.budgetflow.entity.Category;
import com.prajwal.budgetflow.entity.User;
import com.prajwal.budgetflow.exception.ResourceNotFoundException;
import com.prajwal.budgetflow.repository.BudgetRepository;
import com.prajwal.budgetflow.repository.CategoryRepository;
import com.prajwal.budgetflow.security.CustomUserDetails;
import com.prajwal.budgetflow.service.BudgetService;
import com.prajwal.budgetflow.util.BudgetMapper;
import org.springframework.data.domain.Page;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BudgetServiceImpl implements BudgetService {

    private final BudgetRepository budgetRepository;
    private final CategoryRepository categoryRepository;

    public BudgetServiceImpl(BudgetRepository budgetRepository,
                             CategoryRepository categoryRepository) {
        this.budgetRepository = budgetRepository;
        this.categoryRepository = categoryRepository;
    }

    @Override
    public Page<BudgetResponse> getAllBudgets(
            int page,
            int size,
            String sortBy,
            String sortDirection) {

        User currentUser = getCurrentUser();

        Sort sort = sortDirection.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);

        Page<Budget> budgets =
                budgetRepository.findByUser(currentUser, pageable);

        return budgets.map(BudgetMapper::toResponse);
    }

    @Override
    public BudgetResponse getBudget(Long budgetId) {

        User currentUser = getCurrentUser();

        Budget budget = budgetRepository.findById(budgetId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Budget not found."));

        if (!budget.getUser().getId().equals(currentUser.getId())) {
            throw new UnauthorizedException(
                    "You are not allowed to view this budget.");
        }

        return BudgetMapper.toResponse(budget);
    }

    @Override
    public void deleteBudget(Long budgetId) {

        User currentUser = getCurrentUser();

        Budget budget = budgetRepository.findById(budgetId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Budget not found."));

        if (!budget.getUser().getId().equals(currentUser.getId())) {
            throw new UnauthorizedException(
                    "You are not allowed to delete this budget.");
        }

        budgetRepository.delete(budget);
    }

    @Override
    public BudgetResponse saveBudget(BudgetRequest request) {

        User currentUser = getCurrentUser();

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Category not found."));

        Budget budget = budgetRepository
                .findByUserAndCategoryAndMonthAndYear(
                        currentUser,
                        category,
                        request.getMonth(),
                        request.getYear())
                .orElseGet(Budget::new);

        budget.setUser(currentUser);
        budget.setCategory(category);
        budget.setMonth(request.getMonth());
        budget.setYear(request.getYear());
        budget.setMonthlyLimit(request.getMonthlyLimit());

        Budget savedBudget = budgetRepository.save(budget);

        return BudgetMapper.toResponse(savedBudget);
    }

    private User getCurrentUser() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        CustomUserDetails userDetails =
                (CustomUserDetails) authentication.getPrincipal();

        return userDetails.getUser();
    }
}