package com.egertgjyla.bachelorThesis.domain.dto.picture;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

@Data
@AllArgsConstructor
@Getter
public class ProfilePicture {
    String path;
    String type;
    byte[] data;
}
