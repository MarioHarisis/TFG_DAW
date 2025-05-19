package com.tfg.backend.service;

import com.tfg.backend.model.Espacio;
import com.tfg.backend.model.Reserva;
import com.tfg.backend.model.Usuario;
import com.tfg.backend.repository.EspacioRepository;
import com.tfg.backend.repository.ReservaRepository;
import com.tfg.backend.repository.UsuarioRepository;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReservaService {

    private final ReservaRepository reservaRepository;
    private final UsuarioRepository usuarioRepository;
    private final EspacioRepository espacioRepository;

    public ReservaService(ReservaRepository reservaRepository,
            UsuarioRepository usuarioRepository,
            EspacioRepository espacioRepository) {
        this.reservaRepository = reservaRepository;
        this.usuarioRepository = usuarioRepository;
        this.espacioRepository = espacioRepository;
    }

    public Reserva crearReserva(Reserva reserva) {
        Long espacioId = reserva.getEspacio().getId();
        LocalDateTime fecha = reserva.getFecha();

        // Validar si hay solapamiento
        List<Reserva> posibleConcidenciaReservas = reservaRepository.findByEspacioIdAndFecha(espacioId, fecha);

        if (!posibleConcidenciaReservas.isEmpty()) {
            throw new RuntimeException("Ya existe una reserva para esas fechas en este espacio.");
        }

        // Verificar que usuario y espacio existen
        Usuario usuario = usuarioRepository.findById(reserva.getUsuario().getId())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Espacio espacio = espacioRepository.findById(reserva.getEspacio().getId())
                .orElseThrow(() -> new RuntimeException("Espacio no encontrado"));

        // Asociar objetos completos
        reserva.setUsuario(usuario);
        reserva.setEspacio(espacio);

        return reservaRepository.save(reserva);
    }

    // devuelve Reservas crudas, con Objetos
    public List<Reserva> obtenerReservas() {
        return reservaRepository.findAll();
    }
}
