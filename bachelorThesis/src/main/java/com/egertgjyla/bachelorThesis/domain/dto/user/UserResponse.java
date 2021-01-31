package com.egertgjyla.bachelorThesis.domain.dto.user;

import lombok.Data;

import java.util.List;

@Data
public class UserResponse {
    String username;
    String email;
    String name;
    String surname;
    String address;
    Boolean active;
    List<String> roles;
    String password;
}
