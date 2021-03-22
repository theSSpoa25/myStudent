package com.egertgjyla.bachelorThesis.service.comment;

import com.egertgjyla.bachelorThesis.config.other.ModelMapperConfig;
import com.egertgjyla.bachelorThesis.domain.dto.comment.CommentDto;
import com.egertgjyla.bachelorThesis.domain.dto.comment.CreateCommentDto;
import com.egertgjyla.bachelorThesis.domain.dto.ticket.TicketDto;
import com.egertgjyla.bachelorThesis.domain.entity.Comment;
import com.egertgjyla.bachelorThesis.domain.entity.Ticket;
import com.egertgjyla.bachelorThesis.domain.entity.User;
import com.egertgjyla.bachelorThesis.repository.CommentRepository;
import com.egertgjyla.bachelorThesis.repository.TicketRepository;
import com.egertgjyla.bachelorThesis.repository.UserRepository;
import liquibase.pro.packaged.A;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentServiceImpl implements IcommentService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private ModelMapperConfig modelMapperConfig;

    @Override
    @Transactional
    public void createComment(CreateCommentDto createCommentDto) {
        Ticket ticket = ticketRepository.getOne(createCommentDto.getTicketId());
        User user = userRepository.getOne(createCommentDto.getUserId());

        Comment comment = new Comment(
                createCommentDto.getComment(),
                user,
                ticket
        );

        Date date=new Date();
        comment.setCreatedAt(new Timestamp(date.getTime()));
        comment.setUpdatedAt(new Timestamp(date.getTime()));

        commentRepository.save(comment);
    }

    @Override
    @Transactional
    public List<CommentDto> getAll(Long ticketId) {
        List<Comment> comments = commentRepository.getAllComment(ticketId);
        return  comments
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    private CommentDto convertToDto(Comment comment) {
        return modelMapperConfig.modelMapper().map(comment, CommentDto.class);
    }
}
