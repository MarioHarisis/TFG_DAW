package com.tfg.backend.service;

import com.tfg.backend.model.Espacio;
import com.tfg.backend.repository.EspacioRepository;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class EspacioService {

    // Definir la carpeta donde se almacenarán las imágenes
    private final String UPLOAD_DIR = "images/";
    private final EspacioRepository espacioRepository;

    // Constructor para inyectar el repositorio
    public EspacioService(EspacioRepository espacioRepository) {
        this.espacioRepository = espacioRepository;
    }

    // Crear un nuevo espacio con imagen
    public Espacio crearEspacio(String nombre, String descripcion, String categoria, String ubicacion, Double precio,
            int capacidad,
            boolean disponible, MultipartFile imagen, Long usuarioId) {
        // Guardar la imagen y obtener la URL
        String imagenUrl = saveImage(imagen);
        // Crear un objeto de tipo Espacio
        Espacio espacio = new Espacio(nombre, categoria, descripcion, ubicacion, capacidad, precio, disponible,
                imagenUrl,
                usuarioId,
                null);
        // Guardar el espacio en la base de datos
        return espacioRepository.save(espacio);
    }

    /*
     * @Transactional
     * Indica que queremos que todo lo que ocurra dentro de este método debe
     * formar parte de una única transacción. Si algo falla, se deshará (rollback)
     * todo lo que se haya hecho hasta ese momento.
     */
    @Transactional
    public Espacio editarEspacio(Long id, Espacio espacioEditado, MultipartFile nuevaImagen) {
        Espacio espacioExistente = espacioRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Espacio no encontrado con ID: " + id));

        // Actualizar campos simples
        espacioExistente.setNombre(espacioEditado.getNombre());
        espacioExistente.setDescripcion(espacioEditado.getDescripcion());
        espacioExistente.setCategoria(espacioEditado.getCategoria());
        espacioExistente.setUbicacion(espacioEditado.getUbicacion());
        espacioExistente.setPrecio(espacioEditado.getPrecio());
        espacioExistente.setCapacidad(espacioEditado.getCapacidad());

        if (nuevaImagen != null && !nuevaImagen.isEmpty()) {
            eliminarImagenEspacio(espacioExistente.getImagen()); // eliminar imagen antigua
            String nuevaUrl = saveImage(nuevaImagen); // guardar imagen nueva
            espacioExistente.setImagen(nuevaUrl);
        }

        return espacioRepository.save(espacioExistente);
    }

    // eliminar un espacio por su ID
    public void eliminarEspacio(Long id) {

        // Optional de la busqueda del Espacio
        Optional<Espacio> optionalEspacio = espacioRepository.findById(id);

        // comprobar que existe ese Espacio con el ID por param
        if (!optionalEspacio.isPresent()) {
            throw new EntityNotFoundException("Espacio no encontrado con ID: " + id);
        }

        // instanciar como Objeto Espacio
        Espacio espacio = optionalEspacio.get();

        // usar getter y eliminar Imagen asociada al espacio
        eliminarImagenEspacio(espacio.getImagen());

        // eliminar espacio por ID
        espacioRepository.deleteById(id);
    }

    // Método para guardar la imagen en el directorio y obtener la URL
    private String saveImage(MultipartFile file) {
        try {
            // Crear un nombre único para la imagen
            String filename = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
            Path path = Paths.get(UPLOAD_DIR + filename);

            // Crear el directorio si no existe
            File dir = new File(UPLOAD_DIR);
            if (!dir.exists()) {
                dir.mkdirs();
            }

            // Guardar el archivo en el directorio
            Files.write(path, file.getBytes());

            // Generar la URL del archivo
            return ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("/" + UPLOAD_DIR + filename)
                    .toUriString();

        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    private void eliminarImagenEspacio(String imagenUrl) {
        if (imagenUrl == null || imagenUrl.isEmpty())
            return;

        try {
            String filename = Paths.get(new URI(imagenUrl).getPath()).getFileName().toString();

            Path imagePath = Paths.get(UPLOAD_DIR, filename);
            Files.deleteIfExists(imagePath);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // Obtener todos los espacios
    public List<Espacio> obtenerEspacios() {
        return espacioRepository.findAll();
    }

    // Obtener un espacio por ID
    public Optional<Espacio> obtenerEspacioPorId(Long id) {
        return espacioRepository.findById(id);
    }

    // Obtener los espacios de un usuario específico
    public List<Espacio> obtenerEspaciosPorUsuario(Long usuarioId) {
        return espacioRepository.findByUsuarioId(usuarioId); // Buscar Espacio por ID de Usuario
    }
}
