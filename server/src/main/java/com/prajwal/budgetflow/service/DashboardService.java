package com.prajwal.budgetflow.service;

import com.prajwal.budgetflow.dto.DashboardResponse;

public interface DashboardService {

    DashboardResponse getDashboard(
            Integer month,
            Integer year);
}