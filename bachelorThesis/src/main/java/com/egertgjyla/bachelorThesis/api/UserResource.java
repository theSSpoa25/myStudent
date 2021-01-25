package com.egertgjyla.bachelorThesis.api;

import com.egertgjyla.bachelorThesis.domain.entity.User;
import com.egertgjyla.bachelorThesis.domain.pojo.login.LoginResponse;
import com.egertgjyla.bachelorThesis.domain.pojo.user.UserCreate;
import com.egertgjyla.bachelorThesis.repository.UserRepository;
import com.egertgjyla.bachelorThesis.service.user.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
public class UserResource {
    @Autowired
    IUserService userService;

    @Autowired
    UserRepository userRepository;

    @PostMapping("/create")
    public ResponseEntity<?> createUser(@RequestBody UserCreate userCreate) {
       this.userService.createUser(userCreate);

       return ResponseEntity.ok(HttpEntity.EMPTY);
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllUsers() {
        List<User> users = userRepository.findAll();

        return ResponseEntity.ok(users);
    }

    @GetMapping(path = {"/{id}"})
    public ResponseEntity<?> getUser(@PathVariable(name = "id", required = true) Long id) {
        Optional<User> user = userRepository.findById(id);

        return ResponseEntity.ok(user);

    }


}
