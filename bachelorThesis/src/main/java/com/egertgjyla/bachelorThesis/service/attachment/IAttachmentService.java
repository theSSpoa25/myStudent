package com.egertgjyla.bachelorThesis.service.attachment;

import com.egertgjyla.bachelorThesis.domain.dto.attachment.AttachmentDto;
import com.egertgjyla.bachelorThesis.domain.entity.Attachment;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface IAttachmentService {
    void uploadAttachment(MultipartFile file, Long userId, Long ticketId) throws IOException;
    List<AttachmentDto> getAllAttachments(Long tickedId);
    Attachment getAttachment(Long id);
}
