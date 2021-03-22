package com.egertgjyla.bachelorThesis.api;

import com.egertgjyla.bachelorThesis.domain.dto.comment.CommentDto;
import com.egertgjyla.bachelorThesis.domain.dto.comment.CreateCommentDto;
import com.egertgjyla.bachelorThesis.domain.dto.ticket.CreateTicketDto;
import com.egertgjyla.bachelorThesis.domain.entity.Comment;
import com.egertgjyla.bachelorThesis.domain.entity.User;
import com.egertgjyla.bachelorThesis.service.comment.IcommentService;
import liquibase.pro.packaged.A;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/api/comment")
public class CommentResource {

    @Autowired
    private IcommentService commentService;

    @PostMapping("/create")
    public ResponseEntity<?> createComment(@RequestBody CreateCommentDto createCommentDto) {
        commentService.createComment(createCommentDto);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @GetMapping(path = {"/all/ticket/{id}"})
    public ResponseEntity<List<CommentDto>> getUser(@PathVariable(name = "id", required = true) Long id) {
        List<CommentDto> commentDtoList = commentService.getAll(id);
        return ResponseEntity.ok(commentDtoList);
    }

}
