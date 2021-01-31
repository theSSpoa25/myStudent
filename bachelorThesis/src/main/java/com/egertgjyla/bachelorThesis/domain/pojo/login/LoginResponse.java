package com.egertgjyla.bachelorThesis.domain.pojo.login;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class LoginResponse {
    private String token;
    private final String type = "Bearer";
    private Long id;
    private String username;
    private String email;
    private List<String> roles;
    private String name;
    private String surname;
    private String address;
    private Boolean active;
}
