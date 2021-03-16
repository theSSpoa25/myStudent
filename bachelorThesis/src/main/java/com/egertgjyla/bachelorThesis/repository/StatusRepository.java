package com.egertgjyla.bachelorThesis.repository;

import com.egertgjyla.bachelorThesis.domain.entity.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StatusRepository extends JpaRepository<Status, Integer> {
}
