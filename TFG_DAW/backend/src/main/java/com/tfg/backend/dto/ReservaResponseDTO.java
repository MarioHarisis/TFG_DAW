package com.tfg.backend.dto;

import java.time.LocalDateTime;

import com.tfg.backend.model.Reserva;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReservaResponseDTO {
    private Long id;
    private LocalDateTime fecha;
    private String estado;
    private Long usuarioId;
    private EspacioDTO espacio;

    // este constructor nos permitirá devolver un objeto Reserva sin que contenga
    // los objetos Usuario y Espacio que provocan recursividad infinita
    public ReservaResponseDTO(Reserva reserva) {
        this.id = reserva.getId();
        this.fecha = reserva.getFecha();
        this.estado = reserva.getEstado();
        this.usuarioId = reserva.getUsuario().getId();
        this.espacio = new EspacioDTO(reserva.getEspacio());
    }
}
