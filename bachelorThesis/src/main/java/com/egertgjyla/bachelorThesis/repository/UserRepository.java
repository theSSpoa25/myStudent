package com.egertgjyla.bachelorThesis.repository;

import com.egertgjyla.bachelorThesis.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Struct;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long>, JpaSpecificationExecutor<User> {
    Optional<User> findByUsername(String username);

    @Query(value = "select * from users u \n" +
            "left join user_roles ur \n" +
            "on u.id = ur.user_id \n" +
            "inner join roles r \n" +
            "on ur.role_id = r.id\n" +
            "where u.name LIKE %:term%\n" +
            "or r.role like  %:term%\n" +
            "order by ur.user_id asc;",
    nativeQuery = true)
    List<User> findUsersByNameOrUsernameOrRole(@Param("term") String term);
}
