package com.egertgjyla.bachelorThesis.service.picture;

import com.egertgjyla.bachelorThesis.domain.dto.picture.ProfilePicture;
import com.egertgjyla.bachelorThesis.domain.entity.Picture;
import org.springframework.context.annotation.Profile;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface IPictureService {
    void uploadProfilePicture(MultipartFile file, Long userId) throws IOException;
    ProfilePicture getProfilePicture(Long id);
}
