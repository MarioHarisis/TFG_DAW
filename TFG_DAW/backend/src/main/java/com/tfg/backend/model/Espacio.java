package com.tfg.backend.model;

import java.util.List;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Espacio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombre;
    private String ubicacion;
    private String descripcion;
    private int capacidad;
    private Double precio;
    private boolean disponible;

    @Lob // marcar este campo como un tipo de datos de gran tamaño
    private String imagen;

    @OneToMany(mappedBy = "espacio")
    private List<Reserva> reservas;

    // Constructor adicional para inicializar todos los campos
    public Espacio(String nombre, String ubicacion, String descripcion, int capacidad, Double precio,
            boolean disponible, String imagen, List<Reserva> reservas) {
        this.nombre = nombre;
        this.ubicacion = ubicacion;
        this.descripcion = descripcion;
        this.capacidad = capacidad;
        this.precio = precio;
        this.disponible = disponible;
        this.imagen = imagen;
        this.reservas = reservas;
    }
}
