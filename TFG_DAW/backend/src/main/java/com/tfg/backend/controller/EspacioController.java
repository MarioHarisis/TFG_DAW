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

    public EspacioController(EspacioService espacioService) {
        this.espacioService = espacioService;
    }

    // Crear espacio con imagen
    @PostMapping
    public ResponseEntity<Espacio> crearEspacio(
            @RequestParam("nombre") String nombre,
            @RequestParam("descripcion") String descripcion,
            @RequestParam("ubicacion") String ubicacion,
            @RequestParam("precio") Double precio,
            @RequestParam("capacidad") int capacidad,
            @RequestParam("disponible") boolean disponible,
            @RequestParam("imagen") MultipartFile imagen) {

        // Aquí llamamos al método del service para crear el espacio
        Espacio espacio = espacioService.crearEspacio(nombre, descripcion, ubicacion, precio, capacidad, disponible,
                imagen);
        // devolvemos el Espacio creado
        return new ResponseEntity<>(espacio, HttpStatus.CREATED);
    }

    // devolver todos los espacios de la DB
    @GetMapping
    public List<Espacio> obtenerEspacios() {
        return espacioService.obtenerEspacios();
    }

    // devolver Espacio por ID
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
