package com.talkify.common;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ApiResponse<String>> handleRuntime(
            RuntimeException ex) {

        return ResponseEntity
                .badRequest()
                .body(new ApiResponse<>(ex.getMessage()));
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ApiResponse<String>> handleDuplicateEmail() {

        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(new ApiResponse<>("Email already exists"));
    }
}
