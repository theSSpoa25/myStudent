package com.egertgjyla.bachelorThesis.service.user;

import com.egertgjyla.bachelorThesis.domain.dto.user.CreateUserRequest;
import com.egertgjyla.bachelorThesis.domain.dto.user.UpdateUserRequest;
import com.egertgjyla.bachelorThesis.domain.entity.Role;
import com.egertgjyla.bachelorThesis.domain.entity.User;
import com.egertgjyla.bachelorThesis.domain.entity.UserRole;
import com.egertgjyla.bachelorThesis.repository.RoleRepository;
import com.egertgjyla.bachelorThesis.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpHeaders;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service("userService")
public class UserServiceImpl implements  IUserService{
    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Long createUser(CreateUserRequest userCreate) {
        User user = new User(
                userCreate.getUsername(),
                userCreate.getEmail(),
                userCreate.getAddress(),
                userCreate.getName(),
                userCreate.getSurname(),
                passwordEncoder.encode(userCreate.getPassword())
        );

        for (String role : userCreate.getRoles()) {
            UserRole userRole = UserRole.valueOf(role);
            Role newRole = new Role(userRole);
            user.getRoles().add(newRole);
        }

        User savedUser = this.userRepository.saveAndFlush(user);
        return savedUser.getId();
    }

    @Override
    public List<User> searchUser(Specification<User> userSpecification, HttpHeaders headers) {
        return userRepository.findAll(userSpecification);
    }

    @Override
    public Boolean updateUser(UpdateUserRequest userRequest, Long id) {
        Optional<User> optionalUser = userRepository.findById(id);


        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setName(userRequest.getName());
            user.setSurname(userRequest.getSurname());
            user.setUsername(userRequest.getUsername());
            user.setAddress(userRequest.getAddress());
            user.setEmail(userRequest.getEmail());
            userRepository.save(user);
            return true;
        }
        return false;
    }
}
