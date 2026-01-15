package com.talkify.auth;

import com.talkify.auth.dto.LoginRequest;
import com.talkify.auth.dto.LoginResponse;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/auth")
public class AuthController {

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request){
        // TEMP: JWT later
        return new LoginResponse("dummy-jwt-token");
    }

    @PostMapping("/register")
    public String register(){
        return "User registered";
    }
}
