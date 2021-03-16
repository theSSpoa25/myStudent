package com.egertgjyla.bachelorThesis.api;

import com.egertgjyla.bachelorThesis.domain.dto.ticket.TypeDto;
import com.egertgjyla.bachelorThesis.domain.pojo.TypePojo;
import com.egertgjyla.bachelorThesis.service.type.ITypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/type")
public class TypeResource {

    @Autowired
    private ITypeService typeService;

    @GetMapping("/all")
    private ResponseEntity<TypeDto> getAllTypes() {
        List<TypePojo> types = typeService.getAllTypes();
        TypeDto typeDto = new TypeDto(types);
        return ResponseEntity.ok(typeDto);
    }
}
