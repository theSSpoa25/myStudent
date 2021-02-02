package com.egertgjyla.bachelorThesis.service.picture;

import com.egertgjyla.bachelorThesis.domain.entity.Picture;
import com.egertgjyla.bachelorThesis.domain.entity.User;
import com.egertgjyla.bachelorThesis.repository.PictureRepository;
import com.egertgjyla.bachelorThesis.repository.UserRepository;
import liquibase.pro.packaged.A;
import liquibase.pro.packaged.I;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Optional;
import java.util.zip.DataFormatException;
import java.util.zip.Deflater;
import java.util.zip.Inflater;

@Service
public class PictureServiceImpl implements IPictureService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    PictureRepository pictureRepository;

    @Override
    @Transactional
    public void uploadProfilePicture(MultipartFile file, Long userId) throws IOException {
        Optional<User> optionalUser = userRepository.findById(userId);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            Picture picture = new Picture(file.getOriginalFilename(), file.getContentType(), compressBytes(file.getBytes()));

            user.setPicture(picture);
            userRepository.save(user);
        }
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
        } catch (IOException e) {

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
        } catch (IOException ioException) {

        } catch (DataFormatException e) {

        }
        return outputStream.toByteArray();
    }

}
