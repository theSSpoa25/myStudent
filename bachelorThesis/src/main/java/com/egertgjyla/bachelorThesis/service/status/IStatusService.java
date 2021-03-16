package com.egertgjyla.bachelorThesis.service.status;

import com.egertgjyla.bachelorThesis.domain.pojo.StatusPojo;

import java.util.List;

public interface IStatusService {
    List<StatusPojo> getAllStatuses();
}
