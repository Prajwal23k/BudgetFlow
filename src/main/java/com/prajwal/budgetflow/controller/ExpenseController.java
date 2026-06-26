package com.prajwal.budgetflow.controller;

import com.prajwal.budgetflow.dto.ExpenseRequest;
import com.prajwal.budgetflow.dto.ExpenseResponse;
import com.prajwal.budgetflow.service.ExpenseService;
import jakarta.validation.Valid;
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
}