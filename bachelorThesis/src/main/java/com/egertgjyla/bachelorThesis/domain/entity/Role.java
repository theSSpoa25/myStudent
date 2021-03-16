package com.egertgjyla.bachelorThesis.domain.entity;

import com.sun.istack.NotNull;
import org.codehaus.jackson.annotate.JsonIgnore;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="roles")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    @NotNull
    private UserRole role;

    @ManyToMany(fetch = FetchType.LAZY)
    Set<User> user = new HashSet<>();

    public Set<User> getUser() {
        return user;
    }

    public void setUser(Set<User> user) {
        this.user = user;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public UserRole getRole() {
        return role;
    }

    public void setRole(UserRole role) {
        this.role = role;
    }

    public Role() {
    }

    public Role(UserRole role) {
        this.role = role;
    }
}
