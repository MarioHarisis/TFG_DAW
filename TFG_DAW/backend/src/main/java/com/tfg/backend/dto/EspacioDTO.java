package com.tfg.backend.dto;

import com.tfg.backend.model.Espacio;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EspacioDTO {
    private Long id;
    private String nombre;
    private String descripcion;
    private String categoria;
    private String ubicacion;
    private int capacidad;
    private Double precio;
    private boolean disponible;
    private String imagen;
    private Long usuarioId;

    public EspacioDTO(Espacio espacio) {
        this.id = espacio.getId();
        this.nombre = espacio.getNombre();
        this.descripcion = espacio.getDescripcion();
        this.categoria = espacio.getCategoria();
        this.ubicacion = espacio.getUbicacion();
        this.capacidad = espacio.getCapacidad();
        this.precio = espacio.getPrecio();
        this.disponible = espacio.isDisponible();
        this.imagen = espacio.getImagen();
        this.usuarioId = espacio.getUsuarioId();
    }

    // getters y setters aquí
}
