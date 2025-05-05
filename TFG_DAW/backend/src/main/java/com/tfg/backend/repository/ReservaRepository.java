package com.tfg.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.tfg.backend.model.Reserva;

@RepositoryRestResource(path = "reservas")
/*
 * Al utilizar @RepositoryRestResource sobre esta interface, Spring Boot genera
 * automáticamente los siguientes endpoints REST:
 * 
 * GET /reservas: Para obtener todos los productos.
 * GET /reservas/{id}: Para obtener un producto por su ID.
 * POST /reservas: Para crear un nuevo producto.
 * PUT /reservas/{id}: Para actualizar un producto por su ID.
 * DELETE /reservas/{id}: Para eliminar un producto por su ID.
 */
public interface ReservaRepository extends JpaRepository<Reserva, Long> {
}
