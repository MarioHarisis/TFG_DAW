package com.tfg.backend.model;

import java.util.List;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Entity
public class Espacio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String ubicacion;
    private String descripcion;
    private int capacidad;
    private boolean disponible;

    @OneToMany(mappedBy = "espacio")
    private List<Reserva> reservas;
}
