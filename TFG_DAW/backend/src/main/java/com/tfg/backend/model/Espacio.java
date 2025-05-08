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
    private String descripcion;
    private String categoria;
    private String ubicacion;
    private int capacidad;
    private Double precio;
    private boolean disponible;

    @Lob // marcar este campo como un tipo de datos de gran tamaño
    private String imagen;

    // almacenar solo el usuarioId por temas de ciclos infinitos
    @Column(name = "usuario_id")
    private Long usuarioId; // Solo almacenamos el ID del usuario

    @OneToMany(mappedBy = "espacio")
    private List<Reserva> reservas; // Reservas asociadas a este espacio

    // Constructor adicional para inicializar todos los campos
    public Espacio(String nombre, String categoria, String descripcion, String ubicacion, int capacidad, Double precio,
            boolean disponible, String imagen, Long usuarioId, List<Reserva> reservas) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.categoria = categoria;
        this.ubicacion = ubicacion;
        this.capacidad = capacidad;
        this.precio = precio;
        this.disponible = disponible;
        this.imagen = imagen;
        this.usuarioId = usuarioId;
        this.reservas = reservas;
    }
}
