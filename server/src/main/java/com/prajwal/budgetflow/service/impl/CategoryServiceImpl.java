package com.prajwal.budgetflow.service.impl;

import com.prajwal.budgetflow.dto.CategoryResponse;
import com.prajwal.budgetflow.entity.Category;
import com.prajwal.budgetflow.repository.CategoryRepository;
import com.prajwal.budgetflow.service.CategoryService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public List<CategoryResponse> getAllCategories() {
        return categoryRepository.findAll()
                .stream()
                .map(c -> new CategoryResponse(c.getId(), c.getName()))
                .collect(Collectors.toList());
    }
}
