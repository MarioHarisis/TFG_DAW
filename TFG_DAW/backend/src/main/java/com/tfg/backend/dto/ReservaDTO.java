package com.tfg.backend.dto;

import java.time.OffsetDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReservaDTO {

    private OffsetDateTime fecha; // Convertir OffsetDateTime -> LocalDateTime
    private String estado;
    private Long usuarioId;
    private Long espacioId;

    public ReservaDTO() {
    }
}
