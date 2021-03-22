package com.egertgjyla.bachelorThesis.service.comment;

import com.egertgjyla.bachelorThesis.domain.dto.comment.CommentDto;
import com.egertgjyla.bachelorThesis.domain.dto.comment.CreateCommentDto;

import java.util.List;

public interface IcommentService {
    void createComment(CreateCommentDto createCommentDto);
    List<CommentDto> getAll(Long ticketId);
}
