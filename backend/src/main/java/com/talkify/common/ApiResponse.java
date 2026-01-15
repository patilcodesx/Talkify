package com.talkify.common;

public class ApiResponse<T>{

    public boolean success;
    public T data;

    public ApiResponse(T data){
        this.success = true;
        this.data = data;
    }
}
