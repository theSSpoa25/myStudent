package com.egertgjyla.bachelorThesis.domain.pojo.ticket;

public interface ITicketStats {
    Long getUserId();
    Integer getOwnedTickets();
    Integer getAssignedTickets();
    Integer getOpenTickets();
}
