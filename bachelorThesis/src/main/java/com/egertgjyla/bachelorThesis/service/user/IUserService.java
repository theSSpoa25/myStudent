package com.egertgjyla.bachelorThesis.service.user;

import com.egertgjyla.bachelorThesis.domain.entity.User;
import com.egertgjyla.bachelorThesis.domain.pojo.user.UserCreate;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpHeaders;

import java.util.List;

public interface IUserService {
    void createUser(UserCreate createUser);
    List<User> searchUser(Specification<User> userSpecification, HttpHeaders httpHeaders);
}
