package com.egertgjyla.bachelorThesis.service.user;

import com.egertgjyla.bachelorThesis.domain.pojo.user.UserCreate;
import org.springframework.stereotype.Service;

public interface IUserService {
    void createUser(UserCreate createUser);
}
