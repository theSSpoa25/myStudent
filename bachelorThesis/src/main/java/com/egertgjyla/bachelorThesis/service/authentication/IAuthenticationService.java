package com.egertgjyla.bachelorThesis.service.authentication;

import com.egertgjyla.bachelorThesis.domain.pojo.login.LoginRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public interface IAuthenticationService {
    public ResponseEntity<?> authenticateUser(LoginRequest loginRequest);
}
