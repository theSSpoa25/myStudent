package com.egertgjyla.bachelorThesis.repository;

import com.egertgjyla.bachelorThesis.domain.entity.Ticket;
import com.egertgjyla.bachelorThesis.domain.pojo.ticket.ITicketStats;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
    @Query(value = "SELECT t from Ticket t where t.assignedTo.id = :userId or t.owner.id = :userId")
    List<Ticket> getAllTickets(@Param("userId") Long userId);

    @Query(value = "SELECT distinct t.owner.id as userId, \n" +
            "\t count(t) as TOTAL, \n" +
            "  sum(case when t.owner.id  = :userId then 1 else 0 end) as ownedTickets,\n" +
            "  sum(case when t.assignedTo.id = :userId then 1 else 0 end) as assignedTickets,\n" +
            "  sum(case when t.status.id = :statusId then 1 else 0 end) as openTickets\n" +
            "  from Ticket t\n" +
            "  group by  userId")
    ITicketStats getTicketStats(@Param("userId") Long userId, @Param("statusId") Integer statusId);
}
