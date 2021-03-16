package com.egertgjyla.bachelorThesis.domain.dto.ticket;

import com.egertgjyla.bachelorThesis.domain.pojo.TypePojo;
import lombok.Data;

import java.util.Date;

@Data
public class CreateTicketDto {
    private String title;
    private TypePojo type;
    private String summary;
    private Long assigneeId;
    private Long ownerId;
    private Date dueDate;
}
