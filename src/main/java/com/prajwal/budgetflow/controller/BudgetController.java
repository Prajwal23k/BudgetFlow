package com.prajwal.budgetflow.controller;

import com.prajwal.budgetflow.dto.BudgetRequest;
import com.prajwal.budgetflow.dto.BudgetResponse;
import com.prajwal.budgetflow.service.BudgetService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/budgets")
public class BudgetController {

    private final BudgetService budgetService;

    public BudgetController(BudgetService budgetService) {
        this.budgetService = budgetService;
    }

    @PostMapping
    public ResponseEntity<BudgetResponse> saveBudget(
            @Valid @RequestBody BudgetRequest request) {

        BudgetResponse response = budgetService.saveBudget(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @GetMapping
    public ResponseEntity<Page<BudgetResponse>> getAllBudgets(

            @RequestParam(defaultValue = "0") int page,

            @RequestParam(defaultValue = "10") int size,

            @RequestParam(defaultValue = "month") String sortBy,

            @RequestParam(defaultValue = "asc") String sortDirection) {

        return ResponseEntity.ok(
                budgetService.getAllBudgets(
                        page,
                        size,
                        sortBy,
                        sortDirection));
    }

    @GetMapping("/{budgetId}")
    public ResponseEntity<BudgetResponse> getBudget(
            @PathVariable Long budgetId) {

        return ResponseEntity.ok(
                budgetService.getBudget(budgetId));
    }

    @DeleteMapping("/{budgetId}")
    public ResponseEntity<Void> deleteBudget(
            @PathVariable Long budgetId) {

        budgetService.deleteBudget(budgetId);

        return ResponseEntity.noContent().build();
    }

}