package com.egertgjyla.bachelorThesis.repository;

import com.egertgjyla.bachelorThesis.domain.entity.Ticket;
import com.egertgjyla.bachelorThesis.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
    @Query(value = "SELECT t from Ticket t where t.assignedTo.id = :userId or t.owner.id = :userId")
    List<Ticket> getAllTickets(@Param("userId") Long userId);
}
