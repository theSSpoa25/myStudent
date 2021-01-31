package com.egertgjyla.bachelorThesis.domain.dto.user;

import lombok.Data;

import java.util.List;

@Data
public class CreateUserRequest {
    String username;
    String email;
    List<String> roles;
    String password;
    String confirm;
    String address;
    String name;
    String surname;
}
