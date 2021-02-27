package com.egertgjyla.bachelorThesis.domain.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
import com.sun.istack.Nullable;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;
import javax.validation.constraints.Email;
import javax.validation.constraints.Size;


@Entity
@Table(name = "users")
@Data
public class User implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(max = 20)
    private String username;

    @NotNull
    private String name;

    @NotNull
    private String surname;

    @NotNull
    @Email
    private String email;

    @JsonIgnore
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    @PrimaryKeyJoinColumn
    private Picture picture;

    public Picture getPicture() {
        return picture;
    }

    public void setPicture(Picture picture) {
        this.picture = picture;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    @Nullable
    private String address;

    @NotNull
    @JsonIgnore
    private String password;

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(	name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();

    @Column(columnDefinition = "boolean default true")
    private Boolean active;

    @OneToMany(mappedBy = "owner")
    private Set<Ticket> ownerTickets = new HashSet<>();

    @OneToMany(mappedBy = "assignedTo")
    private Set<Ticket> assignedToTickets = new HashSet<>();

    public User() {
    }

    public User(String username, String email, String password, String name, String surname, String address) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.address = address;
        this.name = name;
        this.surname = surname;
        this.active = true;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof User)) return false;
        User user = (User) o;
        return Objects.equals(id, user.id) && Objects.equals(username, user.username) && Objects.equals(name, user.name) && Objects.equals(surname, user.surname) && Objects.equals(email, user.email) && Objects.equals(address, user.address) && Objects.equals(password, user.password) && Objects.equals(roles, user.roles) && Objects.equals(active, user.active);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, username, name, surname, email, address, password, roles, active);
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }
}
