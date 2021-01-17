package com.egertgjyla.bachelorThesis.domain.pojo.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserCreate {
    String username;
    String email;
    List<String> roles;
    String password;
    String confirm;
}
