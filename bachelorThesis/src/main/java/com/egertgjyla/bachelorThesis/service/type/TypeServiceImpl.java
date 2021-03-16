package com.egertgjyla.bachelorThesis.service.type;

import com.egertgjyla.bachelorThesis.config.other.ModelMapperConfig;
import com.egertgjyla.bachelorThesis.domain.entity.Type;
import com.egertgjyla.bachelorThesis.domain.pojo.TypePojo;
import com.egertgjyla.bachelorThesis.repository.TypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TypeServiceImpl implements ITypeService {

    @Autowired
    private TypeRepository typeRepository;

    @Autowired
    private ModelMapperConfig modelMapperConfig;

    @Override
    public List<TypePojo> getAllTypes() {
        List<Type> types = typeRepository.findAll();
        return types
                .stream()
                .map(this::convertToPojo)
                .collect(Collectors.toList());
    }

    private TypePojo convertToPojo(Type type) {
        TypePojo typePojo = modelMapperConfig.modelMapper().map(type, TypePojo.class);
        typePojo.setColorCode(type.getColorCode());
        return  typePojo;
    }
}
