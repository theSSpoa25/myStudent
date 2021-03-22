package com.egertgjyla.bachelorThesis.service.attachment;

import com.egertgjyla.bachelorThesis.config.other.ModelMapperConfig;
import com.egertgjyla.bachelorThesis.domain.dto.attachment.AttachmentDto;
import com.egertgjyla.bachelorThesis.domain.dto.comment.CommentDto;
import com.egertgjyla.bachelorThesis.domain.entity.*;
import com.egertgjyla.bachelorThesis.repository.AttachmentRepository;
import com.egertgjyla.bachelorThesis.repository.TicketRepository;
import com.egertgjyla.bachelorThesis.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.zip.DataFormatException;
import java.util.zip.Deflater;
import java.util.zip.Inflater;

@Service
public class AttachmentServiceImpl implements IAttachmentService {

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AttachmentRepository attachmentRepository;

    @Autowired
    private ModelMapperConfig modelMapperConfig;

    @Override
    @Transactional
    public void uploadAttachment(MultipartFile file, Long userId, Long ticketId) throws IOException {
       Ticket ticket = ticketRepository.getOne(ticketId);
       User user = userRepository.getOne(userId);

       Attachment attachment = new Attachment(file.getOriginalFilename(), file.getContentType(), compressBytes(file.getBytes()), user, ticket);
        Date date=new Date();
        attachment.setCreatedAt(new Timestamp(date.getTime()));
        attachment.setUpdatedAt(new Timestamp(date.getTime()));
       attachmentRepository.save(attachment);
    }

    @Override
    @Transactional
    public List<AttachmentDto> getAllAttachments(Long ticketId) {
        List<Attachment> attachments = attachmentRepository.getAllAttachments(ticketId);
        return  attachments
                    .stream()
                    .map(this::convertToDto)
                    .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public  Attachment getAttachment(Long id) {
        Attachment attachment = attachmentRepository.getOne(id);
        return new Attachment(
                attachment.getFileName(),
                attachment.getFileType(),
                decompressBytes(attachment.getData())
        );
    }

    private static byte[] compressBytes(byte[] data) {
        Deflater deflater = new Deflater();
        deflater.setInput(data);
        deflater.finish();

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[1024];

        while (!deflater.finished()) {
            int count = deflater.deflate(buffer);
            outputStream.write(buffer, 0, count);
        }

        try {
            outputStream.close();
        } catch (IOException ignored) {

        }

        return  outputStream.toByteArray();
    }

    private static  byte[] decompressBytes(byte[] data) {
        Inflater inflater = new Inflater();
        inflater.setInput(data);
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[1024];
        try {
            while (!inflater.finished()) {
                int count = inflater.inflate(buffer);
                outputStream.write(buffer, 0, count);
            }
            outputStream.close();
        } catch (IOException | DataFormatException ignored) {

        }
        return outputStream.toByteArray();
    }

    private AttachmentDto convertToDto(Attachment attachment) {
        return modelMapperConfig.modelMapper().map(attachment, AttachmentDto.class);
    }
}
