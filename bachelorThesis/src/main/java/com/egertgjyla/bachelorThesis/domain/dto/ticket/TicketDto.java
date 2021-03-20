package com.egertgjyla.bachelorThesis.domain.dto.ticket;

import com.egertgjyla.bachelorThesis.domain.dto.user.OwnerDto;
import com.egertgjyla.bachelorThesis.domain.pojo.StatusPojo;
import com.egertgjyla.bachelorThesis.domain.pojo.TypePojo;
import lombok.Data;

import javax.persistence.Lob;
import java.sql.Blob;
import java.util.Date;

@Data
public class TicketDto {
    Long id;
    TypePojo type;
    StatusPojo status;
    String description;
    Date dueDate;
    String title;
    OwnerDto owner;
    OwnerDto assignedTo;
    Date createdAt;
    Date updatedAt;
}
