package com.egertgjyla.bachelorThesis.service.user;

import com.egertgjyla.bachelorThesis.domain.entity.Role;
import com.egertgjyla.bachelorThesis.domain.entity.User;
import com.egertgjyla.bachelorThesis.domain.entity.UserRole;
import com.egertgjyla.bachelorThesis.domain.pojo.user.UserCreate;
import com.egertgjyla.bachelorThesis.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpHeaders;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service("userService")
public class UserServiceImpl implements  IUserService{
    @Autowired
    UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public void createUser(UserCreate userCreate) {
        User user = new User(
                userCreate.getUsername(),
                userCreate.getEmail(),
                passwordEncoder.encode(userCreate.getPassword())
        );

        for (String role : userCreate.getRoles()) {
            UserRole userRole = UserRole.valueOf(role);
            Role newRole = new Role(userRole);
            user.getRoles().add(newRole);
        }

        this.userRepository.saveAndFlush(user);
    }

    @Override
    public List<User> searchUser(Specification<User> userSpecification, HttpHeaders headers) {
        return userRepository.findAll(userSpecification);
    }
}
