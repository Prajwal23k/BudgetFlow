package com.prajwal.budgetflow.controller;

import com.prajwal.budgetflow.dto.IncomeRequest;
import com.prajwal.budgetflow.dto.IncomeResponse;
import com.prajwal.budgetflow.service.IncomeService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/incomes")
public class IncomeController {

    private final IncomeService incomeService;

    public IncomeController(IncomeService incomeService) {
        this.incomeService = incomeService;
    }

    @PostMapping
    public ResponseEntity<IncomeResponse> addIncome(
            @Valid @RequestBody IncomeRequest request) {

        IncomeResponse response = incomeService.addIncome(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }
}