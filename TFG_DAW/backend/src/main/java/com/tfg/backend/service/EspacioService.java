package com.tfg.backend.service;

import com.tfg.backend.model.Espacio;
import com.tfg.backend.repository.EspacioRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.File;
import java.io.IOException;
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
    public Espacio crearEspacio(String nombre, String descripcion, String ubicacion, Double precio, int capacidad,
            boolean disponible, MultipartFile imagen) {
        // Guardar la imagen y obtener la URL
        String imagenUrl = saveImage(imagen);
        // Crear un objeto de tipo Espacio
        Espacio espacio = new Espacio(nombre, ubicacion, descripcion, capacidad, precio, disponible, imagenUrl, null);
        // Guardar el espacio en la base de datos
        return espacioRepository.save(espacio);
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

    // Obtener todos los espacios
    public List<Espacio> obtenerEspacios() {
        return espacioRepository.findAll();
    }

    // Obtener un espacio por ID
    public Optional<Espacio> obtenerEspacioPorId(Long id) {
        return espacioRepository.findById(id);
    }
}
