package com.tfg.backend.service;

import org.springframework.stereotype.Service;

import com.tfg.backend.model.Usuario;
import com.tfg.backend.repository.UsuarioRepository;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    // Constructor para inyectar el repositorio
    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    // registrar y guardar un nuevo usuario en la DB
    public Usuario registro(Usuario usuario) {
        usuario.setPassword(usuario.getPassword());
        return usuarioRepository.save(usuario);
    }

    // verificar el login del usuario mediante su email y contraseña
    public Usuario login(String email, String password) {
        // buscar por email en la DB
        return usuarioRepository.findByEmail(email).filter(u -> password.equals(u.getPassword()))
                .orElseThrow(() -> new RuntimeException("Contraseña incorrecta"));
        // si no lo encuentra lanza una excepcion de RunTime
    }
}
