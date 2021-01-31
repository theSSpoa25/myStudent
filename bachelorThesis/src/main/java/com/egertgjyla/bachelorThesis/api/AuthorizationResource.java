package com.egertgjyla.bachelorThesis.api;

import com.egertgjyla.bachelorThesis.domain.pojo.login.LoginRequest;
import com.egertgjyla.bachelorThesis.domain.pojo.user.UserCreate;
import com.egertgjyla.bachelorThesis.service.authentication.AuthenticationServiceImpl;
import com.egertgjyla.bachelorThesis.service.user.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthorizationResource {

    @Autowired
    AuthenticationServiceImpl authenticationService;

    @Autowired
    IUserService userService;


    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        return this.authenticationService.authenticateUser(loginRequest);
    }
}
