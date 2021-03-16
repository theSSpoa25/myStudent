package com.egertgjyla.bachelorThesis.service.type;

import com.egertgjyla.bachelorThesis.domain.entity.Type;
import com.egertgjyla.bachelorThesis.domain.pojo.TypePojo;

import java.util.List;

public interface ITypeService {
    List<TypePojo> getAllTypes();
}
