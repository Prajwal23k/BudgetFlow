package com.prajwal.budgetflow.service.impl;

import com.prajwal.budgetflow.dto.IncomeRequest;
import com.prajwal.budgetflow.dto.IncomeResponse;
import com.prajwal.budgetflow.entity.Income;
import com.prajwal.budgetflow.entity.User;
import com.prajwal.budgetflow.repository.IncomeRepository;
import com.prajwal.budgetflow.security.CustomUserDetails;
import com.prajwal.budgetflow.service.IncomeService;
import com.prajwal.budgetflow.util.IncomeMapper;
import org.springframework.data.domain.Page;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

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
        throw new UnsupportedOperationException("Will be implemented later.");
    }

    @Override
    public void deleteIncome(Long incomeId) {
        throw new UnsupportedOperationException("Will be implemented later.");
    }

    @Override
    public IncomeResponse getIncome(Long incomeId) {
        throw new UnsupportedOperationException("Will be implemented later.");
    }

    @Override
    public Page<IncomeResponse> getAllIncomes(int page, int size, String sortBy, String sortDirection) {
        throw new UnsupportedOperationException("Will be implemented later.");
    }

    @Override
    public Page<IncomeResponse> searchByTitle(String title, int page, int size) {
        throw new UnsupportedOperationException("Will be implemented later.");
    }
}