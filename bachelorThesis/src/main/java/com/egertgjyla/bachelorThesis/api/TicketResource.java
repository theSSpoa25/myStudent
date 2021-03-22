package com.egertgjyla.bachelorThesis.api;

import com.egertgjyla.bachelorThesis.domain.dto.ticket.*;
import com.egertgjyla.bachelorThesis.domain.pojo.StatusPojo;
import com.egertgjyla.bachelorThesis.service.ticket.ITicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping(path = {"/{id}"})
    public ResponseEntity<?> getTicket(@PathVariable(name = "id", required = true) Long id) {
        TicketDto ticketDto = ticketService.getTicketById(id);
        return  ResponseEntity.ok(ticketDto);
    }

    @PostMapping("/{id}/change-description")
    public ResponseEntity<?> saveDescription(@PathVariable(name = "id", required = true) Long id, @RequestBody DescriptionRequestDto descriptionRequestDto) {
        ticketService.changeDescription(id, descriptionRequestDto.getDescription());
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @PostMapping("/{id}/change-status")
    public ResponseEntity<?> saveStatus(@PathVariable(name = "id", required = true) Long id, @RequestBody StatusPojo statusPojo) {
        ticketService.changeStatus(id, statusPojo);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @PostMapping("/{id}/change-assignee")
    public ResponseEntity<?> changeAssignee(@PathVariable(name = "id", required = true) Long id, @RequestBody ChangeAssigneeDto changeAssigneeDto) {
        ticketService.changeAssignee(id, changeAssigneeDto);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @PostMapping("/{id}/{title}")
    public ResponseEntity<?> changeTitle(@PathVariable(name = "id", required = true) Long id, @PathVariable(name = "title", required = true) String title) {
        ticketService.changeTitle(id, title);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @GetMapping(path = {"/all/user/{id}"})
    public ResponseEntity<List<TicketDto>> getAllTickets(@PathVariable(name = "id", required = true) Long id) {
        List<TicketDto> ticketDtoList = ticketService.getAllTickets(id);
        return  ResponseEntity.ok(ticketDtoList);
    }

}
