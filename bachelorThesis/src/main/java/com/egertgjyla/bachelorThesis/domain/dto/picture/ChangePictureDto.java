package com.egertgjyla.bachelorThesis.domain.dto.picture;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
public class ChangePictureDto {
    MultipartFile file;


    public MultipartFile getFile() {
        return file;
    }

    public ChangePictureDto() {

    }

    public ChangePictureDto(MultipartFile file) {
        this.file = file;
    }
}
