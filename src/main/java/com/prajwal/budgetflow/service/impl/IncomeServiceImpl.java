package com.prajwal.budgetflow.service.impl;

import com.prajwal.budgetflow.dto.IncomeRequest;
import com.prajwal.budgetflow.dto.IncomeResponse;
import com.prajwal.budgetflow.entity.Income;
import com.prajwal.budgetflow.entity.User;
import com.prajwal.budgetflow.exception.ResourceNotFoundException;
import com.prajwal.budgetflow.exception.UnauthorizedException;
import com.prajwal.budgetflow.repository.IncomeRepository;
import com.prajwal.budgetflow.security.CustomUserDetails;
import com.prajwal.budgetflow.service.IncomeService;
import com.prajwal.budgetflow.util.IncomeMapper;
import org.springframework.data.domain.Page;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

@Service
public class IncomeServiceImpl implements IncomeService {

    private final IncomeRepository incomeRepository;

    public IncomeServiceImpl(IncomeRepository incomeRepository) {
        this.incomeRepository = incomeRepository;
    }

    @Override
    public IncomeResponse addIncome(IncomeRequest request) {

        User currentUser = getCurrentUser();

        Income income = Income.builder()
                .title(request.getTitle())
                .amount(request.getAmount())
                .description(request.getDescription())
                .date(request.getDate())
                .user(currentUser)
                .build();

        Income savedIncome = incomeRepository.save(income);

        return IncomeMapper.toResponse(savedIncome);
    }

    private User getCurrentUser() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        CustomUserDetails userDetails =
                (CustomUserDetails) authentication.getPrincipal();

        return userDetails.getUser();
    }

    @Override
    public IncomeResponse updateIncome(Long incomeId, IncomeRequest request) {

        User currentUser = getCurrentUser();

        Income income = incomeRepository.findById(incomeId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Income not found."));

        if (!income.getUser().getId().equals(currentUser.getId())) {
            throw new UnauthorizedException(
                    "You are not allowed to update this income.");
        }

        income.setTitle(request.getTitle());
        income.setAmount(request.getAmount());
        income.setDescription(request.getDescription());
        income.setDate(request.getDate());

        Income updatedIncome = incomeRepository.save(income);

        return IncomeMapper.toResponse(updatedIncome);
    }

    @Override
    public void deleteIncome(Long incomeId) {

        User currentUser = getCurrentUser();

        Income income = incomeRepository.findById(incomeId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Income not found."));

        if (!income.getUser().getId().equals(currentUser.getId())) {
            throw new UnauthorizedException(
                    "You are not allowed to delete this income.");
        }

        incomeRepository.delete(income);
    }

    @Override
    public IncomeResponse getIncome(Long incomeId) {

        User currentUser = getCurrentUser();

        Income income = incomeRepository.findById(incomeId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Income not found."));

        if (!income.getUser().getId().equals(currentUser.getId())) {
            throw new UnauthorizedException(
                    "You are not allowed to view this income.");
        }

        return IncomeMapper.toResponse(income);
    }

    @Override
    public Page<IncomeResponse> getAllIncomes(
            int page,
            int size,
            String sortBy,
            String sortDirection) {

        User currentUser = getCurrentUser();

        Sort sort = sortDirection.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);

        Page<Income> incomes =
                incomeRepository.findByUser(currentUser, pageable);

        return incomes.map(IncomeMapper::toResponse);
    }

    @Override
    public Page<IncomeResponse> searchByTitle(
            String title,
            int page,
            int size) {

        User currentUser = getCurrentUser();

        Pageable pageable = PageRequest.of(page, size);

        Page<Income> incomes =
                incomeRepository.findByUserAndTitleContainingIgnoreCase(
                        currentUser,
                        title,
                        pageable);

        return incomes.map(IncomeMapper::toResponse);
    }
}