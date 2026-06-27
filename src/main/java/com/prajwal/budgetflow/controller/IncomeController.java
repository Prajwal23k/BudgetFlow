package com.prajwal.budgetflow.controller;

import com.prajwal.budgetflow.dto.IncomeRequest;
import com.prajwal.budgetflow.dto.IncomeResponse;
import com.prajwal.budgetflow.service.IncomeService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
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

    @PutMapping("/{incomeId}")
    public ResponseEntity<IncomeResponse> updateIncome(
            @PathVariable Long incomeId,
            @Valid @RequestBody IncomeRequest request) {

        return ResponseEntity.ok(
                incomeService.updateIncome(incomeId, request));
    }

    @DeleteMapping("/{incomeId}")
    public ResponseEntity<Void> deleteIncome(
            @PathVariable Long incomeId) {

        incomeService.deleteIncome(incomeId);

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{incomeId}")
    public ResponseEntity<IncomeResponse> getIncome(
            @PathVariable Long incomeId) {

        return ResponseEntity.ok(
                incomeService.getIncome(incomeId));
    }

    @GetMapping
    public ResponseEntity<Page<IncomeResponse>> getAllIncomes(

            @RequestParam(defaultValue = "0") int page,

            @RequestParam(defaultValue = "10") int size,

            @RequestParam(defaultValue = "date") String sortBy,

            @RequestParam(defaultValue = "desc") String sortDirection) {

        return ResponseEntity.ok(
                incomeService.getAllIncomes(
                        page,
                        size,
                        sortBy,
                        sortDirection));
    }

    @GetMapping("/search")
    public ResponseEntity<Page<IncomeResponse>> searchIncome(

            @RequestParam String title,

            @RequestParam(defaultValue = "0") int page,

            @RequestParam(defaultValue = "10") int size) {

        return ResponseEntity.ok(
                incomeService.searchByTitle(
                        title,
                        page,
                        size));
    }
}