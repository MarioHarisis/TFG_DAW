package com.tfg.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.tfg.backend.model.Espacio;

@RepositoryRestResource(path = "espacios")
/*
 * Al utilizar @RepositoryRestResource sobre esta interface, Spring Boot genera
 * automáticamente los siguientes endpoints REST:
 * 
 * GET /espacios: Para obtener todos los productos.
 * GET /espacios/{id}: Para obtener un producto por su ID.
 * POST /espacios: Para crear un nuevo producto.
 * PUT /espacios/{id}: Para actualizar un producto por su ID.
 * DELETE /espacios/{id}: Para eliminar un producto por su ID.
 */
public interface EspacioRepository extends JpaRepository<Espacio, Long> {

    // Método para encontrar los espacios publicados por un usuario
    List<Espacio> findByUsuarioId(Long usuarioId);
}
