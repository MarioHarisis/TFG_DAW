package com.tfg.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.tfg.backend.model.Usuario;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path = "usuarios")
/*
 * Al utilizar @RepositoryRestResource sobre esta interface, Spring Boot genera
 * automáticamente los siguientes endpoints REST:
 * 
 * GET /usuarios: Para obtener todos los productos.
 * GET /usuarios/{id}: Para obtener un producto por su ID.
 * POST /usuarios: Para crear un nuevo producto.
 * PUT /usuarios/{id}: Para actualizar un producto por su ID.
 * DELETE /usuarios/{id}: Para eliminar un producto por su ID.
 */
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

}