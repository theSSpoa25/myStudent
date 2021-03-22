package com.egertgjyla.bachelorThesis.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Date;

@Entity()
@Table(name = "tickets")
@Data
@NoArgsConstructor()
@AllArgsConstructor()
@EnableJpaAuditing()
public class Ticket implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 300)
    private String title;

    @Column(columnDefinition = "clob")
    private String description;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    private User owner;

    @ManyToOne
    @JoinColumn(name = "assigned_user_id")
    private User assignedTo;

    @OneToOne(targetEntity = Priority.class, cascade = CascadeType.ALL ,fetch=FetchType.LAZY)
    @JoinColumn(name="priority_id")
    private Priority priority;

    @OneToOne(targetEntity = Status.class, cascade = CascadeType.ALL ,fetch=FetchType.LAZY)
    @JoinColumn(name="status_id")
    private Status status;

    @OneToOne(targetEntity = Type.class, cascade = CascadeType.ALL ,fetch=FetchType.LAZY)
    @JoinColumn(name="type_id")
    private Type type;

    @Column(name = "due_date", nullable = true, updatable = true)
    private Date dueDate;

    @CreatedDate
    @Column(name = "created_at", nullable = true, updatable = false)
    private Date createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    private Date updatedAt;

    public Ticket(String title, String description, Date dueDate) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
    }
}
