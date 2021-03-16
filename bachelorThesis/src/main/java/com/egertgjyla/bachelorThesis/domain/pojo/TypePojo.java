package com.egertgjyla.bachelorThesis.domain.pojo;

import lombok.Data;
import org.codehaus.jackson.annotate.JsonIgnore;

@Data
public class TypePojo {
    private Integer id;
    private String colorCode;
    private String type;
}
