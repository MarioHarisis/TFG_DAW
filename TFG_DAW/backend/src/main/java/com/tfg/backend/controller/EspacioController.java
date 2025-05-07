package com.tfg.backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.tfg.backend.model.Espacio;
import com.tfg.backend.service.EspacioService;

@RestController
@RequestMapping("/espacios")
public class EspacioController {

    private EspacioService espacioService;

    // Constructor para inyectar el servicio
    public EspacioController(EspacioService espacioService) {
        this.espacioService = espacioService;
    }

    // Crear un nuevo Espacio
    @PostMapping
    public ResponseEntity<Espacio> crearEspacio(
            @RequestParam("nombre") String nombre,
            @RequestParam("descripcion") String descripcion,
            @RequestParam("ubicacion") String ubicacion,
            @RequestParam("precio") Double precio,
            @RequestParam("capacidad") int capacidad,
            @RequestParam("disponible") boolean disponible,
            @RequestParam("imagen") MultipartFile imagen,
            @RequestParam("usuarioId") Long usuarioId) {

        // Aquí llamamos al método del service para crear el espacio
        /*
         * En este caso, como parametro que solicitamos, solicitamos el ID del
         * Usuario @RequestParam("usuarioId") Long usuarioId
         * ya que lo enviamos desde el frontend, mas adelñante buscamos desde aquí y
         * cgracias al UusarioRepository el id en la BBDD
         * con finBtId() de esta manera somos capaces de asignar el objeto Usuario a la
         * columna de Usuario del Espacio.
         */
        Espacio espacio = espacioService.crearEspacio(
                nombre,
                descripcion,
                ubicacion,
                precio,
                capacidad,
                disponible,
                imagen,
                usuarioId);
        // devolvemos el Espacio creado
        return new ResponseEntity<>(espacio, HttpStatus.CREATED);
    }

    // devolver todos los espacios de la DB
    @GetMapping
    public List<Espacio> obtenerEspacios() {
        return espacioService.obtenerEspacios();
    }

    // Obtener Espacio por ID
    @GetMapping("/{id}")
    public ResponseEntity<Espacio> obtenerEspacioId(@PathVariable Long id) {
        // esto significa que espacioService.findById(id) puede devolver un Optional
        Optional<Espacio> optionalEspacio = espacioService.obtenerEspacioPorId(id);

        // aquí comprobamos si el Optional está vacío o no
        if (optionalEspacio.isPresent()) {
            Espacio espacio = optionalEspacio.get(); // si existe lo asignamos a un Objeto Espacio
            // devolvemos una respuesta positiva HTTP al front
            return ResponseEntity.ok().body(espacio);
        } else {
            // si no lo encuentra devolvemos uan respuesta NOT FOUND
            return ResponseEntity.notFound().build();
        }
    }

}
