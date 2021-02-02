package com.egertgjyla.bachelorThesis.domain.entity;

import com.sun.istack.Nullable;
import lombok.AllArgsConstructor;
import lombok.Data;

import javax.persistence.*;
import java.sql.Blob;
import java.sql.Date;

@Entity(name = "picture")
@Data
public class Picture {
    @Id
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

    @OneToOne(mappedBy = "picture", cascade =  CascadeType.ALL, fetch = FetchType.LAZY, optional = false)
    @MapsId
    private User user;

    public Picture(String path, String type, byte[] data) {
        this.path = path;
        this.type = type;
        this.data = data;
    }
}
