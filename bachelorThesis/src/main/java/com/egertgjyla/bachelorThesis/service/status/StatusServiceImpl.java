package com.egertgjyla.bachelorThesis.service.status;

import com.egertgjyla.bachelorThesis.config.other.ModelMapperConfig;
import com.egertgjyla.bachelorThesis.domain.entity.Status;
import com.egertgjyla.bachelorThesis.domain.pojo.StatusPojo;
import com.egertgjyla.bachelorThesis.repository.StatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class StatusServiceImpl implements IStatusService {

    @Autowired
    private ModelMapperConfig modelMapperConfig;

    @Autowired
    private StatusRepository statusRepository;

    @Override
    public List<StatusPojo> getAllStatuses() {
        List<Status> statuses = statusRepository.findAll();
        return statuses
                .stream()
                .map(this::convertToPojo)
                .collect(Collectors.toList());
    }

    private StatusPojo convertToPojo(Status status) {
        return modelMapperConfig.modelMapper().map(status, StatusPojo.class);
    }
}
