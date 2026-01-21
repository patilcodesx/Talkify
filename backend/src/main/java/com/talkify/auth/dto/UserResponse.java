package com.talkify.auth.dto;

public record UserResponse(
        Long id,
        String email,
        String username
) {}
