package com.egertgjyla.bachelorThesis.api;

import com.egertgjyla.bachelorThesis.domain.dto.user.CreateUserRequest;
import com.egertgjyla.bachelorThesis.domain.dto.user.UpdateUserRequest;
import com.egertgjyla.bachelorThesis.domain.entity.User;
import com.egertgjyla.bachelorThesis.domain.pojo.login.LoginResponse;
import com.egertgjyla.bachelorThesis.domain.pojo.user.UserCreate;
import com.egertgjyla.bachelorThesis.repository.UserRepository;
import com.egertgjyla.bachelorThesis.service.user.IUserService;
import com.egertgjyla.bachelorThesis.service.user.UserServiceImpl;
import net.kaczmarzyk.spring.data.jpa.domain.Equal;
import net.kaczmarzyk.spring.data.jpa.domain.Like;
import net.kaczmarzyk.spring.data.jpa.web.annotation.And;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Spec;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.*;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
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
    public ResponseEntity<Long> createUser(@RequestBody CreateUserRequest userCreate) {
      Long createdUserId = this.userService.createUser(userCreate);

       return ResponseEntity.ok(createdUserId);
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllUsers() {
        List<User> users = userRepository.findAll();

        return ResponseEntity.ok(users);
    }

    @GetMapping(path = {"/{id}"})
    public ResponseEntity<Optional<User>> getUser(@PathVariable(name = "id", required = true) Long id) {
        Optional<User> user = userRepository.findById(id);
        return ResponseEntity.ok(user);
    }

    @Transactional
    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<List<User>> get(
            @And({
                    @Spec(path = "username", params = "username", spec = Like.class),
                    @Spec(path = "id", params = "id", spec = Equal.class),
                    @Spec(path = "email", params = "email", spec = Like.class),
            }) Specification<User> specification,
            Sort sort,
            @RequestHeader HttpHeaders headers
            ) {

        final List<User> response = userService.searchUser(specification, headers);

        return ResponseEntity.ok(response);
    }

    @RequestMapping(path="/update/{id}")
    public ResponseEntity<?> updateUser(@PathVariable(name = "id", required = true) Long id, @RequestBody UpdateUserRequest updateUserRequest) {
        Boolean updated = userService.updateUser(updateUserRequest, id);

        return ResponseEntity.ok(HttpStatus.OK);
    }
}
