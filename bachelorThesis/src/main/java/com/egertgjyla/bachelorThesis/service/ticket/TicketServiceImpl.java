package com.egertgjyla.bachelorThesis.service.ticket;

import com.egertgjyla.bachelorThesis.config.other.ModelMapperConfig;
import com.egertgjyla.bachelorThesis.domain.dto.ticket.ChangeAssigneeDto;
import com.egertgjyla.bachelorThesis.domain.dto.ticket.CreateTicketDto;
import com.egertgjyla.bachelorThesis.domain.dto.ticket.StatusDto;
import com.egertgjyla.bachelorThesis.domain.dto.ticket.TicketDto;
import com.egertgjyla.bachelorThesis.domain.entity.Status;
import com.egertgjyla.bachelorThesis.domain.entity.Ticket;
import com.egertgjyla.bachelorThesis.domain.entity.Type;
import com.egertgjyla.bachelorThesis.domain.entity.User;
import com.egertgjyla.bachelorThesis.domain.pojo.StatusPojo;
import com.egertgjyla.bachelorThesis.repository.StatusRepository;
import com.egertgjyla.bachelorThesis.repository.TicketRepository;
import com.egertgjyla.bachelorThesis.repository.TypeRepository;
import com.egertgjyla.bachelorThesis.repository.UserRepository;
import liquibase.change.Change;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.sql.Timestamp;
import java.util.Date;
import java.util.Optional;

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

    @Autowired
    private ModelMapperConfig modelMapperConfig;

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
        createdTicket.setUpdatedAt(new Timestamp(date.getTime()));

        User assignee = userRepository.getOne(createTicketDto.getAssigneeId());
        User owner = userRepository.getOne(createTicketDto.getOwnerId());
        Type type = typeRepository.getOne(createTicketDto.getType().getId());

        Status status = statusRepository.getOne(1);

        createdTicket.setAssignedTo(assignee);
        createdTicket.setOwner(owner);
        createdTicket.setType(type);
        createdTicket.setStatus(status);
        Ticket savedTicked = ticketRepository.saveAndFlush(createdTicket);

        return savedTicked.getId();
    }

    @Override
    @Transactional
    public TicketDto getTicketById(Long id) {
        Optional<Ticket> optionalTicket = ticketRepository.findById(id);

        if (optionalTicket.isPresent()) {
            Ticket ticket = optionalTicket.get();
            TicketDto ticketDto = convertToDto(ticket);

            return ticketDto;
        }

        return  null;
    }

    @Override
    @Transactional
    public void changeDescription(Long id, String description) {
        Ticket ticket = ticketRepository.getOne(id);
        ticket.setDescription(description);
        Date date=new Date();
        ticket.setUpdatedAt(new Timestamp(date.getTime()));
        ticketRepository.save(ticket);
    }

    @Override
    @Transactional
    public void changeStatus(Long id, StatusPojo statusPojo) {
        Ticket ticket = ticketRepository.getOne(id);
        Status status = statusRepository.getOne(statusPojo.getId());
        Date date=new Date();
        ticket.setUpdatedAt(new Timestamp(date.getTime()));
        ticket.setStatus(status);
        ticketRepository.save(ticket);
    }

    @Override
    @Transactional
    public void changeAssignee(Long id, ChangeAssigneeDto changeAssigneeDto) {
        Ticket ticket = ticketRepository.getOne(id);
        User user = userRepository.getOne(changeAssigneeDto.getId());
        Date date=new Date();
        ticket.setUpdatedAt(new Timestamp(date.getTime()));
        ticket.setAssignedTo(user);
        ticketRepository.save(ticket);
    }

    @Override
    @Transactional
    public void changeTitle(Long id, String title) {
        Ticket ticket = ticketRepository.getOne(id);
        Date date=new Date();
        ticket.setUpdatedAt(new Timestamp(date.getTime()));
        ticket.setTitle(title);
        ticketRepository.save(ticket);
    }

    private TicketDto convertToDto(Ticket ticket) {
        return modelMapperConfig.modelMapper().map(ticket, TicketDto.class);
    }
}
