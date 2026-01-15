package com.talkify.notification;

import org.springframework.stereotype.Service;

@Service
public class NotificationService {

    public void notifyUser(String userId, String message){
        // future: push/email/websocket
    }
}
