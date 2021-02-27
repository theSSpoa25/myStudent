package com.egertgjyla.bachelorThesis.domain.entity;

import com.sun.istack.Nullable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Blob;
import java.sql.Date;

@Entity()
@Table(name = "pictures")
@Data
@Getter
public class Picture implements Serializable {
    @Id
    @Column(name = "user_id")
    private Long id;

    @Nullable
    @Column(name = "created_on")
    private Date createdOn;

    @Nullable
    @Column(name = "updated_on")
    private Date updatedOn;

    @Column(name = "path")
    private String path;

    @Column(name = "type")
    private String type;

    @Lob
    private byte[] data;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @MapsId
    @JoinColumn(name = "user_id")
    private User user;


    public Picture() {};

    public Picture(String path, String type, byte[] data, User user) {
        this.path = path;
        this.type = type;
        this.data = data;
        this.user = user;
    }
}
