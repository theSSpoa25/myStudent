package com.egertgjyla.bachelorThesis.domain.dto.ticket;

import com.egertgjyla.bachelorThesis.domain.entity.Type;
import com.egertgjyla.bachelorThesis.domain.pojo.TypePojo;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
public class TypeDto {
    private List<TypePojo> types;

    public TypeDto(List<TypePojo> typePojoList) {
        this.types = typePojoList;
    }
}
