package com.prajwal.budgetflow.service;

import com.prajwal.budgetflow.dto.CategoryResponse;

import java.util.List;

public interface CategoryService {

    List<CategoryResponse> getAllCategories();
}