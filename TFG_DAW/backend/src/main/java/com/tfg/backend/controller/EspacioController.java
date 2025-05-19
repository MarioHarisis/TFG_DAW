package com.tfg.backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tfg.backend.dto.EspacioDTO;
import com.tfg.backend.model.Espacio;
import com.tfg.backend.repository.EspacioRepository;
import com.tfg.backend.service.EspacioService;

@RestController
@RequestMapping("/espacios")
public class EspacioController {

    private EspacioService espacioService;

    private EspacioRepository espacioRepository;

    // Constructor para inyectar el servicio
    public EspacioController(EspacioService espacioService, EspacioRepository espacioRepository) {
        this.espacioService = espacioService;
        this.espacioRepository = espacioRepository;
    }

    // Crear un nuevo Espacio
    @PostMapping
    public ResponseEntity<Espacio> crearEspacio(
            @RequestParam("nombre") String nombre,
            @RequestParam("descripcion") String descripcion,
            @RequestParam("categoria") String categoria,
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
                categoria,
                ubicacion,
                precio,
                capacidad,
                disponible,
                imagen,
                usuarioId);
        // devolvemos el Espacio creado
        return new ResponseEntity<>(espacio, HttpStatus.CREATED);
    }

    // devolver todos los espacios de la DB sin recursividad infinita
    @GetMapping
    public List<EspacioDTO> listarEspacios() {
        return espacioRepository.findAll().stream()
                .map(EspacioDTO::new)
                .toList();
    }

    // Obtener Espacio por ID
    @GetMapping("/{id}")
    public ResponseEntity<EspacioDTO> obtenerEspacioId(@PathVariable Long id) {
        // esto significa que espacioService.findById(id) puede devolver un Optional
        Optional<Espacio> optionalEspacio = espacioService.obtenerEspacioPorId(id);

        // aquí comprobamos si el Optional está vacío o no
        if (optionalEspacio.isPresent()) {
            // si existe lo asignamos a un Objeto EspacioDTO
            EspacioDTO espacioDTO = new EspacioDTO(optionalEspacio.get());

            // devolvemos una respuesta positiva HTTP al front del DTO
            return ResponseEntity.ok(espacioDTO);
        } else {
            // si no lo encuentra devolvemos uan respuesta NOT FOUND
            return ResponseEntity.notFound().build();
        }
    }

    // Obtener todos los Espacios de un Usuario por su usuarioId
    @GetMapping("/usuarios/{usuarioId}")
    public ResponseEntity<List<EspacioDTO>> obtenerEspaciosPorUsuario(@PathVariable Long usuarioId) {
        List<Espacio> espacios = espacioService.obtenerEspaciosPorUsuario(usuarioId);

        if (espacios.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        List<EspacioDTO> dtos = espacios.stream().map(EspacioDTO::new).toList();
        return ResponseEntity.ok(dtos);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarEspacio(@PathVariable Long id) {
        try {
            // eliminar espacio por ID
            espacioService.eliminarEspacio(id);
            return ResponseEntity.noContent().build(); // devolver una respuesta No Content
        } catch (Exception e) {
            return ResponseEntity.notFound().build(); // devolver una respuesta Not FOund
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Espacio> actualizarEspacio(
            @PathVariable Long id,
            @RequestPart("espacio") String espacioJson, // Recibe el JSON como String
            @RequestPart(value = "imagen", required = false) MultipartFile imagen) {

        try {

            // Deserializar el JSON en el objeto Espacio
            Espacio espacio = new ObjectMapper().readValue(espacioJson, Espacio.class);

            Espacio actualizado = espacioService.editarEspacio(id, espacio, imagen);
            return ResponseEntity.ok(actualizado);
        } catch (Exception e) {
            // si la deserializacion falla
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }
}
