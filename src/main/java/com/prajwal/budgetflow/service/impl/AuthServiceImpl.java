package com.prajwal.budgetflow.service.impl;

import com.prajwal.budgetflow.dto.AuthRequest;
import com.prajwal.budgetflow.dto.AuthResponse;
import com.prajwal.budgetflow.dto.RegisterRequest;
import com.prajwal.budgetflow.entity.User;
import com.prajwal.budgetflow.repository.UserRepository;
import com.prajwal.budgetflow.service.AuthService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public AuthServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists.");
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .build();

        userRepository.save(user);
    }

    @Override
    public AuthResponse login(AuthRequest request) {
        throw new UnsupportedOperationException("Login will be implemented in the next milestone.");
    }
}