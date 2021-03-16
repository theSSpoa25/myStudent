package com.egertgjyla.bachelorThesis.repository;

import com.egertgjyla.bachelorThesis.domain.entity.Type;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TypeRepository extends JpaRepository<Type, Integer> {

}
