package com.prajwal.budgetflow.service.impl;

import com.prajwal.budgetflow.dto.ExpenseRequest;
import com.prajwal.budgetflow.dto.ExpenseResponse;
import com.prajwal.budgetflow.entity.Category;
import com.prajwal.budgetflow.entity.Expense;
import com.prajwal.budgetflow.entity.User;
import com.prajwal.budgetflow.exception.ResourceNotFoundException;
import com.prajwal.budgetflow.repository.CategoryRepository;
import com.prajwal.budgetflow.repository.ExpenseRepository;
import com.prajwal.budgetflow.security.CustomUserDetails;
import com.prajwal.budgetflow.service.ExpenseService;
import com.prajwal.budgetflow.util.ExpenseMapper;
import org.springframework.data.domain.Page;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import com.prajwal.budgetflow.exception.UnauthorizedException;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

@Service
public class ExpenseServiceImpl implements ExpenseService {

    private final ExpenseRepository expenseRepository;
    private final CategoryRepository categoryRepository;

    public ExpenseServiceImpl(
            ExpenseRepository expenseRepository,
            CategoryRepository categoryRepository) {

        this.expenseRepository = expenseRepository;
        this.categoryRepository = categoryRepository;
    }

    @Override
    public ExpenseResponse addExpense(ExpenseRequest request) {

        User user = getCurrentUser();

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Category not found."));

        Expense expense = Expense.builder()
                .title(request.getTitle())
                .amount(request.getAmount())
                .description(request.getDescription())
                .date(request.getDate())
                .user(user)
                .category(category)
                .build();

        Expense savedExpense = expenseRepository.save(expense);

        return ExpenseMapper.toResponse(savedExpense);
    }

    private User getCurrentUser() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        CustomUserDetails userDetails =
                (CustomUserDetails) authentication.getPrincipal();

        return userDetails.getUser();
    }

    @Override
    public ExpenseResponse updateExpense(Long expenseId,
                                         ExpenseRequest request) {

        User currentUser = getCurrentUser();

        Expense expense = expenseRepository.findById(expenseId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Expense not found."));

        if (!expense.getUser().getId().equals(currentUser.getId())) {
            throw new UnauthorizedException(
                    "You are not allowed to update this expense.");
        }

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Category not found."));

        expense.setTitle(request.getTitle());
        expense.setAmount(request.getAmount());
        expense.setDescription(request.getDescription());
        expense.setDate(request.getDate());
        expense.setCategory(category);

        Expense updatedExpense = expenseRepository.save(expense);

        return ExpenseMapper.toResponse(updatedExpense);
    }

    @Override
    public void deleteExpense(Long expenseId) {

        User currentUser = getCurrentUser();

        Expense expense = expenseRepository.findById(expenseId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Expense not found."));

        if (!expense.getUser().getId().equals(currentUser.getId())) {
            throw new UnauthorizedException(
                    "You are not allowed to delete this expense.");
        }

        expenseRepository.delete(expense);
    }

    @Override
    public ExpenseResponse getExpense(Long expenseId) {

        User currentUser = getCurrentUser();

        Expense expense = expenseRepository.findById(expenseId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Expense not found."));

        if (!expense.getUser().getId().equals(currentUser.getId())) {
            throw new UnauthorizedException(
                    "You are not allowed to view this expense.");
        }

        return ExpenseMapper.toResponse(expense);
    }

    @Override
    public Page<ExpenseResponse> getAllExpenses(
            int page,
            int size,
            String sortBy,
            String sortDirection) {

        User currentUser = getCurrentUser();

        Sort sort = sortDirection.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);

        Page<Expense> expenses =
                expenseRepository.findByUser(currentUser, pageable);

        return expenses.map(ExpenseMapper::toResponse);
    }

    @Override
    public Page<ExpenseResponse> searchByTitle(
            String title,
            int page,
            int size) {

        User currentUser = getCurrentUser();

        Pageable pageable = PageRequest.of(page, size);

        Page<Expense> expenses =
                expenseRepository.findByUserAndTitleContainingIgnoreCase(
                        currentUser,
                        title,
                        pageable);

        return expenses.map(ExpenseMapper::toResponse);
    }

    @Override
    public Page<ExpenseResponse> filterByCategory(
            Long categoryId,
            int page,
            int size) {

        User currentUser = getCurrentUser();

        Pageable pageable = PageRequest.of(page, size);

        Page<Expense> expenses =
                expenseRepository.findByUserAndCategoryId(
                        currentUser,
                        categoryId,
                        pageable);

        return expenses.map(ExpenseMapper::toResponse);
    }
}