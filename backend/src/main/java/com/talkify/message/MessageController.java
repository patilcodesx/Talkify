package com.talkify.message;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.Authentication;


@RestController
@RequestMapping("/messages")
public class MessageController {

    @PostMapping
public String sendMessage(
        @RequestBody String message,
        Authentication auth) {

    String sender = auth.getName();
    return "Message sent by " + sender;
}

}
