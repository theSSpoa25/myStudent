package com.egertgjyla.bachelorThesis.api;

import com.egertgjyla.bachelorThesis.domain.pojo.login.LoginRequest;
import com.egertgjyla.bachelorThesis.service.authentication.AuthenticationServiceImpl;
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

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        return this.authenticationService.authenticateUser(loginRequest);
    }

    @GetMapping("/test")
    public ResponseEntity<?> getTest() {
        return ResponseEntity.ok(HttpEntity.EMPTY);
    }

}
