package com.egertgjyla.bachelorThesis.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Table(name = "attachments")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Attachment implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "file_name")
    private String fileName;

    @Column(name = "file_type")
    private String fileType;

    @Lob
    private byte[] data;

    @ManyToOne(targetEntity = User.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(targetEntity =  Ticket.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "ticet_id")
    private Ticket ticket;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private Date createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    private Date updatedAt;

    public Attachment(String path, String type, byte[] data, User user, Ticket ticket) {
        this.fileName = path;
        this.fileType = type;
        this.data = data;
        this.user = user;
        this.ticket = ticket;
    }

    public Attachment(String path, String fileType, byte[] data) {
        this.fileName = path;
        this.fileType = fileType;
        this.data = data;
    }

}
