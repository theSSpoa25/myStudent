package com.egertgjyla.bachelorThesis.api;

import com.egertgjyla.bachelorThesis.service.ticket.ITicketService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

import java.time.Duration;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardResource {

    @Autowired
    private ITicketService ticketService;


    @SuppressWarnings("BlockingMethodInNonBlockingContext")
    @GetMapping(path = "/stream-flux", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<String> streamFlux() {
        Long id = 1L;
        Integer sId = 1;
        ObjectMapper mapper = new ObjectMapper();
        return Flux.interval(Duration.ofSeconds(1))
                .map(sequence -> {
                    try {
                        return mapper.writeValueAsString(ticketService.getTicketStats(id, sId));
                    } catch (JsonProcessingException e) {
                        e.printStackTrace();
                        return null;
                    }
                });
    }
}
