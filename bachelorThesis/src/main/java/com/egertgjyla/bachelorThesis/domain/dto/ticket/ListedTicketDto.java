package com.egertgjyla.bachelorThesis.domain.dto.ticket;

import com.egertgjyla.bachelorThesis.domain.dto.user.OwnerDto;
import com.egertgjyla.bachelorThesis.domain.pojo.StatusPojo;
import com.egertgjyla.bachelorThesis.domain.pojo.TypePojo;

import java.util.Date;

public class ListedTicketDto {
    Long id;
    TypePojo type;
    StatusPojo status;
    Date dueDate;
    String title;
    OwnerDto owner;
    OwnerDto assignedTo;
    Date createdAt;
    Date updatedAt;
}
