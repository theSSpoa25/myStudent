package com.egertgjyla.bachelorThesis.api;

import com.egertgjyla.bachelorThesis.domain.dto.attachment.AttachmentDto;
import com.egertgjyla.bachelorThesis.domain.dto.picture.ProfilePicture;
import com.egertgjyla.bachelorThesis.domain.entity.Attachment;
import com.egertgjyla.bachelorThesis.service.attachment.IAttachmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Controller
@RequestMapping("/api/attachment")
public class AttachmentResource {

    @Autowired
    private IAttachmentService attachmentService;

    @PostMapping(value = "/upload/{userId}/{ticketId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> uploadAttachment(@PathVariable(name = "userId", required = true) Long userId, @PathVariable(name = "ticketId", required = true) Long ticketId, @RequestParam MultipartFile file) {
        try {
            attachmentService.uploadAttachment(file, userId, ticketId);
        } catch (IOException ignored) {
        }
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @GetMapping("/all/{ticketId}")
    public ResponseEntity<List<AttachmentDto>> getAllAttachments(@PathVariable(name = "ticketId", required = true) Long ticketId) {
        List<AttachmentDto> attachmentDtoList = attachmentService.getAllAttachments(ticketId);
        return ResponseEntity.ok(attachmentDtoList);
    }

    @GetMapping( value = "/{id}")
    public ResponseEntity<?> getAttachment(@PathVariable(name = "id", required = true) Long id) {
        Attachment attachment = attachmentService.getAttachment(id);
        return ResponseEntity.ok(attachment);
    }
}
