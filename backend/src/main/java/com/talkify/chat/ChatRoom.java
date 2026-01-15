package com.talkify.chat;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class ChatRoom {

    @Id@GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;
    public String name;
}
