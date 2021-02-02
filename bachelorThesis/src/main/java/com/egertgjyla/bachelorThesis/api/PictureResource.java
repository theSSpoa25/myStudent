package com.egertgjyla.bachelorThesis.api;

import com.egertgjyla.bachelorThesis.domain.dto.picture.ChangePictureDto;
import com.egertgjyla.bachelorThesis.service.picture.IPictureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/profile")
public class PictureResource {

    @Autowired
    IPictureService pictureService;

    @PostMapping("/upload/{id}")
    public ResponseEntity<?> uploadProfilePicture(@PathVariable(name = "id", required = true) Long id, @RequestBody MultipartFile file) {
        try {
            pictureService.uploadProfilePicture(file, id);
        } catch (IOException ioException) {

        }
        return ResponseEntity.ok(HttpStatus.OK);
    }


}
