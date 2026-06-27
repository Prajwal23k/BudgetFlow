package com.prajwal.budgetflow.controller;

import com.prajwal.budgetflow.dto.ExpenseRequest;
import com.prajwal.budgetflow.dto.ExpenseResponse;
import com.prajwal.budgetflow.service.ExpenseService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {

    private final ExpenseService expenseService;

    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    @PostMapping
    public ResponseEntity<ExpenseResponse> addExpense(
            @Valid @RequestBody ExpenseRequest request) {

        ExpenseResponse response = expenseService.addExpense(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @PutMapping("/{expenseId}")
    public ResponseEntity<ExpenseResponse> updateExpense(
            @PathVariable Long expenseId,
            @Valid @RequestBody ExpenseRequest request) {

        ExpenseResponse response =
                expenseService.updateExpense(expenseId, request);

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{expenseId}")
    public ResponseEntity<Void> deleteExpense(
            @PathVariable Long expenseId) {

        expenseService.deleteExpense(expenseId);

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{expenseId}")
    public ResponseEntity<ExpenseResponse> getExpense(
            @PathVariable Long expenseId) {

        ExpenseResponse response =
                expenseService.getExpense(expenseId);

        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<Page<ExpenseResponse>> getAllExpenses(

            @RequestParam(defaultValue = "0") int page,

            @RequestParam(defaultValue = "10") int size,

            @RequestParam(defaultValue = "date") String sortBy,

            @RequestParam(defaultValue = "desc") String sortDirection) {

        return ResponseEntity.ok(

                expenseService.getAllExpenses(
                        page,
                        size,
                        sortBy,
                        sortDirection)

        );
    }

    @GetMapping("/search")
    public ResponseEntity<Page<ExpenseResponse>> searchExpenses(

            @RequestParam String title,

            @RequestParam(defaultValue = "0") int page,

            @RequestParam(defaultValue = "10") int size) {

        return ResponseEntity.ok(
                expenseService.searchByTitle(title, page, size));
    }

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<Page<ExpenseResponse>> filterByCategory(

            @PathVariable Long categoryId,

            @RequestParam(defaultValue = "0") int page,

            @RequestParam(defaultValue = "10") int size) {

        return ResponseEntity.ok(
                expenseService.filterByCategory(
                        categoryId,
                        page,
                        size));
    }
}