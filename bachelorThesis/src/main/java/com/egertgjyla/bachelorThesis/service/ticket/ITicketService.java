package com.egertgjyla.bachelorThesis.service.ticket;

import com.egertgjyla.bachelorThesis.domain.dto.ticket.ChangeAssigneeDto;
import com.egertgjyla.bachelorThesis.domain.dto.ticket.CreateTicketDto;
import com.egertgjyla.bachelorThesis.domain.dto.ticket.StatusDto;
import com.egertgjyla.bachelorThesis.domain.dto.ticket.TicketDto;
import com.egertgjyla.bachelorThesis.domain.entity.Status;
import com.egertgjyla.bachelorThesis.domain.pojo.StatusPojo;

import java.util.List;

public interface ITicketService {
    Long createTicket(CreateTicketDto createTicketDto);
    TicketDto getTicketById(Long ticketId);
    void changeDescription(Long id, String description);
    void changeStatus(Long id, StatusPojo statusPojo);
    void changeAssignee(Long id, ChangeAssigneeDto changeAssigneeDto);
    void changeTitle(Long id, String title);
    List<TicketDto> getAllTickets(Long id);
}
