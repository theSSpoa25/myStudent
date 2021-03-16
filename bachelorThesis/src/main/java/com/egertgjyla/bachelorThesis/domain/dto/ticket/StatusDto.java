package com.egertgjyla.bachelorThesis.domain.dto.ticket;

import com.egertgjyla.bachelorThesis.domain.pojo.StatusPojo;
import lombok.Data;

import java.util.List;

@Data
public class StatusDto {
    private List<StatusPojo> statuses;

    public StatusDto(List<StatusPojo> statusList) {
        this.statuses = statusList;
    }
}
