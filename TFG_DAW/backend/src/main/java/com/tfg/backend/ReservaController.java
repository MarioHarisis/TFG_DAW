package com.tfg.backend.controller;

import com.tfg.backend.model.Reserva;
import com.tfg.backend.model.Usuario;
import com.tfg.backend.dto.ReservaDTO;
import com.tfg.backend.dto.ReservaResponseDTO;
import com.tfg.backend.model.Espacio;
import com.tfg.backend.repository.UsuarioRepository;
import com.tfg.backend.service.ReservaService;
import com.tfg.backend.repository.EspacioRepository;
import com.tfg.backend.repository.ReservaRepository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/reservas")
public class ReservaController {

    @Autowired
    private ReservaRepository reservaRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private EspacioRepository espacioRepository;

    @Autowired
    private ReservaService reservaService;

    @PostMapping
    public ResponseEntity<?> crearReserva(@RequestBody ReservaDTO dto) {
        // Validar que usuario y espacio existen
        Usuario usuario = usuarioRepository.findById(dto.getUsuarioId()).orElse(null);
        Espacio espacio = espacioRepository.findById(dto.getEspacioId()).orElse(null);

        // si no encuentra el espacio o el usuario
        if (usuario == null || espacio == null) {
            return ResponseEntity.badRequest().body("Usuario o espacio no válido");
        }

        // Crear reserva
        Reserva reserva = new Reserva();
        reserva.setFecha(dto.getFecha().toLocalDateTime()); // Ajusta según formato
        reserva.setEstado(dto.getEstado());
        reserva.setUsuario(usuario);
        reserva.setEspacio(espacio);

        // Añadir reserva a las listas de Reservas en su Espacio y Usuario
        usuario.getReservas().add(reserva);
        espacio.getReservas().add(reserva);

        // Guardar entidades afectadas (actualizar con listas modificadas)
        Reserva nuevaReserva = reservaRepository.save(reserva);
        usuarioRepository.save(usuario);
        espacioRepository.save(espacio);

        // aplicamos el DTO que sustituye los objetos por strings de IDs
        // para evitar recursividad infinita al devolver la respuesta
        return ResponseEntity.ok(new ReservaResponseDTO(nuevaReserva));
    }

    @GetMapping
    public List<ReservaResponseDTO> listarTodas() {
        List<Reserva> reservas = reservaService.obtenerReservas();
        return reservas.stream()
                .map(ReservaResponseDTO::new)
                .toList(); // O collect(Collectors.toList())
    }

    @GetMapping("/usuario/{usuarioId}")
    public List<ReservaResponseDTO> obtenerReservasPorUsuario(@PathVariable Long usuarioId) {
        List<Reserva> reservas = reservaService.getReservasPorUsuario(usuarioId);
        // enviar DTO sin objeto usuario
        return reservas.stream()
                .map(ReservaResponseDTO::new)
                .toList();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarEspacio(@PathVariable Long id) {
        try {
            // eliminar espacio por ID
            reservaService.eliminarReserva(id);
            return ResponseEntity.noContent().build(); // devolver una respuesta No Content
        } catch (Exception e) {
            return ResponseEntity.notFound().build(); // devolver una respuesta Not FOund
        }
    }

    // editar una reserva
    @PutMapping("/{id}")
    public ResponseEntity<ReservaResponseDTO> actualizarReserva(@PathVariable Long id,
            @RequestBody Reserva reservaActualizada) {
        Optional<Reserva> reservaExistente = reservaRepository.findById(id); // encontrar por id

        if (reservaExistente.isPresent()) { // comprobar si existe
            Reserva r = reservaExistente.get();

            // cambiar fecha
            r.setFecha(reservaActualizada.getFecha());

            // creación del DTO para la respuesta
            Reserva actualizada = reservaRepository.save(r);
            return ResponseEntity.ok(new ReservaResponseDTO(actualizada));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
