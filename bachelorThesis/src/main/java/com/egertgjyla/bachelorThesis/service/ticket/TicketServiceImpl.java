package com.egertgjyla.bachelorThesis.service.ticket;

import com.egertgjyla.bachelorThesis.domain.dto.ticket.CreateTicketDto;
import com.egertgjyla.bachelorThesis.domain.entity.Ticket;
import com.egertgjyla.bachelorThesis.domain.entity.Type;
import com.egertgjyla.bachelorThesis.domain.entity.User;
import com.egertgjyla.bachelorThesis.repository.StatusRepository;
import com.egertgjyla.bachelorThesis.repository.TicketRepository;
import com.egertgjyla.bachelorThesis.repository.TypeRepository;
import com.egertgjyla.bachelorThesis.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.sql.Timestamp;
import java.util.Date;

@Service
public class TicketServiceImpl implements ITicketService {

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private StatusRepository statusRepository;

    @Autowired
    private TypeRepository typeRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    @Transactional
    public Long createTicket(CreateTicketDto createTicketDto) {
        Ticket createdTicket = new Ticket(
                createTicketDto.getTitle(),
                createTicketDto.getSummary(),
                createTicketDto.getDueDate()
        );

        Date date=new Date();
        createdTicket.setCreatedAt(new Timestamp(date.getTime()));

        User assignee = userRepository.getOne(createTicketDto.getAssigneeId());
        User owner = userRepository.getOne(createTicketDto.getOwnerId());
        Type type = typeRepository.getOne(createTicketDto.getType().getId());

        createdTicket.setAssignedTo(assignee);
        createdTicket.setOwner(owner);
        createdTicket.setType(type);
        Ticket savedTicked = ticketRepository.saveAndFlush(createdTicket);

        return savedTicked.getId();
    }
}
