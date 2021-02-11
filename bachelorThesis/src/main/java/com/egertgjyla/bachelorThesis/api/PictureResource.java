package com.egertgjyla.bachelorThesis.api;

import com.egertgjyla.bachelorThesis.domain.dto.picture.ChangePictureDto;
import com.egertgjyla.bachelorThesis.domain.dto.picture.ProfilePicture;
import com.egertgjyla.bachelorThesis.domain.entity.Picture;
import com.egertgjyla.bachelorThesis.service.picture.IPictureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/profile")
public class PictureResource {

    @Autowired
    IPictureService pictureService;

    @PostMapping(value = "/upload/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> uploadProfilePicture(@PathVariable(name = "id", required = true) Long id, @RequestParam MultipartFile file) {
        try {
            pictureService.uploadProfilePicture(file, id);
        } catch (IOException ioException) {

        }
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @GetMapping( value = "/{id}")
    public ResponseEntity<?> getProfilePicture(@PathVariable(name = "id", required = true) Long id) {
        ProfilePicture profilePicture = pictureService.getProfilePicture(id);

        if (profilePicture != null) {
            return ResponseEntity.ok(profilePicture);
        }

        return ResponseEntity.ok(HttpStatus.OK);
    }


}
