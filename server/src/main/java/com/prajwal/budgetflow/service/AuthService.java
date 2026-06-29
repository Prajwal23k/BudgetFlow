package com.prajwal.budgetflow.service;

import com.prajwal.budgetflow.dto.AuthRequest;
import com.prajwal.budgetflow.dto.AuthResponse;
import com.prajwal.budgetflow.dto.RegisterRequest;

public interface AuthService {

    void register(RegisterRequest request);

    AuthResponse login(AuthRequest request);
}