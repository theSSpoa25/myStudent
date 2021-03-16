package com.egertgjyla.bachelorThesis.api;

import com.egertgjyla.bachelorThesis.domain.dto.ticket.StatusDto;
import com.egertgjyla.bachelorThesis.domain.pojo.StatusPojo;
import com.egertgjyla.bachelorThesis.service.status.IStatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/status")
public class StatusResource {

    @Autowired
    private IStatusService statusService;

    @GetMapping("/all")
    public ResponseEntity<?> getAllUsers() {
        List<StatusPojo> statues = statusService.getAllStatuses();
        StatusDto statusDto = new StatusDto(statues);
        return ResponseEntity.ok(statusDto);
    }
}
