package com.egertgjyla.bachelorThesis.domain.dto.user;

import com.egertgjyla.bachelorThesis.domain.entity.Role;
import lombok.Data;

import java.util.List;

@Data
public class UpdateUserRequest {
    private String username;
    private String email;
    private List<String> roles;
    private String name;
    private String surname;
    private String address;
}
