package com.talkify.user;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.talkify.auth.dto.UserResponse;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserRepository repository;

    public UserController(UserRepository repository){
        this.repository = repository;
    }

   @GetMapping
public List<UserResponse> getAllUsers() {
    return repository.findAll()
            .stream()
            .map(u -> new UserResponse(
                    u.getId(),
                    u.getEmail(),
                    u.getUsername()))
            .toList();
}

}
