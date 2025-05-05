package com.tfg.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
/*
 * ¿Qué es CORS?
 * CORS (Cross-Origin Resource Sharing) es un mecanismo de seguridad que permite
 * a los servidores especificar qué orígenes pueden acceder a sus recursos. Un
 * "origen" se refiere a una combinación de:
 * 
 * Protocolo: http:// o https://
 * 
 * Dominio: example.com
 * 
 * Puerto: 8080, 4200, etc.
 * 
 * Cuando tu aplicación frontend (en Angular, por ejemplo) intenta hacer una
 * solicitud a un servidor backend que está en un origen diferente, el navegador
 * puede bloquear esa solicitud por razones de seguridad. Esto es lo que
 * conocemos como Política del Mismo Origen (Same-Origin Policy).
 * 
 * ¿Cómo funciona CORS?
 * CORS permite a los servidores especificar qué orígenes (fuentes externas)
 * están permitidos para hacer solicitudes a sus recursos. El servidor lo hace
 * configurando cabeceras (headers) HTTP en sus respuestas para indicar qué
 * orígenes tienen permiso para acceder a los recursos del servidor.
 * 
 * Cuando un navegador realiza una solicitud a un origen diferente (un
 * "origen cruzado"), como en el caso de tu aplicación Angular intentando
 * comunicarse con el backend de Spring Boot, el servidor responde con ciertas
 * cabeceras HTTP, como Access-Control-Allow-Origin, que indican si la solicitud
 * es permitida o no.
 * 
 * Política del Mismo Origen (Same-Origin Policy)
 * Por defecto, los navegadores web impiden que una página cargada desde un
 * origen (por ejemplo, http://localhost:4200 para Angular) haga solicitudes a
 * un servidor que esté en un origen diferente (por ejemplo,
 * http://localhost:8080 para Spring Boot). Esto evita que sitios web maliciosos
 * hagan solicitudes no autorizadas a otros servidores en nombre del usuario sin
 * su conocimiento.
 * 
 * Por ejemplo, si estás ejecutando una aplicación Angular en
 * http://localhost:4200 y necesitas acceder a datos desde un backend en
 * http://localhost:8080, el navegador bloqueará la solicitud a menos que el
 * servidor en localhost:8080 lo permita explícitamente.
 */

@Configuration // Marca la clase como una clase de configuración para Spring.

// Al implementar esta interfaz, puedes sobrescribir métodos de configuración de
// Spring MVC, en este caso, el método addCorsMappings para configurar CORS.
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Configura CORS para todos los endpoints
        registry.addMapping("/**") // Aplica a todos los endpoints
                .allowedOrigins("http://localhost:4200") // Permite acceso desde Angular (localhost:4200)
                .allowedMethods("GET", "POST", "PUT", "DELETE") // Métodos permitidos
                .allowedHeaders("*") // Permite todos los encabezados
                .allowCredentials(true); // Permitir credenciales si es necesario
    }
}
