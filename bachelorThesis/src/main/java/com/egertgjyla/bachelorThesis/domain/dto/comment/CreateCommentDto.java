package com.egertgjyla.bachelorThesis.domain.dto.comment;

import lombok.Data;

@Data
public class CreateCommentDto {
    Long ticketId;
    Long userId;
    String comment;
}
