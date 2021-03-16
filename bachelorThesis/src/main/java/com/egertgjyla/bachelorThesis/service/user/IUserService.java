package com.egertgjyla.bachelorThesis.service.user;

import com.egertgjyla.bachelorThesis.domain.dto.user.CreateUserRequest;
import com.egertgjyla.bachelorThesis.domain.dto.user.UpdateUserRequest;
import com.egertgjyla.bachelorThesis.domain.entity.User;
import com.egertgjyla.bachelorThesis.domain.pojo.user.UserCreate;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;

import java.util.List;

public interface IUserService {
    Long createUser(CreateUserRequest createUser);
    List<User> searchUser(Specification<User> userSpecification, HttpHeaders httpHeaders);
    Boolean updateUser(UpdateUserRequest updateUser, Long id);
    Boolean activateUser(Long id);
    Boolean deactivateUser(Long id);
    List<User> searchUsersByNameOrSurnameOrRole(String term);
}
