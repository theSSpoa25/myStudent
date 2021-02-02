package com.egertgjyla.bachelorThesis.service.picture;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface IPictureService {
    void uploadProfilePicture(MultipartFile file, Long userId) throws IOException;
}
