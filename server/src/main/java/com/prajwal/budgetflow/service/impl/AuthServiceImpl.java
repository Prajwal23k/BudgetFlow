package com.prajwal.budgetflow.service.impl;

import com.prajwal.budgetflow.dto.AuthRequest;
import com.prajwal.budgetflow.dto.AuthResponse;
import com.prajwal.budgetflow.dto.RegisterRequest;
import com.prajwal.budgetflow.entity.User;
import com.prajwal.budgetflow.repository.UserRepository;
import com.prajwal.budgetflow.service.AuthService;
import com.prajwal.budgetflow.util.JwtUtil;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.prajwal.budgetflow.exception.DuplicateResourceException;
import com.prajwal.budgetflow.exception.UnauthorizedException;


@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthServiceImpl(UserRepository userRepository,
                           BCryptPasswordEncoder passwordEncoder,
                           JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    @Override
    public void register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateResourceException("Email already exists.");
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

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password."));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new UnauthorizedException("Invalid email or password.");
        }

        String token = jwtUtil.generateToken(user.getEmail());

        return AuthResponse.builder()
                .token(token)
                .message("Login successful.")
                .build();
    }
}