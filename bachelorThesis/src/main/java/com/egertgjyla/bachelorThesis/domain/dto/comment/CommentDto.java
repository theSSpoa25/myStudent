package com.egertgjyla.bachelorThesis.domain.dto.comment;

import com.egertgjyla.bachelorThesis.domain.dto.user.OwnerDto;
import lombok.Data;

import java.util.Date;

@Data
public class CommentDto {
    Long id;
    OwnerDto User;
    String comment;
    Date createdAt;
}
