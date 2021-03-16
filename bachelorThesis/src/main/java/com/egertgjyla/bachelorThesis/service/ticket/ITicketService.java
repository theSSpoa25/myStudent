package com.egertgjyla.bachelorThesis.service.ticket;

import com.egertgjyla.bachelorThesis.domain.dto.ticket.CreateTicketDto;

public interface ITicketService {
    Long createTicket(CreateTicketDto createTicketDto);
}
