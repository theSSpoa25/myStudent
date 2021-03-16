package com.egertgjyla.bachelorThesis.api;

import com.egertgjyla.bachelorThesis.domain.dto.ticket.CreateTicketDto;
import com.egertgjyla.bachelorThesis.domain.dto.user.CreateUserRequest;
import com.egertgjyla.bachelorThesis.service.ticket.ITicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/ticket")
public class TicketResource {

    @Autowired
    private ITicketService ticketService;

    @PostMapping("/create")
    public ResponseEntity<Long> createUser(@RequestBody CreateTicketDto createTicketDto) {
        Long createdTicketId = ticketService.createTicket(createTicketDto);
        return ResponseEntity.ok(createdTicketId);
    }
}
