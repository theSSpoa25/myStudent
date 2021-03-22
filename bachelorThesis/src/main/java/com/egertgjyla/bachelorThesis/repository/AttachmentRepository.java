package com.egertgjyla.bachelorThesis.repository;

import com.egertgjyla.bachelorThesis.domain.entity.Attachment;
import com.egertgjyla.bachelorThesis.domain.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AttachmentRepository extends JpaRepository<Attachment, Long> {
    @Query(value = "SELECT a FROM Attachment a WHERE a.ticket.id = :ticketId")
    List<Attachment> getAllAttachments(@Param("ticketId") Long ticketId);
}
