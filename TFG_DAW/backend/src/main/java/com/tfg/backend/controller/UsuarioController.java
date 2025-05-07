package com.tfg.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tfg.backend.model.Usuario;
import com.tfg.backend.repository.UsuarioRepository;
import com.tfg.backend.service.UsuarioService;

import jakarta.servlet.http.HttpSession;
import lombok.Data;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    /* Gestion de las solicitudes recibidas desde el frontend */

    private UsuarioRepository usuarioRepository;

    private UsuarioService usuarioService;

    // constructor
    public UsuarioController(UsuarioService usuarioService, UsuarioRepository usuarioRepository) {
        this.usuarioService = usuarioService;
        this.usuarioRepository = usuarioRepository;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registro(@RequestBody Usuario usuario) {
        // devolverá una respuesta OK si el registro así lo hace tambien en el Service
        return ResponseEntity.ok(usuarioService.registro(usuario));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request, HttpSession session) {
        Usuario usuario = usuarioService.login(request.getEmail(), request.getPassword());
        session.setAttribute("usuario", usuario);
        return ResponseEntity.ok(usuario);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok("Sesión cerrada");
    }

    @GetMapping
    public List<Usuario> listarUsuarios() {
        return usuarioRepository.findAll();
    }

    @Data
    static class LoginRequest {
        private String email;
        private String password;
    }

}
