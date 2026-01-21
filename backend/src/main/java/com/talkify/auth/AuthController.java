package com.talkify.auth;

import com.talkify.auth.dto.LoginRequest;
import com.talkify.auth.dto.LoginResponse;
import com.talkify.common.ApiResponse;
import com.talkify.security.JwtService;
import com.talkify.user.UserEntity;
import com.talkify.user.UserRepository;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthController(
            JwtService jwtService,
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {

        this.jwtService = jwtService;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // ✅ REGISTER
    @PostMapping("/register")
    public String register(@RequestBody LoginRequest request) {
        if (userRepository.findByEmail(request.email).isPresent()) {
    throw new RuntimeException("Email already exists");
}
 
        UserEntity user = new UserEntity();
        user.setEmail(request.email);
        user.setUsername(request.email.split("@")[0]);
        user.setPassword(passwordEncoder.encode(request.password));

        userRepository.save(user);

        return "User registered successfully";
    }

    // ✅ LOGIN
    @PostMapping("/login")
    public ApiResponse<LoginResponse> login(@RequestBody LoginRequest request) {

        UserEntity user = userRepository.findByEmail(request.email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        if (!passwordEncoder.matches(
                request.password,
                user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        String token = jwtService.generateToken(user.getEmail());

        return new ApiResponse<>(new LoginResponse(token));

    }
}
